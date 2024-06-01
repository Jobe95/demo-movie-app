import { ContentContainer } from "../components/content-container";
import { ShowCard } from "../components/show-card";
import { SearchInput } from "../components/search-input";
import { useSearch } from "../hooks/use-search";
import { StatusMessage } from "../components/status-message";

export default function RootPage() {
  const {
    data: shows,
    query,
    isLoading,
    errorMessage,
    handleSearch,
  } = useSearch();

  return (
    <ContentContainer className="flex flex-col items-center gap-4" as="main">
      <img
        src="/finde-transparent.png"
        alt="Finde"
        className="mb-4 h-52 w-52"
      />
      <h1 className="text-center text-3xl text-emerald-500">
        Search for a show on finde
      </h1>

      <SearchInput
        value={query}
        autoFocus
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
          <ul className="xs:grid-cols-2 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shows.map((show) => (
              <ShowCard key={show.id} {...show} />
            ))}
          </ul>
        )}
      </div>
    </ContentContainer>
  );
}
