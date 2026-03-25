import api from './api'

export const getEvents = async () => {
  const { data } = await api.get('/events')
  return data
}

export const createEvent = async (payload) => {
  const { data } = await api.post('/events', payload)
  return data
}
