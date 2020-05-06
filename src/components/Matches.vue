<template>
  <section class="matches-page">
    <p>{{ msg }}</p>
    <article v-for="match in matches" :key="match.id">
      <h3>{{ match.name }}</h3>
      <h3>{{ match.city }}</h3>
    </article>
  </section>
</template>

<script>
import MatchesApi from '@/services/api/Matches'
export default {
  name: 'Matches',
  data () {
    return {
      msg: 'list matches here',
      matches: []
    }
  },
  created () {
    MatchesApi.getMatches()
      .then(matches => {
        this.matches = matches
      })
  }
}
</script>
