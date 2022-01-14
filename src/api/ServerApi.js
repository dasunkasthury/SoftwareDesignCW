import API from "./api";

const pinReset = async (pinInfo) => {
  const response = await API.post(`/api/v1/admin/pin-reset`, pinInfo);
  return response.data;
};

const getWeather = async () => {
  const response = await API.get(`/weatherforecast`, {});
  return response.data;
};

const lockersOpenAll = async () => {
  const response = await API.put(`/api/v1/admin/lockers/open-all`, {});
  return response.data;
};

const Server = {
  pinReset,
  lockersOpenAll,
  getWeather,
};

export default Server;
