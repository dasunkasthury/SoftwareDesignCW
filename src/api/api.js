import axios from "axios";

const newClient = () =>
  axios.create({
    baseURL: `http://localhost:8085/`,
    headers: {
      "Content-Type": "application/json",
    },
  });

const get = async (endpoint, body) => {
  const client = newClient();
  console.log(client);
  // eslint-disable-next-line no-return-await
  return await client.get(endpoint, body);
};

const put = async (endpoint, body) => {
  const client = newClient();
  // eslint-disable-next-line no-return-await
  return await client.put(endpoint, body);
};

const post = async (endpoint, body) => {
  const client = newClient();
  // eslint-disable-next-line no-return-await
  return await client.post(endpoint, body);
};

const remove = async (endpoint, body) => {
  const client = newClient();
  // eslint-disable-next-line no-return-await
  return await client.delete(endpoint, body);
};

const API = {
  get,
  put,
  post,
  remove,
};

export default API;
