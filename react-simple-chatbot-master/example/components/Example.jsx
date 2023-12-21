import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme =  {
  background: '#F9F9F9',
  fontFamily: 'Roboto, Arial, sans-serif',
  fontSize: '10px',
  headerBgColor: '#8F9DAA',
  headerFontColor: '#FFFFFF',
  headerFontSize: '12px',
  botBubbleColor: '#6B9FCF',
  botFontColor: '#FFFFFF',
  userBubbleColor: '#D9DEE3',
  userFontColor: '#333333',
}

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
      headerTitle="Ayuda en línea"
      recognitionEnable={true}
      recognitionLang='es'
      typeRecognition={1}
      timeRecogntion={10000}
      steps={steps} />
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
