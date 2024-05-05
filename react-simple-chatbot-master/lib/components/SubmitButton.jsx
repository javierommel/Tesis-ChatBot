import styled, { css } from 'styled-components';
import defaultTheme from '../theme';
import { pulse } from '../common/animations';

const fillFunc = props => {
  const { speaking, invalid, theme } = props;

  if (speaking) {
    return '#2E86C1';
  }
  return invalid ? '#E53935' : '#4a4a4a';
};

const SubmitButton = styled.button`
  background-color: #306596;
  border: 0;
  border-radius: 30px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  fill: ${fillFunc};
  opacity: ${props => (props.disabled && !props.invalid ? '.5' : '1')};
  outline: none;
  padding: 5px ;
  height: 35px;
  width: 35px;
  margin: 8px;
  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    animation: ${({ theme, speaking }) =>
      speaking
        ? css`
            ${pulse('#ffffff')} 1s ease infinite
          `
        : ''};
  }
  &:not(:disabled):hover {
    opacity: 0.7;
  }
`;

SubmitButton.defaultProps = {
  theme: defaultTheme
};

export default SubmitButton;
