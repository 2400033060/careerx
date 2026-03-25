import api from './api'

export const createBooth = async (payload) => {
  const { data } = await api.post('/booths', payload)
  return data
}

export const getBoothsByEvent = async (eventId) => {
  const { data } = await api.get(`/booths/${eventId}`)
  return data
}

export const getBoothById = async (boothId) => {
  const { data } = await api.get(`/booths/detail/${boothId}`)
  return data
}

export const addJobToBooth = async (boothId, payload) => {
  const { data } = await api.post(`/booths/${boothId}/jobs`, payload)
  return data
}
