import { services } from '.';

export default () => {
  const productList = async () => {
    try {
      const response = await services.get('product');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addProduct = async body => {
    try {
      const response = await services.post('product/create', body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const deleteProduct = async id => {
    try {
      const response = await services.delete(`product/${id}`);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const updateProduct = async (id, body) => {
    try {
      const response = await services.put(`product/update/${id}`, body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  return {
    productList,
    addProduct,
    deleteProduct,
    updateProduct,
  };
};
