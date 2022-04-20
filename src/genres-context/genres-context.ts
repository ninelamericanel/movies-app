import React from 'react';

import { GenresType } from 'types/app';

export type AppContextInterface = GenresType[] | [];

export const GenresContext = React.createContext<AppContextInterface | []>([]);
