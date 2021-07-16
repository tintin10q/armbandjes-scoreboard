<template>
  <b-container>
    <div >
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
               stacked=""
               primary-key="name"
               :items="bracelets"
               :fields="fields"
               :busy="loading"></b-table>
    </div>
  </b-container>
</template>

<script>

import gql from "graphql-tag";

export default {
  name: "groupScoreboard",
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
  props: {
    loading: {
      type: Boolean
    },
    groupname: {
      type: String,
      required: true
  } ,
    members: {
      type: Array
      /* [{name:"name", poins:"points} ...]
      */
    }
  },
  data() {
    return {
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
        query: gql`query getBracelets {
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
