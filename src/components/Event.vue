<template>
<div class="d-inline align-items-center justify-content-between align-content-start">
  <div class="p-2 m-2 event align-items-center justify-content-center">
    <span v-if="points>1">+</span><animated-number :number="points"/>
  </div>
  <div >
  <p class="d-inline-flex maxh align-content-start flex-grow-1 justify-content-start">{{description}}</p>
  </div>
  </div>
</template>

<script>
import AnimatedNumber from "@/components/AnimatedNumber";
export default {
  components: {AnimatedNumber},
  name: "Event",
  props: ["points", "description"]
}
</script>

<style scoped>
 .event {
   font-size: 2rem;
   border-radius: 13%;
   outline: black solid 3px;
 }
 .maxh {
   max-height: 4ch;
 }
</style>
