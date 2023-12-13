import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { BiBook, BiDollar } from 'react-icons/bi';
import { FiUser, FiUsers } from 'react-icons/fi';
import { useStatistics } from '../../services';
import { useCustomToast } from '../../utils';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { statistics } = useStatistics();
  const { showToastError } = useCustomToast();
  const [data, setData] = useState([]);

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = async () => {
    try {
      const res = await statistics();
      setData(res);
    } catch (e) {
      showToastError(e.message);
    }
  };
  return (
    <Box px="2%" py="2%">
      <Flex direction="row" gap="2%">
        <Box w="50%" bg="blue.50" p="2%" borderRadius="10px">
          <Link to="/admin/students">
            <Flex direction="column">
              <Icon as={FiUsers} w={7} h={7} color="blue.500" mb="5px" />
              <Text color="blue.500" fontWeight="bold">
                Students
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
          <Link to="/admin/course">
            <Flex direction="column">
              <Icon as={BiBook} w={7} h={7} color="pink.500" mb="5px" />
              <Text color="pink.500" fontWeight="bold">
                Course
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
          <Link to="/admin/payment">
            <Flex direction="column">
              <Icon as={BiDollar} w={7} h={7} color="#B54708" mb="5px" />
              <Text color="#B54708" fontWeight="bold">
                Payments
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
        <Box w="50%" bg="#F94449" p="2%" borderRadius="10px">
          <Flex direction="column">
            <Icon as={FiUser} w={7} h={7} color="white" mb="5px" />
            <Text color="white" fontWeight="bold">
              Users
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
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
