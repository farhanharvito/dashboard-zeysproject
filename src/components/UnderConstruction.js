import React from 'react';
import { Image, Box, Text, Center } from '@chakra-ui/react';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/montserrat';

function UnderConstruction() {
  return (
    <Center height="100vh">
      <Box display="flex" alignItems="center">
        <Image
          src="https://img.freepik.com/free-vector/hand-drawn-construction-background_23-2147734520.jpg?w=740&t=st=1700627202~exp=1700627802~hmac=f4b9605326143c4309610eae47c483864d9209c88e45f5dbe711f552116c2c36"
          alt="Under Construction"
          boxSize="500"
        />
        <Text fontSize="4xl" fontWeight="bold" fontFamily="montserrat">
          Under Construction
        </Text>
      </Box>
    </Center>
  );
}

export default UnderConstruction;
