import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';


const otherFontTheme =  {
  background: '#ffffff',
  fontFamily: 'Dejavu Sans, Arial, Verdana, sans-serif',
  headerBgColor: '#3C89CF',
  headerFontColor: '#FFFFFF',
  headerFontSize: '12px',
  botBubbleColor: '#339EFF',
  botFontColor: '#FFFFFF',
  userBubbleColor: '#F2F3F4',
  userFontColor: '#000000',
  buttonOptionColor:'#48C9B0', 
}

const steps = [
  {
    id: '1',
    message: 'Hola soy Elen, seré tu guía del museo. A continuación te muestro las opciones que tienes en esta visita virtual',
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
    trigger: '4',
  },
  {
    id: '4',
    message: 'De acuerdo a tus búsquedas y visitas hemos preparado estas piezas de arte que te podrían gustar.',
    messageia: false,
    trigger: '5',
  },
  {
    id: '5',
    options: [
      { value: 1, label: 'Arcángel San miguel', trigger: '1' },
      { value: 2, label: 'Virgen de la Merced', trigger: '2' },
      { value: 3, label: 'El Risco', trigger: '1' },
    ],
  },
];

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <React.StrictMode>
      <ChatBot 
      headerTitle="Guía Virtual del Museo"
      placeholder= 'Escriba su mensaje ...'
      recognitionPlaceholder= 'Escuchando ...'
      recognitionEnable={true}
      recognitionLang='es'
      typeRecognition={1}
      timeRecogntion={10000}
      steps={steps} />
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
