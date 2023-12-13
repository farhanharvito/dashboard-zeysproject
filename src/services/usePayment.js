import { services } from '.';

export default () => {
  const getPayments = async (search = '') => {
    try {
      const response = await services.get('payments', {
        params: {
          search: search,
        },
      });
      return response;
    } catch (e) {
      throw e;
    }
  };

  const getPaymentById = async paymentId => {
    try {
      const response = await services.get(`payments/${paymentId}`);
      return response;
    } catch (e) {
      throw e;
    }
  };

  return {
    getPayments,
    getPaymentById,
  };
};
