<template>
  <b-container>
    <div>
      <group-scoreboard  :groupname="name" :members="members"/>
    </div>
  </b-container>
</template>

<script>

import gql from "graphql-tag";
import GroupScoreboard from "@/components/scoreboard/unused/ScoreboardGroup";

export default {
  name: "groupScoreboards",
  components: {GroupScoreboard},
  async mounted() {
    try {
      this.groups = await this.get_groups();
      this.loading = false
    } catch (error) {
      this.errored = true
      this.loading = false;
      this.errorMessage = error
    }
  },
  data() {
    return {
     "groups": []
    }
  },
  methods: {
    async get_groups() {
      const result = await this.$apollo.query({
        // Query
        query: gql`query getGroups {
          queryGroup(first: 10) {
           name
           id
        }
    }`
      });

      await Promise.all(result.data.queryBracelet.map(async (bracelet) => {

        bracelet.points = bracelet?.eventsAggregate?.pointsSum;
        bracelet.group = bracelet.group?.name

        return bracelet
      }));
      return result.data.queryBracelet
    },

  },
  computed: {}
}
</script>

<style scoped>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
</style>
