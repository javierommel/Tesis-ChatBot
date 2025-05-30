import styled from 'styled-components';
import { scale } from '../../common/animations';
import defaultTheme from '../../theme';

const Bubble = styled.div`
  animation: ${scale} 0.3s ease forwards;
  background: ${props => (props.user ? props.theme.userBubbleColor : props.theme.botBubbleColor)};
  border-radius: ${props => {
    const { isFirst, isLast, user } = props;

    if (!isFirst && !isLast) {
      return user ? '5px 0 0 5px' : '0 5px 5px 0px';
    }

    if (!isFirst && isLast) {
      return user ? '5px 0 5px 5px' : '0 5px 5px 5px';
    }

    return props.user ? '5px 5px 0 5px' : '5px 5px 5px 0';
  }};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  color: ${props => (props.user ? props.theme.userFontColor : props.theme.botFontColor)};
  display: inline-block;
  font-size: 12px;
  max-width: 70%;
  margin: ${props => {
    const { isFirst, showAvatar, user } = props;

    if (!isFirst && showAvatar) {
      return user ? '-8px 46px 10px 0' : '-8px 0 10px 46px';
    }

    if (!isFirst && !showAvatar) {
      return user ? '-8px 0px 10px 0' : '-8px 0 10px 0px';
    }

    return '0 0 10px 0';
  }};
  overflow: hidden;
  position: relative;
  padding: 8px;
  transform: scale(0);
  transform-origin: ${props => {
    const { isFirst, user } = props;

    if (isFirst) {
      return user ? 'bottom right' : 'bottom left';
    }

    return user ? 'top right' : 'top left';
  }};
`;

Bubble.defaultProps = {
  theme: defaultTheme
};

export default Bubble;
