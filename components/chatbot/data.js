export const getData = async () => {
  let data = await fetch(`${process.env.URL_API}/users`);
  data = await data.json();
  return data.data;
};
