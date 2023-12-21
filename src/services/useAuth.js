import { services } from '.';

export default () => {
  const signIn = async body => {
    try {
      const response = await services.post('user/login', body);
      return response;
    } catch (e) {
      throw e;
    }
  };

  return {
    signIn,
  };
};
