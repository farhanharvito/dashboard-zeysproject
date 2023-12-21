import { services } from '.';

export default () => {
  const categoryList = async () => {
    try {
      const response = await services.get('category');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addCategory = async body => {
    try {
      const response = await services.post('category/create', body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const deleteCategory = async id => {
    try {
      const response = await services.delete(`category/${id}`);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const updateCategory = async (id, body) => {
    try {
      const response = await services.put(`category/update/${id}`, body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  return {
    categoryList,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
