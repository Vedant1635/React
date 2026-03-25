import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const getPost = (limit, page) => {
  return api.get(`/posts?_limit=${limit}&_page=${page}`);
};