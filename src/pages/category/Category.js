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
import { useCategory } from '../../services';
import { useCustomToast } from '../../utils';
import ModalFormCategory from './components/ModalFormCategory';
import { useProducts } from './hooks/useProduct';

const Category = () => {
  const [searchParams] = useSearchParams();
  const { categoryList, deleteCategory } = useCategory();
  const { showToastError, showToastSuccess } = useCustomToast();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const { products } = useProducts();

  //   console.log('product', products);

  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const res = await categoryList();
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

  const totalProductsByCategory = (category, products) => {
    // find
    const productFilterByCategory = products.filter(
      item => item?.category?.name === category
    );

    // length
    const total = productFilterByCategory.length;

    return total;
  };

  const handleDelete = async () => {
    try {
      const res = await deleteCategory(selectedData?.id);
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
            Category List
          </Text>
          <Button
            text="ADD NEW CATEGORY"
            isBggradient
            onClick={() => setShowFormPopup(true)}
          />
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={'white'}>Category Name</Th>
              <Th color={'white'}>Total Product</Th>
              <Th></Th>
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
                    {totalProductsByCategory(item?.name, products)}
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
        title="Delete Category"
        confirmButtonText="Delete"
        onClose={handleCloseDeletePopup}
        onConfirm={handleDelete}
      >
        <Text fontSize="14px" color="gray.900">
          Are you sure?
        </Text>
      </Modal>
      <ModalFormCategory
        refresh={getListData}
        data={selectedData}
        isOpen={showFormPopup}
        onClose={handleCloseFormPopup}
      />
    </Box>
  );
};

export default Category;
