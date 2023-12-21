import {
  Flex,
  IconButton,
  useColorModeValue,
  Text,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  HStack,
  Image,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { FiBell, FiMenu } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

const Navbar = ({ onOpen, ...rest }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeText = event => {
    const { name, value } = event?.target;
    setSearchParams({ [name]: value });
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bgColor={'#1B1B1B'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      {/* <Image
        src={window.location.origin + '/codemasters_logo.png'}
        alignSelf="center"
        width="290px"
        height="32px"
      /> */}
      <Box width="212px" mr="27px"></Box>
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="shost"
          aria-label="open menu"
          textColor="C4C4C4"
          icon={<FiBell />}
        />
      </HStack>
    </Flex>
  );
};

export default Navbar;
