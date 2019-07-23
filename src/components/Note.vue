<template> 
<v-layout style="margin-top:20px">
   <v-flex xs12>
      <v-card 
        class="white--text" 
        :color="color" 
        @click="openModal"
      > 
         <v-layout row wrap>
            <v-flex xs5>
               <div class="hcenter">
                  <div>
                     <label>{{day}}</label>
                  </div>
                  <div>
                     <label class="day">{{nday}}</label>
                  </div>
                  <div>
                     <label>{{month}}</label>
                  </div>
               </div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs7>
               <div class="hcenter">
                  <div class="vcenter">
                     <label v-for="(i, index) in stars" :key="index">
                        <v-icon>star</v-icon>
                     </label>
                  </div>
               </div>
            </v-flex>
         </v-layout>
      </v-card>
   </v-flex>
    <InformationNoteModal 
      @delete="deleteNote(noteId)" 
      :time="getNoteInformation.time" 
      :color="color" 
      :description="getNoteInformation.description" 
      :subject="getNoteInformation.subject"
    >
      <v-card ref="modal"></v-card>
    </InformationNoteModal>
</v-layout>
</template>

<script>
import InformationNoteModal from './InformationNoteModal.vue'
import {mapGetters, mapMutations} from "vuex"

export default {
  name: "Note",
  props:[
    'day',
    'color',
    'month',
    'nday',
    'stars',
    'noteId',
  ],
  methods:{
    ...mapMutations(["setNoteInformation", "deleteNote"]),
    openModal() {
      this.setNoteInformation(this.noteId)
      
      this.$refs.modal.$el.click()
    }
  },
  computed:{
    ...mapGetters(["getNoteInformation"]) 
  },
  components:{
    InformationNoteModal
  }
}
</script>

<style>
.hcenter{
   text-align: center; 
}

.vcenter{
   top: 50%;
   left: 60%;
   position: absolute;
   -ms-transform: translateY(-50%);
   transform: translateY(-50%);
}

.day {
   font-size: 25px;
}
</style>
