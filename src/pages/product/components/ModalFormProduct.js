import { Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import Modal from '../../../components/Modal';
import { useProduct } from '../../../services';
import { useCustomToast } from '../../../utils';
import { Form } from 'react-router-dom';

const initialState = {
  name: '',
  product_category: '',
  price: '',
  stock: '',
};

const ModalFormProduct = ({ data, onClose, isOpen, refresh }) => {
  const { showToastError, showToastSuccess } = useCustomToast();
  const { addProduct, updateProduct } = useProduct();
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
      const res = await addProduct({
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
      const res = await updateProduct(data?.id, {
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
          placeholder="Produk A"
        />
        <FormInput
          name="product_category"
          value={form.product_category}
          onChange={handleChange}
          label="Product Categroy"
          placeholder="1"
        />
        <FormInput
          name="price"
          value={form.price}
          onChange={handleChange}
          label="Price per Piece"
          placeholder="150000"
        />
        <FormInput
          name="stock"
          value={form.stock}
          onChange={handleChange}
          label="Stock"
          placeholder="1"
        />
      </Flex>
    </Modal>
  );
};

export default ModalFormProduct;
