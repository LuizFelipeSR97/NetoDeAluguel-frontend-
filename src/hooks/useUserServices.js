import api from './useApi';

export async function GetUserServices(userId) {
  try{
    const response = await api.get(`/services/${userId}`);
    console.log(userId);
    console.log(response);
    return response.data;
  } catch (err) {
    return err
  }
}
