import {configureStore} from '@reduxjs/toolkit';
import {stateApp} from '../reducer/stateApp';

export default configureStore({
  reducer: {
    stateApp: stateApp,
  },
});
