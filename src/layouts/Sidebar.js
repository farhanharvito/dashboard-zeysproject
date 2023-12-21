'use client';

import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Image,
  Center,
  Button,
} from '@chakra-ui/react';
import { FiHome, FiUsers } from 'react-icons/fi';
import { VscNote, VscSettings } from 'react-icons/vsc';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BiBook, BiDollar, BiLogOut, BiListCheck } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const LinkItems = [
  { name: 'Home', icon: FiHome, pathname: '/admin/dashboard' },
  { name: 'Products', icon: BiBook, pathname: '/admin/product' },
  { name: 'User Admin', icon: FiUsers, pathname: '/admin/user' },
  { name: 'Category', icon: BiListCheck, pathname: '/admin/category' },
  { name: 'Campaign', icon: FaRegCalendarAlt, pathname: '/admin/campaign' },
];

const NavItem = ({ icon, children, pathname, ...rest }) => {
  const currentPathName = window.location.pathname;
  const isActive = pathname === currentPathName;

  return (
    <Box
      as="a"
      href={pathname}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        pt="12px"
        pb="12px"
        pl="16px"
        pr="16px"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color={isActive ? 'white' : 'gray.500'}
        bgGradient={
          isActive ? 'linear(to-r, #0066FF 37.55%, #0066FF 184.78%)' : ''
        }
        fontSize="14"
        _hover={{
          bgGradient: 'linear(to-r, #0066FF 37.55%, #0066FF 184.78%)',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20px"
            color={isActive ? 'white' : '#0066FF'}
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const Sidebar = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box
      transition="3s ease"
      bg={'#2B2B2B'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={window.location.origin + '/zeyslogo_dashboard.png'} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box mb="40px">
        <Center>
          <Image src={window.location.origin + '/avatar.png'} />
        </Center>
        <Center>
          <Text fontSize="md" color={'white'}>
            Lutfi Elyas
          </Text>
        </Center>
        <Center>
          <Text fontSize="sm" color="gray.500">
            Admin
          </Text>
        </Center>
      </Box>
      <Flex direction="column" gap="16px">
        {LinkItems.map(link => (
          <NavItem key={link.name} icon={link.icon} pathname={link.pathname}>
            {link.name}
          </NavItem>
        ))}
      </Flex>
      <Center>
        <Button
          textColor="gray.500"
          mt="40px"
          size="sm"
          variant="ghost"
          rightIcon={<BiLogOut color="#0066FF" size={20} />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Center>
    </Box>
  );
};

export default Sidebar;
