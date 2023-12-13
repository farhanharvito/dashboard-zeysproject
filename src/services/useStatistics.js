import { services } from '.';
export default () => {
  const statistics = async () => {
    try {
      const response = await services.get('statistics');
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    statistics,
  };
};
