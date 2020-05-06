<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Match Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Distance</th>
            <th>Refreshed</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="match in matches" :key="match.id">
            <td><a href="#" @click.prevent="populateMatchToEdit(match)">{{ match.id }}</a></td>
            <td>{{ match.name }}</td>
            <td>{{ match.distance }}</td>
            <td>{{ match.updatedAt }}</td>
            <td class="text-right">
              <a href="#" @click.prevent="deleteMatch(match.id)">Unmatch</a>
            </td>
          </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Match ID #' + model.id : 'New Match')">
          <form @submit.prevent="saveMatch">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Distance">
              <b-form-input type="text" v-model="model.distance"></b-form-input>
            </b-form-group>
            <b-form-group label="Bio">
              <b-form-textarea rows="4" v-model="model.bio"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Match</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      loading: false,
      matches: [],
      model: {}
    }
  },
  async created () {
    this.refreshMatches()
  },
  methods: {
    async refreshMatches () {
      this.loading = true
      this.matches = await api.getMatches()
      this.loading = false
    },
    async populateMatchToEdit (match) {
      this.model = Object.assign({}, match)
    },
    async saveMatch () {
      if (this.model.id) {
        await api.updateMatch(this.model.id, this.model)
      } else {
        await api.createMatch(this.model)
      }
      this.model = {} // reset form
      await this.refreshMatches()
    },
    async deleteMatch (id) {
      if (confirm('Are you sure you want to remove this match?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteMatch(id)
        await this.refreshMatches()
      }
    }
  }
}
</script>
