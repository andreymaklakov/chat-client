import { createSlice } from "@reduxjs/toolkit";

import roomService from "../services/rooms.service";
import socket from "../socket";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    room: null,
    userName: null,
    joined: false,
    error: null,
    users: [],
    messages: [],
  },
  reducers: {
    roomReceived(state, action) {
      state.room = action.payload;
    },
    userReceived(state, action) {
      state.userName = action.payload;
    },
    usersReceived(state, action) {
      state.users = action.payload;
    },
    messagesReceived(state, action) {
      state.messages = action.payload;
    },
    messageReceived(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    userJoined(state) {
      state.joined = true;
    },
    receiveError(state, action) {
      if (action.payload.includes("500")) {
        state.error = "Our server has problem, please try later.";
      } else if (action.payload.includes("403")) {
        state.error = "Invalid password";
      } else {
        state.error = action.payload;
      }
    },
  },
});

const { reducer: chatReducer, actions } = chatSlice;
const {
  roomReceived,
  userReceived,
  usersReceived,
  messageReceived,
  messagesReceived,
  userJoined,
  receiveError,
} = actions;

export const joinRoom = (roomData) => async (dispatch) => {
  try {
    await roomService.enterRoom(roomData);

    socket.emit("ROOM:JOIN", roomData);

    const content = await roomService.get(roomData.roomId);

    dispatch(userJoined());
    dispatch(userReceived(roomData.userName));
    dispatch(roomReceived(roomData.roomId));
    dispatch(usersReceived(content.users));
    dispatch(messagesReceived(content.messages));
  } catch (error) {
    console.log(error);
    dispatch(receiveError(error.message));
  }
};

export const receiveUsers = (users) => (dispatch) => {
  dispatch(usersReceived(users));
};
export const receiveMessage = (message) => (dispatch) => {
  dispatch(messageReceived(message));
};

export const sendMessage = (text) => (dispatch, getState) => {
  socket.emit("ROOM:NEW_MESSAGE", {
    text,
    userName: getState().chat.userName,
    roomId: getState().chat.room,
  });

  dispatch(messageReceived({ text, userName: getState().chat.userName }));
};

export const getRoom = () => (state) => state.chat.room;
export const getJoined = () => (state) => state.chat.joined;
export const getError = () => (state) => state.chat.error;
export const getUsers = () => (state) => state.chat.users;
export const getMessages = () => (state) => state.chat.messages;
export const getUserName = () => (state) => state.chat.userName;

export default chatReducer;
