import React from 'react';

import { GenresType } from 'types/app';

export interface AppContextInterface {
  genres: GenresType[] | [];
}

const { Provider: GenresProvider, Consumer: GenresConsumer } = React.createContext<AppContextInterface | []>([]);

export { GenresConsumer, GenresProvider };
