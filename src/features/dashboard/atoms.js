import { atom, selector } from 'recoil';
import { fetchApiData } from './api';

export const timeRangeState = atom({
  key: 'timeRange',
  default: '7d',
});

export const selectedModelState = atom({
  key: 'selectedModel',
  default: 'all',
});

export const apiDataState = selector({
  key: 'apiData',
  get: async ({ get }) => {
    const timeRange = get(timeRangeState);
    const selectedModel = get(selectedModelState);
    return fetchApiData(timeRange, selectedModel);
  },
});