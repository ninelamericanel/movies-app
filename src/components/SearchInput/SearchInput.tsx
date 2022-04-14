import React from 'react';
import debounce from 'lodash.debounce';

import './SearchInput.scss';
import { SetValueToSearchFunc } from 'types/app';

interface SearchInputProps {
  setValueToSearch: SetValueToSearchFunc;
}

const SearchInput: React.FC<SearchInputProps> = ({ setValueToSearch }) => {
  const handleChange = debounce((event) => {
    const { target } = event;
    const value = target.value;
    setValueToSearch(value.trim());
  }, 500);
  return <input type="text" placeholder="Type to search..." className="input" onChange={handleChange}></input>;
};

export default SearchInput;
