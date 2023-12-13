import { services } from '.';
export default () => {
  const courseList = async (page = 1, q) => {
    try {
      const response = await services.get('courses', {
        params: {
          page: page,
          search: q,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return {
    courseList,
  };
};
