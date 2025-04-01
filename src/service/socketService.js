import { io } from 'socket.io-client';

const socket = io("https://chat-vue-gj39.onrender.com");

export const sendMessage = (message) => {
  socket.emit('mensaje', message);
};

export const listenForMessages = (callback) => {
  socket.on('mensaje', (data) => {
    callback(data);
  });
};

// Exporta el socket para que pueda ser utilizado en otros archivos
export default socket;
