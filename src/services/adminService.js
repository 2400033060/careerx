import api from './api'

export const getPendingCompanies = async () => {
  const { data } = await api.get('/admin/companies/pending')
  return data
}

export const approveCompany = async (companyId) => {
  const { data } = await api.patch(`/admin/companies/${companyId}/approve`)
  return data
}

export const getAdminRegistrations = async () => {
  const { data } = await api.get('/admin/registrations')
  return data
}

export const getAdminBooths = async () => {
  const { data } = await api.get('/admin/booths')
  return data
}
