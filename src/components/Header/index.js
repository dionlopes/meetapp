import React from 'react';

import Logo from '~/assets/M.png';
import { Container, ImageLogo } from './styles';

export default function Header() {
  return (
    <Container>
      <ImageLogo source={Logo} style={{ resizeMode: 'stretch' }} />
    </Container>
  );
}
