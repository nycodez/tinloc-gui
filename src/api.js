import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getMatches () {
    return this.execute('get', '/matches')
  },
  getMatch (id) {
    return this.execute('get', `/matches/${id}`)
  },
  createMatch (data) {
    return this.execute('post', '/matches', data)
  },
  updateMatch (id, data) {
    return this.execute('put', `/matches/${id}`, data)
  },
  deleteMatch (id) {
    return this.execute('delete', `/matches/${id}`)
  }
}
