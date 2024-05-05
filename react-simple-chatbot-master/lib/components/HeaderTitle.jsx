import styled from 'styled-components';
import defaultTheme from '../theme';

const HeaderTitle = styled.p`
  margin-right: 30%;
  font-weight: bold;
  font-size: ${({ theme }) => theme.headerFontSize};
`;

HeaderTitle.defaultProps = {
  theme: defaultTheme
};

export default HeaderTitle;
