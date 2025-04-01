<template>
  <div class="chat-container">
    <div class="chat-box">
      <div v-for="(message, index) in messages" :key="index" :class="['message', message.sent ? 'sent' : 'received']">
        {{ message.text }}
      </div>
    </div>
    <div class="input-container">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Escribe un mensaje..." />
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

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
