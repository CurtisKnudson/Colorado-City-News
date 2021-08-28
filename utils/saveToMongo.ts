export const useSaveToMongo = async (data: any) => {
  fetch("http://localhost:3000/api/articles", {
    method: "POST",
    body: JSON.stringify({
      data: data,
    }),
  });
};
