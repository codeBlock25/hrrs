export const isDev = process.env.NODE_ENV === "development";
export const server_url = isDev
  ? "http://localhost:4455/api"
  : "https://hrrs.herokuapp.com/api";
