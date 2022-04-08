import React from 'react';
import debounce from 'lodash.debounce';

import './SearchInput.scss';
import { SetValueToSearchFunc } from '../App/App';

interface SearchInputProps {
  setValueToSearch: SetValueToSearchFunc;
}

const SearchInput: React.FC<SearchInputProps> = ({ setValueToSearch }) => {
  const handleChange = debounce((event) => {
    const { target } = event;
    setValueToSearch(target.value as HTMLButtonElement);
  }, 500);
  return <input type="text" placeholder="Type to search..." className="input" onChange={handleChange}></input>;
};

export default SearchInput;
