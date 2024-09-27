import React, { useState } from "react";
import { Screen } from "../components/Screen";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";

const SearchScreen = () => {
  const [results, setResults] = useState<any[]>([]);

  return (
    <Screen>
      <SearchInput setResults={setResults} />
      <SearchResults results={results} />
    </Screen>
  );
};

export default SearchScreen;
