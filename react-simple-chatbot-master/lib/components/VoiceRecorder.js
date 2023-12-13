import React from 'react';
import 'regenerator-runtime/runtime'
let instance = null;
const noop = () => { };

export default class VoiceRecorder {

  /**
  * Creates an instance of Recognition.
  * @param {function} [onChange] callback on change
  * @param {function} [onEnd]  callback on and
  * @param {function} [onStop]  callback on stop
  * @param {number} [typeRecognition=0] recognition type
  * @param {string} [urlRecognition='localhost'] recognition url
  * @param {number} [timeRecognition=10000] recognition time
  * @param {string} [lang='en'] recognition lang
  * @memberof Recognition
  * @constructor
  */
  constructor(onChange = noop, onEnd = noop, onStop = noop, typeRecognition = 0, urlRecognition = '', timeRecognition = 10000, lang = 'en') {
    if (!instance) {
      instance = this;
    }
    this.state = {
      inputValue: '',
      isRecording: false,
      audioBlob: null,
      language: lang,
      tipo: typeRecognition,
      urlRecognition,
      timeRecognition,
      onChange,
      onEnd,
      onStop
    };

    this.mediaRecorderRef = React.createRef();
    this.timerRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onEnd = this.onEnd.bind(this);
    return instance;
  }
  /**
   * Handler for recognition change event
   * @param {string} interimTranscript
   * @memberof Recognition
   * @private
   */
  onChange(interimTranscript) {
    const { onChange } = this.state;
    this.setState({
      inputValue: interimTranscript
    });
    onChange(interimTranscript);
  }

  /**
   * Handler for recognition end event
   * @memberof Recognition
   * @private
   */
  onEnd(force) {
    const { onStop, onEnd } = this.state;
    this.setState({ speaking: false });
    console.info("force: "+force)
    if (force) {
      onStop();
    } else {
      onEnd();
    }
  }


  /**
  * method for updating the instance state
  * @param {object} nextState
  * @memberof Recognition
  * @private
  */
  setState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
  }
  startRecording = async () => {
    this.setState({
      force: true
    });
    const { speaking } = this.state;
    if (!speaking) {
      this.setState({
        speaking: true,
        inputValue: ''
      });
      navigator.mediaDevices.getUserMedia({ audio: true }).then(mediaStream => {
        this.mediaRecorderRef.current = new MediaRecorder(mediaStream);
        const audioChunks = [];

        this.mediaRecorderRef.current.ondataavailable = event => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        const stopRecordingPromise = new Promise(resolve => {
          this.mediaRecorderRef.current.addEventListener('stop', async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
            this.state.audioBlob = audioBlob;
            const data = await this.sendAudioToWebService(audioBlob);
            this.onChange(data.transcript)
            /*this.setState({
              inputValue: data.transcript
            });*/
            resolve();
          });
        });
        this.mediaRecorderRef.current.start();
        this.setState({
          isRecording: true,
          stopRecordingPromise: stopRecordingPromise
        });
        this.state.isRecording = true;

        // Iniciar el temporizador para detener la grabación después de 10 segundos
        this.timerRef.current = setTimeout(async () => {
          await this.stopRecording();
          //const { inputValue } = this.state;
          //this.onChange(inputValue)
          console.info("timeout")
          this.onEnd(true);
          return this;
        }, this.state.timeRecognition);
      });
    }
    else {
      this.setState({
        force: true
      });
      await this.stopRecording();
      //const { inputValue } = this.state;
      //this.onChange(inputValue)
      //console.info("stop")
      this.onEnd(true);
    }
    return this;
  };

  stopRecording = async () => {
    if (this.mediaRecorderRef.current && this.mediaRecorderRef.current.state === 'recording') {
      this.mediaRecorderRef.current.stop()
      await this.state.stopRecordingPromise;
      this.state.isRecording = false;
      this.setState({
        isRecording: false,
        speaking: false
      });

      clearTimeout(this.timerRef.current);
    }
    return this;
  };

  sendAudioToWebService = async audioBlob => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.mp3');
    formData.append('language', this.state.language);
    formData.append('tipo', this.state.tipo);

    try {
      const response = await fetch(this.state.urlRecognition, {
        method: 'POST',
        body: formData,
        mode: 'cors', // Habilita CORS
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error al enviar la grabación de audio');
        return {transcript:"Error al transcribir audio"};
      }
    } catch (error) {
      console.error('Error de red:', error);
      return {transcript:"Error al transcribir audio"};
    }
  };

}
