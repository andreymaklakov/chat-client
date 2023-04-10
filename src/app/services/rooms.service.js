import axios from "axios";
import config from "../../config.json";

const roomEndPoint = `${config.API_URL}/rooms`;

const roomService = {
  enterRoom: async (roomData) => {
    const { data } = await axios.post(roomEndPoint, roomData);

    return data;
  },

  get: async (roomId) => {
    const { data } = await axios.get(`${roomEndPoint}/${roomId}`);

    return data;
  },
};

export default roomService;
