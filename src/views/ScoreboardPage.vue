<template>
  <b-container class="d-flex flex-column">
    <b-button v-if="this.groups.length > 1" @click="pergroup = !pergroup" name="check-button" class="mb-2">
      {{button_text}}
    </b-button>

<!--        <scoreboard v-show="!group"/>-->
    <div v-if="pergroup" class="d-flex flex-column">
      <div v-for="groupie in groups" :key="groupie.id">
        <div v-if="groupie.bracelets.length > 0" class="d-flex flex-column">
          <h3>{{groupie.name}} </h3>
         <my-scoreboard  :labels="labels" :bracelets="groupie.bracelets"/>
        </div>
      </div>

    </div>
  <my-scoreboard v-else :labels="labels" :bracelets="bracelets"/>
  </b-container>
</template>

<script>

import Scoreboard from "@/components/scoreboard/unused/Scoreboard";
import GroupScoreboard from "@/components/scoreboard/unused/ScoreboardGroup";
import gql from "graphql-tag";
import ScoreboardMyOffline from "@/components/scoreboard/unused/ScoreboardMyOfline";
import MyScoreboard from "@/components/scoreboard/MyScoreboard";
// import ScoreboardOffline from "@/components/scoreboard/ScoreboardOfline";

export default {
  name: "ScoreboardPage",
  // eslint-disable-next-line vue/no-unused-components
  components: {MyScoreboard, ScoreboardMyOffline,  GroupScoreboard, Scoreboard},
  async mounted() {
    await this.subscribe_to_messages()
  },
  computed:{
    button_text() {
      if (this.pergroup) {
       return "Laat iedereen zien";
      } else {return "Laat zien per groepje"}
    },
    labels() {
      return this.fields.map(field => field.label)
    },
  },
  data() {
    return {
      pergroup: false,
      groups: {},
      bracelets: [],
      fields: [
        {
          key: 'name',
          label: 'Naam:',
          sortable: true
        },
        {
          key: 'points',
          label: 'Punten:',
          sortable: false
        },
        {
          key: 'group',
          label: 'Groep:',
          sortable: false
        }
      ],
    }
  },
  methods: {
    current_date() {
      return new Date().toISOString()
    },
    async subscribe_to_messages() {
      this.$apollo.addSmartSubscription('newGroupData', {
        query: gql`subscription GroupUpdated {
              queryGroup {
              name
                bracelets {
                id
             eventsAggregate {
                pointsSum
            }
          }
          braceletsAggregate {
            count
          }
        }
      }
`, // We can handle 100 message fetch no problem...
        // Parameters
        variables: () => {
          return {}
        },
        result(result) {
          const new_message = result.data;
          this.groups = new_message.queryGroup
          this.bracelets = []
          this.groups.forEach(group => {
            group?.bracelets.forEach(bracelet => {
              bracelet.points = bracelet?.eventsAggregate?.pointsSum
              if (!bracelet.points) {
                bracelet.points = 0
              }
              this.bracelets.push(bracelet)
            })
          })
          console.log("new gropus:",new_message)
          // this.bracelets.sort((a, b) => (a.points < b.points) ? 1 : -1)
          return this.groups
          // if (new_message && new_message.createdBy.id !== this.logged_in_user.id) {
          //   this.messages.push(new_message);
          //   this.$nextTick(this.scroll_down);
          // return; // if your not sender of message just add it
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
