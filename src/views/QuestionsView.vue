<template>
  <div class="questions content">
    <question
      class="questions__question"
      v-if="questions[counter]"
      :question="questions[counter]"
      @answerSelected="answerSelected = $event"
      @error="showError($event)" />
    <b-button class="questions__button" v-if="!!questions.length" :disabled="!answerSelected" @click="onNextStepClick">
      {{ nextStepText }}
    </b-button>
    <b-progress class="questions__progress" v-if="!!questions.length" :value="questionsProgress" />
  </div>
</template>
<script>
import Question from '../components/Question'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  components: { Question },
  computed: {
    ...mapGetters(['questions']),
    questionsProgress: function () {
      return (100 / this.questions.length) * this.counter
    },
    nextStepText: function () {
      return this.lastStep ? 'Submit' : 'Next'
    },
    lastStep: function () {
      return this.counter === this.questions.length - 1
    }
  },
  data: function () {
    return {
      counter: 0,
      answerSelected: undefined,
      selectedAnswers: []
    }
  },
  created() {
    this.fetchAllQuestions().catch((error) => this.showError(error))
  },
  methods: {
    ...mapActions(['fetchAllQuestions', 'fetchCorrectAnswers']),
    onNextStepClick: async function () {
      if (this.lastStep) {
        await this.fetchCorrectAnswers(this.selectedAnswers).then(() => this.$router.push('/results'))
      }
      this.selectedAnswers.push(this.answerSelected)
      this.answerSelected = undefined
      this.counter++
    },
    showError: function (error) {
      this.$buefy.toast.open({
        duration: 3000,
        message: error.message,
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
  }
}
</script>

<style lang="scss">
.questions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__progress {
    width: 300px;
    margin-top: 30px;
  }
}
</style>
