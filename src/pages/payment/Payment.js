import {
  Box,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import usePayment from '../../services/usePayment';
import { useSearchParams } from 'react-router-dom';
// import Constants from '../../constants';
import { useCustomToast } from '../../utils';
import Pagination from '../../components/Pagination';
import ModalFormPayment from './components/ModalFormPayment';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const { getPayments } = usePayment();
  const { showToastError, showToastSuccess } = useCustomToast();

  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [showFormPopup, setShowFormPopup] = useState(false);

  useEffect(() => {
    getPaymentList(1, searchParams.get('search'));
  }, [searchParams]);

  const getPaymentList = async (page, q) => {
    try {
      const res = await getPayments(page, q);
      setData(res?.data);
      setLinks(res?.links);
    } catch (e) {
      showToastError(e);
    }
  };

  const handleViewDetails = item => {
    setSelectedData(item);
    setShowDetailModal(true);
    setShowFormPopup(true);
  };
  const handleCloseFormPopup = () => {
    setSelectedData(null);
    setShowFormPopup(false);
  };

  return (
    <Box>
      <TableContainer>
        <Flex>
          <Text color="gray.900" fontSize="24px" mb="24px">
            Payment List
          </Text>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="gray.500">Name</Th>
              <Th color="gray.500">Payment Schedule</Th>
              <Th color="gray.500">Bill Number</Th>
              <Th color="gray.500">Amount paid</Th>
              <Th color="gray.500">Balance Amount</Th>
              <Th color="gray.500">Date of Admission</Th>
              <Th color="gray.500"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(item => {
              return (
                <Tr bgColor="gray.50" key={`payment-item-${item.id}`}>
                  <Td fontSize="14px" color="gray.900">
                    {item.student?.name}{' '}
                  </Td>
                  <Td fontSize="14px" color="black">
                    {item.schedule}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item.number}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item.amount}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item.balance}
                  </Td>

                  <Td fontSize="14px" color="gray.900">
                    {dayjs(item.paymentDate).format('DD-MMM, YYYY')}
                  </Td>
                  <Td>
                    <Flex gap="10px">
                      <IconButton
                        onClick={() => handleViewDetails(item)}
                        size="xs"
                        variant="ghost"
                        aria-label="open menu"
                        color="#667085"
                        icon={<AiOutlineEye />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination links={links} onClick={getPaymentList} />
      <ModalFormPayment
        refresh={getPaymentList}
        data={selectedData}
        isOpen={showFormPopup}
        onClose={handleCloseFormPopup}
      />
    </Box>
  );
};

export default Payment;
