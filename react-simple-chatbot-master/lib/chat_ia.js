import 'regenerator-runtime/runtime'
const getChat = async (mensaje) => {
  const formData = new FormData();
  formData.append('mensaje', mensaje);

  try {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      body: formData,
      mode: 'cors', // Habilita CORS
    });

    if (response.ok) {
      const data = await response.json();
      return data.respuesta;
    } else {
      console.error('Error al enviar petición de chat');
      return "Error al enviar chat";
    }
  } catch (error) {
    console.error('Error de red:', error);
    return "Error al enviar chat";
  }
};

export {
  getChat
};