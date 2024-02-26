import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootreducer';

export default function () {
  return configureStore({ reducer });
}
