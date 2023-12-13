import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

const steps = [
  {
    id: '1',
    message: 'Dime algo?',
    messageia: false,
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'previusValue',
    messageia: true,
    trigger: '2',
  },
];

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <React.StrictMode>
      <ChatBot 
      headerTitle="Prueba de grabación de sonido"
      recognitionEnable={true}
      recognitionLang='es'
      typeRecognition={1}
      timeRecogntion={10000}
      steps={steps} />
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
