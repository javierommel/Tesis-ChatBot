import styled from 'styled-components';
import defaultTheme from '../../theme';

const OptionElement = styled.button`
  background: ${({ theme }) => theme.buttonOptionColor};
  border: 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
  color: ${({ theme }) => theme.botFontColor};
  font-family: Dejavu Sans, Arial, Verdana, sans-serif;
  display: inline-block;
  font-size: 12px;
  padding: 10px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0.5em 0.5em -0.4em;
    -webkit-transform: translateY(-0.15em);
          transform: translateY(-0.15em);
  }
  &:active,
  &:hover:focus {
    outline:none;
  }
`;

OptionElement.defaultProps = {
  theme: defaultTheme
};

export default OptionElement;
