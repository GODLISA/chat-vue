<template>
  <div class="chat">
    <div class="chat-title">
      <div class="avatar">
        <img :src="avatar" alt="Avatar" />
      </div>
      <h1>Chat</h1>
      <h2>Online</h2>
    </div>
    <div class="messages">
      <div class="messages-content">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', { 'message-personal': msg.isPersonal }]">
          <div class="avatar">
            <img :src="msg.avatar" alt="Avatar" />
          </div>
          <div class="message-text">
            <p>{{ msg.text }}</p>
            <span class="timestamp">{{ msg.timestamp }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="message-box">
      <textarea v-model="newMessage" placeholder="Escribe tu mensaje..." class="message-input"></textarea>
      <button class="message-submit" @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>
import socket from '../service/socketService';  // Asegúrate de importar el socketService
import avatarImage from '@/assets/avatar.jpg';  // Asegúrate de que esta ruta sea correcta

export default {
  name: 'ChatBoxUltra',
  data() {
    return {
      newMessage: '',
      messages: [],
      avatar: avatarImage,  // Usa la imagen importada
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        // Crear el nuevo mensaje con la imagen de avatar
        const newMessage = {
          text: this.newMessage,
          avatar: this.avatar,  // Usar avatar del data
          timestamp: new Date().toLocaleTimeString(),
          isPersonal: false, // Puedes cambiar esto dependiendo si es tu mensaje o no
        };

        // Emitir el mensaje al servidor
        socket.emit('mensaje', this.newMessage);

        // Agregar el mensaje a la lista
        this.messages.push(newMessage);
        this.newMessage = '';
      }
    }
  },
  mounted() {
    // Escuchar el evento para recibir mensajes del servidor
    socket.on('mensaje', (message) => {
      this.messages.push({
        text: message,
        avatar: this.avatar,  // Usar la misma imagen para mensajes recibidos
        timestamp: new Date().toLocaleTimeString(),
        isPersonal: false, // Cambiar dependiendo si es mensaje personal o recibido
      });
    });
  },
  beforeUnmount() {
    // Limpiar eventos o recursos antes de que el componente se desmonte
    socket.off('mensaje');
  }
};
</script>

<style scoped>
  /* Aquí puedes agregar tus estilos CSS para el chat */
</style>
