<template>
  <span>{{ displayNumber }}</span>
</template>

<script>
export default {
  mounted() {
    this.update_number()
  },
  name: "AnimatedNumber",
  props: {
    "number": {
      default: 0.0,
      type: Number
    }
  },
  data() {
    return {
      displayNumber: 0
    }
  },
  methods: {
    ready() {
      this.number = Number(this.number)
      this.displayNumber = this.number ? this.number : 0;
    },
    update_number() {
      // console.log("updating number", this.displayNumber, this.number)
      if (this.number == this.displayNumber) {
        return;
      }
      if (this.displayNumber < this.number) {
        this.displayNumber += 1;
      }
      else {this.displayNumber -= 1}
        requestAnimationFrame(this.update_number)
      }
  }
  ,
  watch: {
    number() {
      this.update_number()
    }
  }
}
</script>

<style scoped>
/*@property --num {*/
/*  syntax: '<integer>';*/
/*  initial-value: 0;*/
/*  inherits: false;*/
/*}*/

/*span {*/
/*  transition: --num 1s;*/
/*  counter-reset: num var(--num);*/
/*}*/

/*span:hover {*/
/*  --num: 10000;*/
/*}*/

/*div::after {*/
/*  content: counter(num);*/
/*}*/
</style>
