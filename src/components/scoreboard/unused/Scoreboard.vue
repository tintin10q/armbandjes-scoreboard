<template>
  <b-container>
    <div v-if="errored">
      <span>An error occurred while loading the scoreboard 😞 pls try again later ...</span>
      <br><br>
      <span><b>Error message:</b><br>{{ errorMessage }}</span>
    </div>
    <div>
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
               :items="[bracelets]"
               :fields="fields"
               :busy="loading"/>
    </div>
  </b-container>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import gql from "graphql-tag";

export default {
  name: "scoreboard",
  async mounted() {
    try {
      this.bracelets = await this.get_bracelets();
      console.log(this.bracelets);
      this.loading = false
    } catch (error) {
      this.errored = true
      this.loading = false;
      this.errorMessage = error
    }
  },
  data() {
    return {
      bracelets: {},
      errored: false,
      loading: true,
      errorMessage: "",
      sortBy: "",
      sortDesc: "",
      transProps: {
        // Transition name
        name: 'flip-list'
      }
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

      console.log(result)
      // await Promise.all(result.data.queryBracelet.map(async (bracelet) => {
      //
      //   bracelet.points = bracelet?.eventsAggregate?.pointsSum;
      //   bracelet.group = bracelet.group?.name
      //
      //   return bracelet
      // }));
      // return result.data.queryBracelet
      // },
      return {}
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
