import { services } from '.';

export default () => {
  const studentList = async (page = 1, q) => {
    try {
      const response = await services.get('students', {
        params: {
          page: page,
          search: q,
        },
      });
      return response;
    } catch (e) {
      throw e;
    }
  };

  const addStudent = async body => {
    try {
      const response = await services.post('students', body);
      return response;
    } catch (e) {
      throw e?.response?.data?.message;
    }
  };

  const deleteStudent = async studentId => {
    try {
      const response = await services.delete(`students/${studentId}`);
      return response;
    } catch (e) {
      throw e?.response?.data?.message;
    }
  };

  const updateStudent = async (studentId, body) => {
    try {
      const response = await services.put(`students/${studentId}`, body);
      return response;
    } catch (e) {
      throw e?.response?.data?.message;
    }
  };

  return {
    addStudent,
    studentList,
    deleteStudent,
    updateStudent,
  };
};
