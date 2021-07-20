export const useSaveToMongo = async (data: any) => {
  fetch("http://localhost:3000/api/article", {
    method: "POST",
    body: JSON.stringify({
      data: data,
    }),
  });
};
