import axios from "axios";
import { useEffect, useState } from "react";

export const useHackerNewsApi = (initalUrl, initalData) => {
  const [data, setData] = useState(initalData);
  const [url, setUrl] = useState(initalUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (err) {
        setIsError(err);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
