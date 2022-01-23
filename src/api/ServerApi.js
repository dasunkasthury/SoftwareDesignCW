import API from "./api";

const pinReset = async (pinInfo) => {
  const response = await API.post(`/api/v1/admin/pin-reset`, pinInfo);
  return response.data;
};

const addTransaction = async (transactionType, transactionCategory, amount, date, memo) => {
  const response = await API.post(`/ServicesAPI`, {serviceType: "GENERAL", functionId: 1, transactionType, transactionCategory, amount, date, memo});
  return response.data;
};

const updateTransaction = async (id, transactionType, transactionCategory, amount, date, memo) => {
  const response = await API.post(`/ServicesAPI`, {serviceType: "GENERAL", functionId: 2, id, transactionType, transactionCategory, amount, date, memo});
  return response.data;
};

const deleteTransaction = async (id) => {
  const response = await API.post(`/ServicesAPI`, {serviceType: "GENERAL", functionId: 3, id});
  return response.data;
};

const getAllTransactions = async () => {
  const response = await API.post(`/ServicesAPI`, {serviceType: "GENERAL", functionId: 4});
  return response.data;
};

const getTransactionsByDate = async (startDate, endDate) => {
  console.log("startDate -----------> ", startDate);
  console.log("endDate -----------> ", endDate);
  const response = await API.post(`/ServicesAPI`, {serviceType: "GENERAL", functionId: 4});
  return response.data;
};

const getAllCategories = async () => {
  const response = await API.post(`/ServicesAPI`, {serviceType: "CATEGORY", functionId: 4});
  return response.data;
};

const addCategory = async (name) => {
  const response = await API.post(`/ServicesAPI`, {serviceType: "CATEGORY", functionId: 1, transactionCategory: 5, name});
  return response.data;
};

const editCategory = async (id, name) => {
  const response = await API.post(`/ServicesAPI`, {serviceType: "CATEGORY", functionId: 2, id, name});
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await API.post(`/ServicesAPI`, {serviceType: "CATEGORY", functionId: 3, id});
  return response.data;
};

const getWeather = async () => {
  const response = await API.get(`/api/Customer`, {});
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
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByDate,
  getAllCategories,
  addCategory,
  editCategory, 
  deleteCategory,
};

export default Server;
