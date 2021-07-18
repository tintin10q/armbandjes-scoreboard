<template>
<div class="d-flex flex-column">
  <div class="p-2 m-2 event align-items-center justify-content-center">
    <span v-if="points>1">+</span><animated-number :number="points"/>
  </div>
  <div>
    <p class="m-2 ">{{description}}</p>
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
   max-height: 8ch;
   min-width: 10ch;
 }
</style>
