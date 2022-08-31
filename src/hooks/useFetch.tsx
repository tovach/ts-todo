import { useEffect, useState } from 'react';

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error - ${response.status.toString()}`);
      }

      const body: T[] = await response.json();
      setData(body);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};
