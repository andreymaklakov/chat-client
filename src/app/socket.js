import io from "socket.io-client";
import config from "../config.json";

const socket = io(config.API_URL);

export default socket;
