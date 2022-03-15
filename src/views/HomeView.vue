<template>
  <div class="home content">
    <h1 class="home__title">Technical task</h1>
    <div class="home__fields-wrapper">
      <b-field class="home__field home__field--name" label="Name">
        <b-input class="home__input" v-model="name"></b-input>
      </b-field>
      <b-field class="home__field home__field--quiz" label="Quiz type">
        <b-select
          class="home__select"
          v-model="selectedQuiz"
          :loading="loadedQuizzes"
          placeholder="Select a quiz"
          expanded>
          <option class="home__option" v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
            {{ quiz.title }}
          </option>
        </b-select>
      </b-field>
    </div>
    <b-button class="home__button" @click="onStartClick">Start</b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['quizzes'])
  },
  data: function () {
    return {
      name: '',
      selectedQuiz: '',
      loadedQuizzes: false
    }
  },
  created() {
    this.loadedQuizzes = true
    this.fetchAllQuizzes().then(() => (this.loadedQuizzes = false))
  },
  methods: {
    ...mapActions(['fetchAllQuizzes', 'setTestInfo']),
    onStartClick: function () {
      if (!this.name || !this.selectedQuiz) {
        this.$buefy.toast.open({
          duration: 1500,
          message: 'Please fill in all of the fields above before continuing',
          position: 'is-bottom',
          type: 'is-danger'
        })
        return
      }
      this.setTestInfo({ name: this.name, quizId: this.selectedQuiz })
      this.$router.push('/questions')
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__button {
    margin-top: 30px;
  }
}
</style>
