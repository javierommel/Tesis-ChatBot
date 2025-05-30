import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';
import { getChat } from '../../chat_ia';

class TextStep extends Component {
  /* istanbul ignore next */
  state = {
    loading: true,
    value: ''
  };

  async componentDidMount() {
    const { step, speak, previousValue, triggerNextStep, avatar, urlChatIa } = this.props;
    const { component, delay, waitAction, messageia } = step;
    const isComponentWatingUser = (component && waitAction);
    if (messageia) {
      const messages = await this.getMessageIA(previousValue, urlChatIa);
      this.setState({ loading: false, value: messages, avataria:avatar })
    }
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!isComponentWatingUser && !step.rendered) {
          triggerNextStep();
        }
        speak(step, previousValue);
      });
    }, delay);
  }

  getMessage = () => {
    const { previousValue, step } = this.props;
    const { message } = step;

    return message ? message.replace(/{previousValue}/g, previousValue) : '';
  };
  getMessageIA = async (messages, urlChatIa) => {
    console.log("message: " + messages)
    const respuesta = await getChat(messages,urlChatIa);
    console.log("respuesta: " + respuesta)
    return respuesta;
  };

  renderMessage = () => {
    const { step, steps, previousStep, triggerNextStep } = this.props;
    const { component } = step;

    if (component) {
      return React.cloneElement(component, {
        step,
        steps,
        previousStep,
        triggerNextStep
      });
    }
    return this.getMessage();
  };

  render() {
    const {
      step,
      isFirst,
      isLast,
      avatarStyle,
      bubbleStyle,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const { loading, value } = this.state;
    const { avatar, user, botName } = step;

    const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;

    const imageAltText = user ? "Your avatar" : `${botName}'s avatar`;
    return (
      <TextStepContainer className={`rsc-ts ${user ? 'rsc-ts-user' : 'rsc-ts-bot'}`} user={user}>
        <ImageContainer className="rsc-ts-image-container" user={user}>
          {isFirst && showAvatar && (
            <Image
              className="rsc-ts-image"
              style={avatarStyle}
              showAvatar={showAvatar}
              user={user}
              src={avatar}
              alt={imageAltText}
            />
          )}
        </ImageContainer>
        <Bubble
          className="rsc-ts-bubble"
          style={bubbleStyle}
          user={user}
          showAvatar={showAvatar}
          isFirst={isFirst}
          isLast={isLast}
        >
          {loading ? <Loading /> : (value===''?this.renderMessage():value)}
        </Bubble>
      </TextStepContainer>
    );
  }
}

TextStep.propTypes = {
  avatarStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  bubbleStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  hideBotAvatar: PropTypes.bool.isRequired,
  hideUserAvatar: PropTypes.bool.isRequired,
  previousStep: PropTypes.objectOf(PropTypes.any),
  previousValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  speak: PropTypes.func,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  steps: PropTypes.objectOf(PropTypes.any),
  triggerNextStep: PropTypes.func.isRequired,
  urlChatIa: PropTypes.string.isRequired
};

TextStep.defaultProps = {
  previousStep: {},
  previousValue: '',
  speak: () => { },
  steps: {}
};

export default TextStep;
