import React from 'react';
import debounce from 'lodash.debounce';

import './SearchInput.scss';
import { SetValueToSearchFunc } from 'types/app';

interface SearchInputProps {
  setValueToSearch: SetValueToSearchFunc;
  search: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ setValueToSearch, search }) => {
  const handleChange = debounce((event) => {
    const { target } = event;
    const textValue = target.value;
    setValueToSearch(textValue.trim());
  }, 500);
  return (
    <input
      type="text"
      placeholder="Type to search..."
      defaultValue={search}
      className="input"
      onChange={handleChange}
    ></input>
  );
};

export default SearchInput;
