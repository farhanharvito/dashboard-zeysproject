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
import { BiEdit, BiTrashAlt, BiShow } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
// import Constants from '../../constants';
import { useProduct } from '../../services';
import { useCustomToast, priceFormatter } from '../../utils';
import ModalFormProduct from './components/ModalFormProduct';

const Product = () => {
  const { productList, deleteProduct } = useProduct();
  const { showToastError, showToastSuccess } = useCustomToast();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const res = await productList();
      setData(res);
    } catch (e) {}
  };

  const handleEdit = item => {
    setSelectedData(item);
    setShowFormPopup(true);
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
      const res = await deleteProduct(selectedData?.id);
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
            Product List
          </Text>
          <Button
            text="ADD NEW PRODUCT"
            isBggradient
            onClick={() => setShowFormPopup(true)}
          />
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={'white'}>Product Name</Th>
              <Th color={'white'}>Category</Th>
              <Th color={'white'}>Stock</Th>
              <Th color={'white'}>Price per piece</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(item => {
              return (
                <Tr bgColor="gray.50" key={`payment-item-${item.id}`}>
                  <Td fontSize="14px" color="gray.900">
                    {item?.name}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item?.category.name}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {priceFormatter(item?.price)}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item?.stock}
                  </Td>
                  <Td>
                    <Flex gap="10px">
                      <IconButton
                        onClick={() => handleEdit(item)}
                        size="16px"
                        variant="ghost"
                        aria-label="open menu"
                        color="#667085"
                        icon={<BiEdit />}
                      />
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
      <Pagination links={links} onClick={getListData} />
      <Modal
        isOpen={showDeletePopup}
        title="Delete Student"
        confirmButtonText="Delete"
        onClose={handleCloseDeletePopup}
        onConfirm={handleDelete}
      >
        <Text fontSize="14px" color="gray.900">
          Are you sure?
        </Text>
      </Modal>
      <ModalFormProduct
        refresh={getListData}
        data={selectedData}
        isOpen={showFormPopup}
        onClose={handleCloseFormPopup}
      />
    </Box>
  );
};

export default Product;
