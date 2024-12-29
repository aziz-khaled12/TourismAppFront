import { useState, useRef, useEffect, useCallback } from "react";
import { DEBOUNCE_DELAY } from "../constants";
import searchService from "../services/searchService"; // Example service for search API

const useSearchLogic = (map) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeoutRef = useRef(null);
  const markersRef = useRef([]);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  }, []);

   const handleSearch = useCallback(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
  
      setIsLoading(true);
      try {
        const searchResults = await searchService.searchPlaces(
          query,
        );
        setResults(searchResults);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, [query]);

  const handleResultClick = useCallback((lat, lon) => {
    setResults([]);
    clearMarkers();
    const marker = L.marker([lat, lon]);
    marker.addTo(map);
    markersRef.current.push(marker);
    map.flyTo([lat, lon], 17);
  }, [map, clearMarkers]);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(handleSearch, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(debounceTimeoutRef.current);
    };
  }, [handleSearch]);

  return {
    query,
    setQuery,
    results,
    setResults,
    isLoading,
    handleResultClick,
  };
};

export default useSearchLogic;
