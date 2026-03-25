import api from './api'

export const getBoothMessages = async (boothId) => {
  const { data } = await api.get(`/messages/${boothId}`)
  return data
}
