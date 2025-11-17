import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io("http://localhost:3001", {
      withCredentials: true,
      path: "/socket.io",
    });
  } else {
    return io("http://13.232.171.142:3001", {
      withCredentials: true,
      path: "/api/socket.io",
    });
  }
};
