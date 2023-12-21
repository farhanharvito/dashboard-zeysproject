import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { BiBook, BiListCheck } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { useCustomToast } from '../../utils';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { showToastError } = useCustomToast();
  const [data, setData] = useState([]);

  return (
    <Box bg="#1B1B1B" minHeight="100vh">
      <Box px="2%" py="2%">
        <Flex direction="row" gap="2%">
          <Box w="50%" bg="blue.50" p="2%" borderRadius="10px">
            <Link to="/admin/user">
              <Flex direction="column">
                <Icon as={FiUsers} w={7} h={7} color="blue.500" mb="5px" />
                <Text color="blue.500" fontWeight="bold">
                  User Admin
                </Text>
                <Text
                  color="black"
                  fontWeight="bold"
                  alignSelf="end"
                  fontSize="30px"
                >
                  {data?.students}
                </Text>
              </Flex>
            </Link>
          </Box>
          <Box w="50%" bg="pink.50" p="2%" borderRadius="10px">
            <Link to="/admin/product">
              <Flex direction="column">
                <Icon as={BiBook} w={7} h={7} color="pink.500" mb="5px" />
                <Text color="pink.500" fontWeight="bold">
                  Products
                </Text>
                <Text
                  color="black"
                  fontWeight="bold"
                  alignSelf="end"
                  fontSize="30px"
                >
                  {data?.courses}
                </Text>
              </Flex>
            </Link>
          </Box>
          <Box w="50%" bg="#FFFAEB" p="2%" borderRadius="10px">
            <Link to="/admin/category">
              <Flex direction="column">
                <Icon as={BiListCheck} w={10} h={10} color="#B54708" mb="5px" />
                <Text color="#B54708" fontWeight="bold">
                  Category
                </Text>
                <Text
                  color="black"
                  fontWeight="bold"
                  alignSelf="end"
                  fontSize="30px"
                >
                  {data?.payments}
                </Text>
              </Flex>
            </Link>
          </Box>
          <Box w="50%" bg="#0066FF" p="2%" borderRadius="10px">
            <Link to="/admin/campaign">
              <Flex direction="column">
                <Icon
                  as={FaRegCalendarAlt}
                  w={7}
                  h={7}
                  color="white"
                  mb="5px"
                />
                <Text color="white" fontWeight="bold">
                  Campaign
                </Text>
                <Text
                  color="white"
                  fontWeight="bold"
                  alignSelf="end"
                  fontSize="30px"
                >
                  {data?.users}
                </Text>
              </Flex>
            </Link>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Dashboard;
