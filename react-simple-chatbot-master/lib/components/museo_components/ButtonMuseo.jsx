import styled from 'styled-components';
import defaultTheme from '../../theme';

const ButtonMuseo = styled.button`
  background: ${({ theme }) => theme.headerBgColor};
  border: 0;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
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
