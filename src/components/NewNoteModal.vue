<template>
  <v-dialog width="60vh" transition="dialog-transition" persistent v-model="openClose">
    <slot slot="activator"></slot>
    <v-card :color="color" class="white--text">
      <v-container>
        <v-layout row wrap>
          <v-flex>
            <DatePicker @date="dateValue" :color="color"></DatePicker>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex>
            <TimePicker @time="timeValue" :color="color"></TimePicker>
          </v-flex>
        </v-layout>
        <v-layout row wrap style="margin-bottom: 25px; margin-top: -20px">
          <v-flex xs2 v-for="(i, index) in 6" :key="index">
            <v-btn fab small :color="colorsArray[i-1]" @click="selectedColor(i-1)"></v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex>
            <v-text-field 
              id="subject" 
              box 
              prepend-icon="subject" 
              label="Subject" 
              color="white"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex>
            <v-textarea 
              id="description" 
              clearable 
              auto-grow 
              box 
              prepend-icon="info" 
              color="white" 
              label="Description"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <Stars @stars="starsNumber"></Stars>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          small 
          round 
          color="success" 
          @click="sendNoteInformation"
        >
          add note
        </v-btn>
        <v-btn 
          small 
          round 
          color="error" 
          @click="openClose=false"
        >
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DatePicker from './DatePicker.vue'
import TimePicker from './TimePicker.vue'
import Stars from './Stars.vue' 

export default {
  name:"NewNoteModal",
  data() {
    return{
      color: "#2980b9",
      colorsArray:["#00BD4B", "#FF234B", "#8e44ad", "#d2d2d2", "#2980b9", "#FF8900"],
      openClose: false,
      date: null,
      time: null,
      stars: 1,
    }
  },
  methods:{
    selectedColor(index){
      this.color = this.colorsArray[index]
    },
    sendNoteInformation(event){//Envia toda la informacion del formulario devuelta al padre, Home view

      var subject = document.getElementById("subject").value
      var description = document.getElementById("description").value

      this.$emit("note", {
        color: this.color,
        date: this.date,
        hour: this.time,
        subject: subject,
        description: description,
        importance: this.stars,
        user: "njmercado",
      })

      this.openClose = false;
    },
    timeValue(value){
      this.time = value
    },
    dateValue(value){
      this.date = value
    },
    starsNumber(value){
      this.stars = value
    }
  },
  components: {
    DatePicker,
    TimePicker,
    Stars
  },
}
</script>

<style>

</style>
