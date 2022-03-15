<template>
  <button class="answer-card" :class="{ 'answer-card--selected': selected }" @click="$emit('answerClick', answer)">
    {{ answer.title }}
  </button>
</template>

<script>
export default {
  name: 'AnswerCard',
  props: {
    answer: Object,
    selected: Boolean
  }
}
</script>

<style scoped lang="scss">
.answer-card {
  padding: 20px 50px;
  border-style: solid;
  border-width: 0 0 4px 0;
  border-radius: 12px;
  background-color: hotpink;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: pink;
  }

  &:active {
    border-bottom: 0px;
    outline: none;
    transform: translateY(2px);
  }

  &--selected {
    background-color: purple;
  }
}
</style>
