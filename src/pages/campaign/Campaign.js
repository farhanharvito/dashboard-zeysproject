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
import { useCampaign } from '../../services';
import { useCustomToast } from '../../utils';
import ModalFormCampaign from './components/ModalFormCampaign';

const Campaign = () => {
  const { campaignList, deleteCampaign } = useCampaign();
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
      const res = await campaignList();
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
      const res = await deleteCampaign(selectedData?.id);
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
            Campaign List
          </Text>
          <Button
            text="ADD NEW CAMPAIGN"
            isBggradient
            onClick={() => setShowFormPopup(true)}
          />
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={'white'}>Name</Th>
              <Th color={'white'}>Details</Th>
              <Th color={'white'}>Date</Th>
              <Th color={'white'}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(item => {
              const formattedDate = dayjs(item?.date).format('DD/MM/YYYY');

              return (
                <Tr bgColor="gray.50" key={`payment-item-${item.id}`}>
                  <Td fontSize="14px" color="gray.900">
                    {item?.name}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item?.details}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {formattedDate}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    <Flex alignItems="center">
                      <Box
                        border="1px solid gray"
                        padding="4px"
                        borderRadius="5px"
                      >
                        {item?.status}
                      </Box>
                    </Flex>
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
      <ModalFormCampaign
        refresh={getListData}
        data={selectedData}
        isOpen={showFormPopup}
        onClose={handleCloseFormPopup}
      />
    </Box>
  );
};

export default Campaign;
