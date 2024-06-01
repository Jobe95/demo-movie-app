import {
  useLoaderData,
  LoaderFunction,
  LoaderFunctionArgs,
} from "react-router-dom";
import { Show } from "../types/show";
import showsApi from "../api/services/shows";
import { useValidatedId } from "../hooks/use-validate-id";
import { Badge } from "../components/badge";
import { ShowImage } from "../components/show-image";
import { ShowSummary } from "../components/show-summary";
import { ContentContainer } from "../components/content-container";
import { StatusMessage } from "../components/status-message";
import { SearchInput } from "../components/search-input";
import { ShowCard } from "../components/show-card";
import { useSearch } from "../hooks/use-search";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs): Promise<Show> => {
  try {
    const { id, isValid } = useValidatedId(params.movieId);
    if (!isValid) {
      throw new Error("Invalid movie ID");
    }
    const { data } = await showsApi.getShowById(id!);

    return data;
  } catch (error) {
    throw error;
  }
};

export default function MovieDetailPage() {
  const show = useLoaderData() as Show;
  const {
    data: shows,
    query,
    isLoading,
    errorMessage,
    handleSearch,
  } = useSearch();

  return (
    <ContentContainer className="flex flex-col items-center gap-4" as="main">
      <div className="flex w-full flex-col items-start space-y-2 overflow-hidden sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="m-auto w-full flex-shrink-0 sm:m-0 sm:w-1/4 sm:min-w-[200px]">
          <ShowImage
            image={show.image?.original}
            alt={`${show.name} image`}
            variant="original"
            className="rounded-2xl"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl text-emerald-400">{show.name}</h1>
          <div className="flex flex-wrap gap-1">
            {show.genres.map((genre, index) => (
              <Badge key={index} text={genre} variant="genre" size="large" />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Badge
              text={show.rating.average?.toString() || "N/A"}
              variant="rating"
            />
            <Badge text={show.premiered} />
          </div>
          <ShowSummary summary={show.summary} />
        </div>
      </div>
      <SearchInput
        value={query}
        onChange={handleSearch}
        onClear={() => handleSearch("")}
      />
      <div>
        <StatusMessage message={errorMessage} variant="error" />
        {isLoading && <StatusMessage message="Loading..." variant="info" />}
        {!isLoading && query && shows.length === 0 && (
          <StatusMessage message="No shows found" variant="info" />
        )}
      </div>
      <div>
        {shows.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shows.map((show) => (
              <ShowCard key={show.id} {...show} />
            ))}
          </ul>
        )}
      </div>
    </ContentContainer>
  );
}
