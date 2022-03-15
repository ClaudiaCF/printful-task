<template>
  <div class="results content">
    <h1 class="results__title" v-if="testInfo.name">Thank you {{ testInfo.name }}!</h1>
    <h2 class="results__subtitle">
      {{ resultsText }}
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ResultsView',
  computed: {
    ...mapGetters(['testInfo', 'correctAnswers']),
    resultsText: function () {
      return Object.keys(this.correctAnswers).length === 0
        ? 'Please go back to the homepage :)'
        : `You have responded correctly ${this.correctAnswers.correct}/${this.correctAnswers.total} questions`
    }
  }
}
</script>

<style lang="scss">
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
