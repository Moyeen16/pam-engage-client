import { combineReducers } from 'redux';
import globalStore from './globalStore';

export default combineReducers({
  responseStore: globalStore,
});
