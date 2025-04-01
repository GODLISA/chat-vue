<template>
  <div class="chat">
    <div class="chat-title">
      <div class="avatar">
        <img :src="avatarImage" alt="Avatar" />
      </div>
      <h1>Chat</h1>
      <h2>Online</h2>
    </div>
    <div class="messages">
      <div class="messages-content">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', { 'message-personal': msg.isPersonal }]">
          <div class="avatar">
            <img :src="msg.avatarImage" alt="Avatar" />
          </div>
          <div class="message-text">
            <p>{{ msg.text }}</p>
            <span class="timestamp">{{ msg.timestamp }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="message-box">
      <textarea v-model="message" placeholder="Escribe tu mensaje..." class="message-input"></textarea>
      <button class="message-submit" @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>

import avatarImage from '@/assets/avatar.jpg';
import './assets/chat.css';


export default {
  data() {
    return {
      messages: [],
      message: '',
      avatar: 'https://example.com/avatar.jpg',
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        const newMessage = {
          text: this.message,
          avatar: this.avatar,
          timestamp: new Date().toLocaleTimeString(),
          isPersonal: false, // Puedes cambiar esto dependiendo si es tu mensaje o no
        };
        this.messages.push(newMessage);
        this.message = '';
      }
    },
   },
};
</script>


<script>
import socket from '../service/socketService';  // Asegúrate de importar el socketService

export default {
  name: 'ChatBox',
  data() {
    return {
      newMessage: '',
      messages: [],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        socket.emit('mensaje', this.newMessage); // Debe coincidir con el evento en server.js

        this.messages.push({ text: this.newMessage, sent: true });
        this.newMessage = '';
      }
    }
  },
  mounted() {
    // Escuchar el evento para recibir mensajes del servidor
    socket.on('mensaje', (message) => { // Debe coincidir con el evento en server.js
      this.messages.push({ text: message, sent: false });
    });
  },
  beforeUnmount() {
    // Limpiar eventos o recursos antes de que el componente se desmonte
    socket.off('receiveMessage');
  }
};
</script>
