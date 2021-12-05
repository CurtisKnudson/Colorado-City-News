import useSWR from "swr";

interface UseUserProps {
  param: string;
  value: string;
}

export const useUser = ({ param, value }: UseUserProps) => {
  const getObject = {
    method: "GET",
    headers: {
      body: value,
    },
  };
  const fetcher = (url: string) =>
    fetch(url, getObject).then((res) => res.json());

  const { data, error } = useSWR(`/api/user/${param}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
