import { ApiSearchResponse } from "../../types/api-search-response";
import { Show } from "../../types/show";
import { client } from "../client";

const showsApi = {
  searchShows: (query: string) =>
    client.get<ApiSearchResponse[]>("search/shows", {
      params: { q: query.toLowerCase() },
    }),
  getShowById: (id: number) => client.get<Show>(`shows/${id}`),
};

export default showsApi;
