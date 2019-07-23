<template>
  <v-dialog ref="dialog" width="290px" transition="scale-transition" lazy v-model="openClose">
    <template v-slot:activator="{ on }">
      <v-text-field style="font-size: 12px;" color="white" box v-model="time" label="Time" readonly v-on="on" prepend-icon="access_time"></v-text-field>
    </template> 
    <v-time-picker v-model="time" format="24hr" :color="color" @input="sendData"></v-time-picker>
  </v-dialog>
</template>

<script>
  
  export default {

    name: "TimePicker",
    data(){
      return{
        time: null, 
        openClose: false,
      }
    },
    props:[
      'color'
    ],
    methods:{
      sendData(event){
        console.log(this.time)
        this.$emit("time", this.time)
        this.openClose = false
      }
    },
    components:{

    }  
  } 
</script>

<style scoped>

</style>

