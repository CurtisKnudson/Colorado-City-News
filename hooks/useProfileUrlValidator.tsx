import useSWR from "swr";

export const useProfileUrlValidator = (profileUrl: string) => {
  const getObject = {
    method: "GET",
    headers: {
      body: profileUrl,
    },
  };
  const fetcher = (url: string) =>
    fetch(url, getObject).then((res) => res.json());

  const { data, error } = useSWR(`/api/user/isProfileUrlTaken`, fetcher);

  return {
    res: data,
    isLoading: !error && !data,
    isError: error,
  };
};
