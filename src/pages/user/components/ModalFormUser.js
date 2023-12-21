import { Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import Modal from '../../../components/Modal';
import { useUser } from '../../../services';
import { useCustomToast } from '../../../utils';
import { Form } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  username: '',
};

const ModalFormUser = ({ data, onClose, isOpen, refresh }) => {
  const { showToastError, showToastSuccess } = useCustomToast();
  const { addUser } = useUser();
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
      const res = await addUser({
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleAdd}
      title={`Add`}
      confirmButtonText="Save"
      isButtonLoading={isLoading}
    >
      <Flex gap="16px" direction="column">
        <FormInput
          name="name"
          value={form.name}
          onChange={handleChange}
          label="Name"
          placeholder="Karthi"
        />
        <FormInput
          name="email"
          value={form.email}
          onChange={handleChange}
          label="Email"
          placeholder="karthi@gmail.com"
        />
        <FormInput
          name="password"
          value={form.password}
          onChange={handleChange}
          label="Password"
          placeholder="08xx"
        />
        <FormInput
          name="phone"
          value={form.phone}
          onChange={handleChange}
          label="Phone"
          placeholder="1234567"
        />
        <FormInput
          name="username"
          value={form.username}
          onChange={handleChange}
          label="Username"
          placeholder="1234567"
        />
      </Flex>
    </Modal>
  );
};

export default ModalFormUser;
