import {useQuery} from "react-query"
import { getAllProperties } from '../utils/api';
const useProperties = () => {
    const {
      data,
      isLoading,
      isError,
    } = useQuery(
      "properties",
      getAllProperties,
        {refetchOnWindowFocus: false }
    );
  return {
    data,
    isLoading,
    isError,
  };
}

export default useProperties