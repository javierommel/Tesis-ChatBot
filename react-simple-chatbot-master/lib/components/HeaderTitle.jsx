import styled from 'styled-components';
import defaultTheme from '../theme';

const HeaderTitle = styled.p`
  margin-right: 10%;
  font-weight: bold;
  margin-botton: 0px;
  font-size: ${({ theme }) => theme.headerFontSize};
`;

HeaderTitle.defaultProps = {
  theme: defaultTheme
};

export default HeaderTitle;
