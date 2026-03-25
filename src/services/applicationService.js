import api from './api'

export const applyToBooth = async ({ boothId, resumeFile }) => {
  const formData = new FormData()
  formData.append('boothId', boothId)
  formData.append('resume', resumeFile)

  const { data } = await api.post('/apply', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}

export const getCompanyApplications = async (companyId) => {
  const { data } = await api.get(`/applications/${companyId}`)
  return data
}
