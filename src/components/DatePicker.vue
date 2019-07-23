<template>
  <v-dialog width="290px" transition="scale-transition" lazy v-model="openClose">
    <template v-slot:activator="{ on }">
      <v-text-field style="font-size: 12px;" box color="white" v-model="date" label="Date" readonly v-on="on" prepend-icon="event"></v-text-field>
    </template> 
    <v-date-picker v-model="date" @input="sendData" :color="color"></v-date-picker>
  </v-dialog>
</template>

<script>
  
  export default {

    name: "DatePicker",
    props:[
      "color",
    ],
    data(){
      return{
        date: new Date().toISOString().substr(0, 10), 
        openClose: false,
      }
    },
    methods:{
      sendData(event){
        this.$emit("date", this.date)
        this.openClose = false
      }
    },
    components:{

    }  
  } 
</script>

<style scoped>

</style>

