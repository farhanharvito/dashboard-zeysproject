import {
  TableContainer,
  Box,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { priceFormatter, useCustomToast } from '../../utils';
import { useCourse } from '../../services';
import { BiShow } from 'react-icons/bi';
import ModalCourse from './components/ModalCourse';

const Course = () => {
  const [searchParams] = useSearchParams();
  const { courseList } = useCourse();
  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { showToastError } = useCustomToast();

  useEffect(() => {
    getListData(1, searchParams.get('search'));
  }, [searchParams]);

  const getListData = async (page, q) => {
    try {
      const res = await courseList(page, q);
      setData(res?.data);
      setLinks(res?.links);
    } catch (e) {
      showToastError(e.message);
    }
  };

  const handleOpenModal = data => {
    setSelectedData(data);
    setShowDetail(true);
  };

  const handleCloseModal = () => {
    setSelectedData(null);
    setShowDetail(false);
  };
  return (
    <Box>
      <TableContainer>
        <Text color="gray.900" fontSize="24px" mb="24px">
          Course Details
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Code</Th>
              <Th>Credits</Th>
              <Th>Location</Th>
              <Th>Bootcamp Mentor</Th>
              <Th>Fee</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr bgColor="gray.50" key={`payment-item-${item.id}`}>
                <Td fontSize="14px" color="gray.900">
                  {item?.title}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {item?.code}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {item?.credits}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {item?.location}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {item?.instructor}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {priceFormatter(item?.fee)}
                </Td>
                <Td>
                  <IconButton
                    size="s"
                    variant="ghost"
                    aria-label="open menu"
                    color="#667085"
                    icon={<BiShow />}
                    onClick={() => handleOpenModal(item)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination links={links} onClick={getListData} />
      <ModalCourse
        data={selectedData}
        isOpen={showDetail}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default Course;
