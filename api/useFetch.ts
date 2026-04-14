import axios, { isCancel } from "axios";
import { useCallback, useEffect, useState } from "react";

export const useFetch = <T = any>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/${endpoint}`,
          { signal },
        );
        setData(response.data);
        setError(null);
      } catch (error) {
        if (isCancel(error)) return;
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [endpoint],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData() };
};
