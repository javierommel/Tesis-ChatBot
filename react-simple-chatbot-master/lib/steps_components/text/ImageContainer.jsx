import styled from 'styled-components';

const ImageContainer = styled.div`
  display: inline-block;
  order: ${props => (props.user ? '1' : '0')};
  padding: 0px 6px 0px 6px;
`;

export default ImageContainer;
