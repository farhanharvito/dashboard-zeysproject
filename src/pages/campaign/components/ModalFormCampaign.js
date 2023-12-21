import { Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import Modal from '../../../components/Modal';
import { useCampaign } from '../../../services';
import { useCustomToast } from '../../../utils';
import { Form } from 'react-router-dom';

const initialState = {
  name: '',
  details: '',
  date: '',
  status: '',
};

const ModalFormCampaign = ({ data, onClose, isOpen, refresh }) => {
  const { showToastError, showToastSuccess } = useCustomToast();
  const { addCampaign, updateCampaign } = useCampaign();
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({ ...data });
    } else {
      setForm(initialState);
    }
  }, [isOpen]);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      const res = await addCampaign({
        ...form,
        admissionDate: dayjs(form.admissionDate).format('DD/MM/YYYY'),
      });
      showToastSuccess(res?.message);
      onClose();
      refresh();
    } catch (e) {
      showToastError(e);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await updateCampaign(data?.id, {
        ...form,
        admissionDate: dayjs(form.admissionDate).format('DD/MM/YYYY'),
      });
      showToastSuccess(res?.message);
      onClose();
      refresh();
    } catch (e) {
      // showToastError(e);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={data ? handleUpdate : handleAdd}
      title={`${data ? 'Edit' : 'Add'} Data`}
      confirmButtonText="Save"
      isButtonLoading={isLoading}
    >
      <Flex gap="16px" direction="column">
        <FormInput
          name="name"
          value={form.name}
          onChange={handleChange}
          label="Name"
          placeholder="Expo"
        />
        <FormInput
          name="details"
          value={form.details}
          onChange={handleChange}
          label="Details"
          placeholder="Bekerjasama dengan Zeys"
        />
        <FormInput
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          label="Date"
          placeholder="23-Dec, 2023"
        />

        <FormInput
          name="status"
          value={form.status}
          onChange={handleChange}
          label="Status"
          placeholder="Ongoing"
        />
      </Flex>
    </Modal>
  );
};

export default ModalFormCampaign;
