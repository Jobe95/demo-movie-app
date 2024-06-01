import showsApi from "../../../src/api/services/shows";
import AxiosMockAdapter from "axios-mock-adapter";
import { client } from "../../../src/api/client";
import { Show } from "../../../src/types/show";

describe("showsApi", () => {
  const mock = new AxiosMockAdapter(client);

  afterEach(() => {
    mock.reset();
  });

  describe("searchShows", () => {
    it("should fetch shows based on query", async () => {
      const mockResponse = [
        { score: 1, show: { id: 1, name: "breaking bad" } },
      ];
      mock
        .onGet("search/shows", { params: { q: "breaking bad" } })
        .reply(200, mockResponse);

      const response = await showsApi.searchShows("breaking bad");
      expect(response.data).toEqual(mockResponse);
    });

    it("should handle network errors gracefully", async () => {
      mock
        .onGet("search/shows", { params: { q: "breaking bad" } })
        .networkError();

      await expect(showsApi.searchShows("breaking bad")).rejects.toThrow(
        "Network Error",
      );
    });

    it("should handle empty results correctly", async () => {
      mock.onGet("search/shows", { params: { q: "unknown" } }).reply(200, []);

      const response = await showsApi.searchShows("unknown");
      expect(response.data).toEqual([]);
    });
  });

  describe("getShowById", () => {
    it("should fetch a show by its ID successfully", async () => {
      const showId = 1;
      const mockShowData: Show = {
        id: showId,
        name: "Breaking Bad",
        genres: ["Drama"],
        premiered: "2008-01-01",
        rating: { average: 9.5 },
        image: { medium: "image-url", original: "image-url" },
        summary: "summary",
      };
      mock.onGet(`shows/${showId}`).reply(200, mockShowData);

      const response = await showsApi.getShowById(showId);
      expect(response.data).toEqual(mockShowData);
    });

    it("should handle network errors gracefully when fetching a show by ID", async () => {
      const showId = 1;
      mock.onGet(`shows/${showId}`).networkError();

      await expect(showsApi.getShowById(showId)).rejects.toThrow(
        "Network Error",
      );
    });

    it("should handle a 404 Not Found error when the show ID does not exist", async () => {
      const showId = 121;
      mock.onGet(`shows/${showId}`).reply(404, { message: "Not Found" });

      await expect(showsApi.getShowById(showId)).rejects.toThrow(
        "Request failed with status code 404",
      );
    });
  });
});
