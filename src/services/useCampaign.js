import { services } from '.';

export default () => {
  const campaignList = async () => {
    try {
      const response = await services.get('campaign');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addCampaign = async body => {
    try {
      const response = await services.post('campaign/create', body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const deleteCampaign = async id => {
    try {
      const response = await services.delete(`campaign/${id}`);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const updateCampaign = async (id, body) => {
    try {
      const response = await services.put(`campaign/update/${id}`, body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  return {
    campaignList,
    addCampaign,
    deleteCampaign,
    updateCampaign,
  };
};
