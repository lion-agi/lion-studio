import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import { timeRangeState, selectedModelState, apiDataState } from './atoms';
import { fetchApiData } from './api';

export const useApiData = () => {
  const timeRange = useRecoilValue(timeRangeState);
  const selectedModel = useRecoilValue(selectedModelState);
  
  return useQuery(['apiData', timeRange, selectedModel], () => fetchApiData(timeRange, selectedModel), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};