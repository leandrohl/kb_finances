import axios from 'axios'

const api = axios.create({
  baseURL: 'https://kbfinances.herokuapp.com/'
})

export default api
