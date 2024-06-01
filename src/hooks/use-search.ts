import { useState } from "react";
import { Show } from "../types/show";
import showsApi from "../api/services/shows";
import { useDebounce } from "./use-debounce";

export const useSearch = (): {
  data: Show[];
  query: string;
  isLoading: boolean;
  errorMessage: string;
  handleSearch: (query: string) => Promise<void>;
} => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showsResults, setShowsResults] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const debouncedSearch = useDebounce(async (query: string) => {
    try {
      const { data } = await showsApi.searchShows(query);
      setShowsResults(data.map((item) => item.show));
    } catch (error) {
      console.log(error);
      setErrorMessage("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  }, 750);

  const search = async (query: string) => {
    setSearchQuery(query);

    if (!query) {
      setShowsResults([]);
      setIsLoading(false);
      setErrorMessage("");
      return;
    }

    setIsLoading(true);
    debouncedSearch(query);
  };

  return {
    data: showsResults,
    query: searchQuery,
    isLoading,
    errorMessage,
    handleSearch: search,
  };
};
