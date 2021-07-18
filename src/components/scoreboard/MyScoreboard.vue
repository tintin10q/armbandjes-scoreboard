<template>
  <!--  <table>-->
  <div class="table">
    <div class="tr th">
      <div v-for="label in labels" :key="label" class="td">{{label}}</div>
    </div>
    <bracelet-row @click="expand = !expand" expand v-for="bracelet in bracelets_sorted" :key="bracelet.id" :bracelet_id="bracelet.id"></bracelet-row>
  </div>
  <!--  </table>-->
</template>

<script>
import BraceletRow from "@/components/scoreboard/BraceletRow";

export default {
  name: "MyScoreboard",
  components: {BraceletRow},
  mounted() {
    this.loading = false;
  },
  data() {
    return {
      expand:false,
      loading: true,
      sorted_bracelets: []
    }
    },
  computed: {
    bracelets_sorted() {
      // let bracelets = [...this.bracelets]
      // bracelets.sort((a, b) => (a?.points < b?.points) ? 1 : -1)
      return this.bracelets
    }
  },
  props: {
    bracelets: {
      type: Array
    },
    labels: {
      type: Array
    }
  }

}
</script>

<style scoped>
.table {
  display: flex;
  flex-flow: column nowrap;
  font-size: 1rem;
  margin: 0.5rem;
  line-height: 1.5;
  border-bottom: 1px solid #d0d0d0;
  flex: 1 1 auto;
}

.th {
  display: none;
  font-weight: 700;
  background-color: #f2f2f2;
}

.th > .td {
  white-space: normal;
  justify-content: center;
}

.tr {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
}

.tr:nth-of-type(even) {
  background-color: #f2f2f2;
}

.tr:nth-of-type(odd) {
  background-color: #ffffff;
}

.td {
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0.5em;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0px;
  white-space: nowrap;
  border-bottom: 1px solid #d0d0d0;
}
</style>
