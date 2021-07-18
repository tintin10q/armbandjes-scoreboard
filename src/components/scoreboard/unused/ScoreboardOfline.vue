<template>
  <b-container>
<!--    {{bracelets}}-->
    <div v-if="errored">
      <span>An error occurred while loading the scoreboard 😞 pls try again later ...</span>
      <br><br>
      <span><b>Error message:</b><br>{{ errorMessage }}</span>
    </div>
    <div>
      <my-scoreboard :fields="fields" :data="bracelets"/>
      <b-table striped
               id="table-transition-example"
               :tbody-transition-props="transProps"
               sort-null-last
               label-sort-asc=""
               label-sort-clear=""
               label-sort-desc=""
               bordered
               :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               hover
               primary-key="name"
               :items="bracelets"
               :fields="fields"
               :busy="loading"/>
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
  name: "scoreboardOffline",
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
      errorMessage: "",
      sortBy: "",
      sortDesc: "",
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
  methods: {
    async get_bracelets() {
      const result = await this.$apollo.query({
        // Query
        query: `query getBracelets {
          queryBracelet(first: 100) {
            bracelet_id
            name
            eventsAggregate {
            pointsSum
          }
          group {
            name
          }
        }
    }`
      })

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
