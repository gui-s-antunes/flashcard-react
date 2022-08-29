import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'FLASH-CARDS',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );

  return persistedReducers;
};
