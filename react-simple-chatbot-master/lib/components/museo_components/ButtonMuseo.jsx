import styled from 'styled-components';
import defaultTheme from '../../theme';

const ButtonMuseo = styled.button`
  background: ${({ theme }) => theme.buttonOptionColor};
  border: 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
  color: ${({ theme }) => theme.botFontColor};
  display: inline-block;
  font-size: 12px;
  padding: 10px;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  &:active,
  &:hover:focus {
    outline:none;
  }
`;

ButtonMuseo.defaultProps = {
  theme: defaultTheme
};

export default ButtonMuseo;
