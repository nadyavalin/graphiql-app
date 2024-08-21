import React, { useState, useEffect } from "react";
import { BaseInput } from "@shared/ui-kits/input";
import { SimpleButton } from "@shared/ui-kits/buttons";
import { BaseForm } from "@shared/ui-kits/forms";

type SearchBarProps = {
  onSearch: (query: string) => void;
  value?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value = "" }) => {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleInputChange = (text: string) => {
    setQuery(text);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <BaseForm onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <BaseInput onChange={handleInputChange} inputDetails={{ value: query }} />
        <SimpleButton buttonDetails={{ name: "search", type: "submit" }} />
      </div>
    </BaseForm>
  );
};

export default SearchBar;
