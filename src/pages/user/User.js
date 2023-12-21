import {
  Box,
  Flex,
  IconButton,
  Image,
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
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
// import Constants from '../../constants';
import { useUser } from '../../services';
import { useCustomToast } from '../../utils';
import ModalFormUser from './components/ModalFormUser';

const User = () => {
  const { userList, deleteUser } = useUser();
  const { showToastError, showToastSuccess } = useCustomToast();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const res = await userList();
      setData(res);
    } catch (e) {}
  };

  const handleOpenDeletePopup = item => {
    setSelectedData(item);
    setShowDeletePopup(true);
  };

  const handleCloseFormPopup = () => {
    setSelectedData(null);
    setShowFormPopup(false);
  };

  const handleCloseDeletePopup = () => {
    setSelectedData(null);
    setShowDeletePopup(false);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteUser(selectedData?.id);
      setShowDeletePopup(false);
      showToastSuccess(res?.message);
      getListData();
    } catch (e) {
      showToastError(e || e?.error);
    }
  };
  return (
    <Box>
      <TableContainer>
        <Flex justifyContent="space-between">
          <Text color="white" fontSize="24px" mb="24px">
            User List
          </Text>
          <Button
            text="ADD NEW USER"
            isBggradient
            onClick={() => setShowFormPopup(true)}
          />
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={'white'}>Name</Th>
              <Th color={'white'}>Email</Th>
              <Th color={'white'}>Phone</Th>
              <Th color={'white'}>Username</Th>
              <Th color={'white'}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(item => {
              return (
                <Tr bgColor="gray.50" key={`payment-item-${item.id}`}>
                  <Td fontSize="14px" color="black">
                    {item?.name}
                  </Td>
                  <Td fontSize="14px" color="black">
                    {item?.email}
                  </Td>
                  <Td fontSize="14px" color="black">
                    {item?.phone}
                  </Td>
                  <Td fontSize="14px" color="black">
                    {item?.username}
                  </Td>
                  <Td>
                    <Flex gap="10px">
                      <IconButton
                        onClick={() => handleOpenDeletePopup(item)}
                        size="16px"
                        variant="ghost"
                        aria-label="open menu"
                        color="#667085"
                        icon={<BiTrashAlt />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={showDeletePopup}
        title="Delete User"
        confirmButtonText="Delete"
        onClose={handleCloseDeletePopup}
        onConfirm={handleDelete}
      >
        <Text fontSize="14px" color="gray.900">
          Are you sure?
        </Text>
      </Modal>
      <ModalFormUser
        refresh={getListData}
        data={selectedData}
        isOpen={showFormPopup}
        onClose={handleCloseFormPopup}
      />
    </Box>
  );
};

export default User;
