import axios from 'axios'

export default {
  getMatches () {
    return axios.get('/matches')
      .then(response => {
        return response.data
      })
  }
}
