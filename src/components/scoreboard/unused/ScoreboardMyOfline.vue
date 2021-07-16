<template>
  <b-container>
<!--    {{bracelets}}-->
    <div v-if="errored">
      <span>An error occurred while loading the scoreboard 😞 pls try again later ...</span>
      <br><br>
      <span><b>Error message:</b><br>{{ errorMessage }}</span>
    </div>
    <div>
      <my-scoreboard :labels='["Naam", "Punten", "Groep"]' :data="bracelets"/>
    </div>
  </b-container>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import gql from "graphql-tag";
import AnmiatedNumber from "@/components/AnimatedNumber";
import Row from "@/components/scoreboard/BraceletRow";
import BraceletRow from "@/components/scoreboard/BraceletRow";
import MyScoreboard from "@/components/scoreboard/MyScoreboard";

export default {
  name: "scoreboardMyOffline",
  // eslint-disable-next-line vue/no-unused-components
  components: {MyScoreboard, BraceletRow, Row, AnmiatedNumber},
  props: ["bracelets"],
  async mounted() {
    this.loading = false
  },
  data() {
    return {
      errored: false,
      loading: true,
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      fields: [
        {
          key: 'name',
          label: 'Naam',
          sortable: true
        },
        {
          key: 'points',
          label: 'Punten',
          sortable: false
        },
        {
          key: 'group',
          label: 'Groep',
          sortable: false
        }
      ],
    }
  },
}
</script>

<style scoped>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
</style>
