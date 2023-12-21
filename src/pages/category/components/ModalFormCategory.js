import { Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import Modal from '../../../components/Modal';
import { useCategory } from '../../../services';
import { useCustomToast } from '../../../utils';
import { Form } from 'react-router-dom';

const initialState = {
  name: '',
};

const ModalFormCategory = ({ data, onClose, isOpen, refresh }) => {
  const { showToastError, showToastSuccess } = useCustomToast();
  const { addCategory, updateCategory } = useCategory();
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
      const res = await addCategory({
        ...form,
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
      const res = await updateCategory(data?.id, {
        ...form,
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
          placeholder="Kaos"
        />
      </Flex>
    </Modal>
  );
};

export default ModalFormCategory;
