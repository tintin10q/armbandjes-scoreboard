<template>
  <div class="clickable">
    <div class="tr" @click="show = !show; this.$emit('clicked',this.bracelet_id)">
      <div class="td">{{ name }}</div>
      <div class="td">
        <animated-number :number="points"/>
      </div>
      <div class="td">{{ group }}</div>
    </div>
    <div v-if="show" class="d-flex justify-content-around flex-column" @click="show = !show; this.$emit('clicked',this.bracelet_id)" >
      <graph-line
          :width="600"
          :height="400"
          :shape="'normal'"
          :axis-min="0"
          :axis-max="Math.max(pointsMax, points)"
          :axis-full-mode="true"
          :labels="graph_labels"
          :names="graph_names"
          :values="graph_values">
        <note :text="'Line Chart ' + name + ' Gemiddeld: ' + pointsAvg"/>
        <tooltip :names="graph_names" :position="'right'"></tooltip>
        <legends :names="graph_names"></legends>
        <guideline :tooltip-y="true"></guideline>
      </graph-line>
      <div class="d-flex align-items-start justify-content-start events m-2">
        <event v-for="event in eventsSorted" :key="event.id" :description="event.description" :points="event.points"/>
      </div>

    </div>
  </div>
</template>

<script>
import AnimatedNumber from "@/components/AnimatedNumber";
import Event from "@/components/Event";
import gql from "graphql-tag";
export default {
  name: "BraceletRow",
  async mounted() {
    await this.subscribe_to_bracelets()
    },
  // eslint-disable-next-line vue/no-unused-components
  components: {Event, AnimatedNumber},
  data() {
    return {
      show: false,
      bracelet: {}
    }

    // labels: [ new Date("2021-07-15 00:00:00"), new Date("2021-07-24 00:00:00") ]

  },

  computed: {

    graph_labels() {
      // eslint-disable-next-line no-unused-vars
      const labels = this.events.map(event => {
        const date = new Date(event.created_at);
        return "" + date.getDay() + ":" + date.getHours()
      })
      return labels
    },
    graph_names() {

      return ["Punten", "Totaal"]
    },

    graph_values() {
      // const sums = []
      const point = []
      const sums = []
      let sum = 0
      this.events.forEach((event) => {
        point.push(event.points)
        sum += event.points
        sums.push(sum)
      })

      return [point, sums]
    },
    points() {
      return this.bracelet?.eventsAggregate?.pointsSum ? this.bracelet?.eventsAggregate?.pointsSum : 0
    },
    name() {
      return this?.bracelet?.name
    },
    group() {
      return this?.bracelet?.group?.name
    },
    events() {
      return this?.bracelet?.events
    },
    eventsSorted(){
      const events = [...this.events]
      return events.sort(((a, b) => (a?.created_at < b?.created_at) ? 1 : -1))
    },
    pointsAvg() {
      return this?.bracelet?.eventsAggregate?.pointsAvg
    },
    pointsMax() {
      return this?.bracelet?.eventsAggregate?.pointsMax
    },
    pointsMin() {
      return this?.bracelet?.eventsAggregate?.pointsMin
    },
  },

  props: {
    bracelet_id: {
      type: String
    },
    bold: {
      type: Boolean,
      default: false
    }
  },
    methods: {
      async subscribe_to_bracelets() {
        this.$apollo.addSmartSubscription('newGroupData', {
          query: gql`subscription BraceletUpdate($id: ID) {
  getBracelet(id: $id) {
    name
    id
    group {
      name
      id
    }
    events {
      created_at
      description
      id
      points
    }
    eventsAggregate {
      count
      pointsAvg
      pointsMax
      pointsMin
      pointsSum
    }
    bracelet_id
  }
}`, // We can handle 100 message fetch no problem...
          // Parameters
          variables: () => {
            return {id: this.bracelet_id}
          },
          result(result) {
            const new_message = result.data;
            console.log(new_message)
            this.bracelet = new_message.getBracelet
            console.log("22", this.bracelet)
            return this.bracelet
          }
        })
      }
    }
  }

</script>

<style scoped>
.clickable {
  cursor: grab;
}

.clickable:hover {
  background-color: bisque;
}

.outline {
  border-bottom: aquamarine;
}

.events {
  overflow-x: scroll;
  max-height: 300px;
  overflow-scrolling: touch;
}

.table {
  display: flex;
  flex-flow: column nowrap;
  font-size: .8rem;
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

/*.tr:nth-of-type(even) {*/
/*  background-color: #f2f2f2;*/
/*}*/

/*.tr:nth-of-type(odd) {*/
/*  background-color: #ffffff;*/
/*}*/

.td {
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  flex-basis: 0;
  justify-content: center;
  padding: 0.5em;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0px;
  white-space: nowrap;
  border-bottom: 1px solid #d0d0d0;
}
</style>
