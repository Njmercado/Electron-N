<template>
   <v-dialog width="60vh" persistent v-model="openClose">
    <slot slot="activator"></slot>
    <v-card :color="color">
      <v-container>
        <v-layout 
          row 
          wrap 
          justify-center>
          <label 
            style="font-size: 5vh;
                   margin-bottom: 
                   15px; 
                   color:white">
            {{time}}
          </label>
        </v-layout>
        <v-layout row wrap>
          <v-text-field 
            label="Subject" 
            prepend-icon="subject" 
            color="white" 
            box 
            readonly 
            :value="subject"
          >
          </v-text-field>
        </v-layout>
        <v-layout row wrap>
          <v-textarea 
            box 
            readonly 
            :value="description" 
            color="white" 
            label="Description" 
            prepend-icon="info"
          >
          </v-textarea>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn 
              small 
              fab 
              color="grey darken-3" 
              @click="deleteNote" 
              v-on="on"
            >
              <v-icon color="white">delete</v-icon>
            </v-btn>
          </template>
          <span>Borrar nota</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn 
              small 
              fab 
              color="error" 
              @click="openClose=false" 
              v-on="on" 
              style="margin-left: 5vw"
            >
              <v-icon color="white">close</v-icon>
            </v-btn>
          </template>
          <span>Cerrar</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  
  export default {

    name: "InformationNoteModal",
    data(){
      return{
        openClose: false
      }
    },
    methods: {
      deleteNote(event){
        this.$emit("delete", true)
        this.openClose = false
      }
    },
    props:[
      "subject",
      "description",
      "color",
      "time"
    ],
  } 
</script>
