import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizzes: [],
    testInfo: {}, // quizId: String, user: String
    questions: [],
    answers: [],
    selectedAnswers: [],
    correctAnswers: {}
  },

  mutations: {
    setQuizzes(state, quizzes) {
      state.quizzes = quizzes
    },
    setTestInfo(state, testInfo) {
      state.testInfo = testInfo
    },
    setQuestions(state, questions) {
      state.questions = questions
    },
    setAnswers(state, answers) {
      state.answers = answers
    },
    setCorrectAnswers(state, correctAnswers) {
      state.correctAnswers = correctAnswers
    }
  },

  actions: {
    async fetchAllQuizzes({ commit }) {
      const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}?action=quizzes`)
      if (!response.ok) {
        throw new Error('We were unable to load the quizzes, please try again later')
      }
      const quizzes = await response.json()
      commit('setQuizzes', quizzes)
    },
    setTestInfo({ commit }, testInfo) {
      commit('setTestInfo', testInfo)
    },
    async fetchAllQuestions({ commit, state }) {
      const response = await fetch(
        `${process.env.VUE_APP_API_ENDPOINT}?action=questions&quizId=${state.testInfo.quizId}`
      )
      if (!response.ok) {
        throw new Error('We were unable to load the questions, please try again later')
      }
      const questions = await response.json()
      return commit('setQuestions', questions)
    },
    async fetchAnswersByQuestion({ commit, state }, questionId) {
      const response = await fetch(
        `${process.env.VUE_APP_API_ENDPOINT}?action=answers&quizId=${state.testInfo.quizId}&questionId=${questionId}`
      )
      if (!response.ok) {
        throw new Error('We were unable to load the answers, please try again later')
      }
      const answersByQuestion = await response.json()
      return commit('setAnswers', answersByQuestion)
    },
    async fetchCorrectAnswers({ commit, state }, answers) {
      let answersParams = ''
      answers.forEach((answer) => (answersParams += `&answers[]=${answer.id}`))
      const response = await fetch(
        `${process.env.VUE_APP_API_ENDPOINT}?action=submit&quizId=${state.testInfo.quizId}${answersParams}`
      )
      if (!response.ok) {
        throw new Error('We were unable to load your results, please try again later')
      }
      const correctAnswers = await response.json()
      return commit('setCorrectAnswers', correctAnswers)
    }
  },

  getters: {
    quizzes(state) {
      return state.quizzes
    },
    questions(state) {
      return state.questions
    },
    answers(state) {
      return state.answers
    },
    testInfo(state) {
      return state.testInfo
    },
    correctAnswers(state) {
      return state.correctAnswers
    }
  }
})
