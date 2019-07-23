<template>
<div>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 style="text-align: right;">
        <label style="cursor: move" id="moveWindow">
          <v-icon>remove_circle</v-icon>
        </label>
      </v-flex>
    </v-layout>
    <Note 
      v-for="(note, index) in getNotes" 
      :noteId="note.note_id" 
      :color="note.color" 
      :month="note.month" 
      :day="note.day" 
      :nday="note.nday" 
      :stars="note.importance" 
      :key="index"
    ></Note>
  </v-container>
  <v-btn 
    absolute 
    small 
    fab 
    bottom 
    right 
    color="success" 
    id="addNote" 
    @click="openModal"
  >
    <v-icon>add</v-icon>
  </v-btn>
  <NewNoteModal @note="setNote">
    <v-card ref="modal"></v-card>
  </NewNoteModal @note="addNote">
</div>
</template>

<script>
import Note from '@/components/Note.vue'
import NewNoteModal from '@/components/NewNoteModal.vue'
import {mapGetters, mapMutations} from "vuex"

export default {
  name: 'Home',
  created: function(){
    this.getNotesFromServer()
  },
  computed:{
    ...mapGetters(["getNotes"])
  },
  methods:{
    ...mapMutations(["getNotesFromServer", "setNote"]),
    openModal(){
      this.$refs.modal.$el.click()
    },
  },
  components:{
    Note,
    NewNoteModal
  }
}
</script>

<style>
  #addNote{
    margin-bottom: 35px;
  }
</style>
