import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cb(options, ...args);
      setData(res);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fn };
};

export default useFetch;
