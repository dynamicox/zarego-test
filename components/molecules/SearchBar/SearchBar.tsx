import { selectSearchQuery, setSearchQuery } from "@/shared/store/appState";
import { useAppSelector } from "@/shared/store/hooks";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const storedQuery = useAppSelector(selectSearchQuery);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const performSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
      router.push(`/search/${query}`);
    },
    [dispatch, router]
  );

  useEffect(() => {
    if (storedQuery && !inputValue) {
      setInputValue(storedQuery);
    }
  }, []);

  const debouncedPerformSearch = useCallback(
    (query: string) => {
      performSearch(query);
    },
    [performSearch]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      debouncedPerformSearch(newValue);
      timeoutId.current = null;
    }, 500);
  };

  const handleSearch = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    performSearch(inputValue);
  };

  return (
    <div className="flex items-center">
      <input
        className="appearance-none outline-0 w-full h-full text-black bg-white p-2 rounded-l-md"
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className="bg-gray-900 rounded-r-md px-4 py-2 active:bg-gray-950 hover:bg-gray-800 cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
