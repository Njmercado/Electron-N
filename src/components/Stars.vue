<template>
<v-hover>
  <v-container style="margin-left: 4vw">
    <v-layout row wrap justify-center>
      <v-flex xs2 v-for="(i, index) in 5" :key="index">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon :id="'s'+i" @mouseover="stars = i" v-on="on">
              star
            </v-icon>
          </template>
          <span>{{phrases[i-1]}}</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</v-hover>
</template>

<script>
  
  export default {

    name: "Stars",
    data(){
      return{
        stars: 1,
        phrases: ["Nah", "Mmmm ya", "Bueno, hay trabajo por hacer", "Joder!! hay que hacer esto", "Hp!!!!!. Pero que mondaaaaaa?!!!!"]
      }
    },
    watch:{
      "stars": function(){//Funciona para ponerle colores a las estrellas cuando se pase el mouse sobre ellas.

        this.sendData(this)

        for (var l = 1; l <= this.stars; l++) {
          var a = "s"+l.toString()
          document.getElementById(a).style.color="yellow"
        }
        for (var l = this.stars+1; l <= 5; l++) {
          var a = "s"+l.toString()
          document.getElementById(a).style.color=""
        }
      }
    },
    methods:{
      sendData(event){
        this.$emit("stars", this.stars)
      }
    },
  } 
</script>

<style scoped>

#s5, #s1, #s2, #s3, #s4{
  transition: .5s;
}

#s1{
  color:yellow;
}
</style>

