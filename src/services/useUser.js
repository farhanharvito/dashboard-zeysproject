import { services } from '.';

export default () => {
  const userList = async () => {
    try {
      const response = await services.get('user');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addUser = async body => {
    try {
      const response = await services.post('user/register', body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const deleteUser = async id => {
    try {
      const response = await services.delete(`user/${id}`);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  return {
    userList,
    addUser,
    deleteUser,
  };
};
