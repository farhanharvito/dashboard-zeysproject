import { Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
// import Modal from '../../../components/Modal';
import ModalDetails from '../../../components/ModalDetails';
import { usePayment } from '../../../services';
import { useCustomToast } from '../../../utils';

const ModalFormPayment = ({ data, onClose, isOpen }) => {
  const { showToastError, showToastSuccess } = useCustomToast();
  const { detailPayment } = usePayment();
  //   const [form, setForm] = useState(initialState);
  //   const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     if (data) {
  //       setForm({ ...data });
  //     } else {
  //       setForm(initialState);
  //     }
  //   }, [isOpen]);

  return (
    <ModalDetails
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Details"
      withCloseIcon={true}
    >
      <Flex gap="16px" direction="column">
        <Flex justifyContent="space-between" direction="row">
          <Text>Name</Text>
          <Text>{data?.student.name}</Text>
        </Flex>
        <Flex justifyContent="space-between" direction="row">
          <Text>Payment Schedule</Text>
          <Text>{data?.schedule}</Text>
        </Flex>
        <Flex justifyContent="space-between" direction="row">
          <Text>Bill Number</Text>
          <Text>{data?.billNumber} </Text>
        </Flex>
        <Flex justifyContent="space-between" direction="row">
          <Text>Amount Paid</Text>
          <Text>{data?.amount} </Text>
        </Flex>
        <Flex justifyContent="space-between" direction="row">
          <Text>Balance Amount</Text>
          <Text>{data?.balance} </Text>
        </Flex>
        <Flex justifyContent="space-between" direction="row">
          <Text>Date of Admission</Text>
          <Text>
            {dayjs(data?.student.admissionDate).format('DD-MMM, YYYY')}{' '}
          </Text>
        </Flex>
      </Flex>
    </ModalDetails>
  );
};

export default ModalFormPayment;
