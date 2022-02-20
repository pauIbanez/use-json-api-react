import { useRef } from "react";
import API from "./classes/API";

const useAPI = () => {
  const createAPI = (apiURL, errorHandler) => new API(apiURL, errorHandler);

  const api = useRef({
    createAPI,
  });
  return api.current;
};

export default useAPI;
