<template>
  <section class="question content">
    <h2 class="question__title">{{ question.title }}</h2>
    <div class="question__cards">
      <answer-card
        class="question__answer-card"
        v-for="answer in answers"
        :key="answer.id"
        :answer="answer"
        :selected="answer === selectedAnswer"
        :style="itemStyle"
        @answerClick="onAnswerClick" />
    </div>
    <b-loading class="question__loader" v-model="isLoading" is-full-page />
  </section>
</template>

<script>
import AnswerCard from '../components/AnswerCard'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Question',
  components: { AnswerCard },
  props: {
    question: Object
  },
  computed: {
    ...mapGetters(['answers']),
    itemStyle: function () {
      return {
        flexBasis: `calc((100% - ${this.cardMargin * 2 * this.itemsPerRow}px) / ${this.itemsPerRow})`,
        margin: `${this.cardMargin}px`
      }
    },
    itemsPerRow() {
      return this.windowWidth > 920 ? 2 : 1
    }
  },
  data: function () {
    return {
      selectedAnswer: '',
      cardMargin: 10,
      isLoading: false,
      windowWidth: window.innerWidth
    }
  },
  created() {
    window.addEventListener('resize', this.changeWindowWidth)
  },
  destroyed() {
    window.removeEventListener('resize', this.changeWindowWidth)
  },
  methods: {
    ...mapActions(['fetchAnswersByQuestion']),
    onAnswerClick(event) {
      this.selectedAnswer = event
      this.$emit('answerSelected', event)
    },
    changeWindowWidth() {
      this.windowWidth = window.innerWidth
    }
  },
  watch: {
    question: {
      immediate: true,
      handler: async function () {
        this.isLoading = true
        try {
          await this.fetchAnswersByQuestion(this.question.id)
        } catch (error) {
          this.$emit('error', error)
        } finally {
          this.isLoading = false
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.question {
  display: flex;
  flex-direction: column;

  &__title {
    align-self: center;
  }

  &__cards {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
