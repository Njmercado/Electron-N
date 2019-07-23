import Vue from 'vue'
import Vuex from 'vuex'
import ServerCalls from './ServerCalls.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes:[],
    noteInformation: {
      _id: "cosa"
    },
  },
  mutations: {
    deleteNote(state, note_id){ //Elimino la nota del servidor, base de datos

      ServerCalls.deleteNote({
        note_id: note_id, 
        user_id: "njmercado"
      }).then(result => {

        searchNote(note_id, state.notes).then(index => {
          console.log("index: ", index)
          state.notes.splice(index, 1) //Elimino la nota del cliente
        }).catch(e => { console.log(e) })

        console.log("result: ", result)

      }).catch(e => console.log(e))
    },
    getNotesFromServer(state){

      ServerCalls.getNotes().then(notes =>{

        state.notes = [] 
        notes.forEach(element => {
          
          const date = splitDate(element.date)
        
          var data = {}
          data["month"] = date[1]
          data["day"] = date[0]
          data["nday"] = date[2]
          data["note_id"] = element._id 
          data["color"] = element.color
          data["importance"] = element.importance

          console.log("Nota*: ", state.notes)
          
          state.notes.push(data)
        })
      })
    },
    setNote(state, data){

      ServerCalls.addNote(data).then(note => {

        const date = splitDate(data.date)
        
        data["month"] = date[1]
        data["day"] = date[0]
        data["nday"] = date[2]
        data["note_id"] = note 

        state.notes.push(data)
      }).catch(e => {
        console.log(e)
      })
    },
    setNoteInformation(state, note_id){

      if(note_id != state.noteInformation["_id"]){
        
        var data = {}
        data["note_id"] = note_id
        data["user"] = "njmercado"
        
        ServerCalls.getNoteInformation(data).then(information => {

          state.noteInformation = {}

          state.noteInformation["description"] = information.data[0].description
          state.noteInformation["subject"] = information.data[0].subject
          state.noteInformation["time"] = information.data[0].hour
          state.noteInformation["_id"] = note_id //Se agrega para verificar despues si la misma nota ha sido presionada de nuevo. Esto es para evitar hacer llamados innecesarios.
        }).catch(e => console.log(e))
      }
    }
  },
  getters: {
    getNotes: state => state.notes,
    getNoteInformation: state => state.noteInformation,
  }
})

const splitDate = (data) => {

  data += " 00:00"

  var date = new Date(data)
  date = date.toDateString().split(" ")
  
  date[2] = parseInt(date[2])

  return date
}

const searchNote = (id, notes) => {

  return new Promise((resolve, reject) => {

    try{

      notes.forEach((element, index) => { //TODO: Mejorar la busqueda para cuando se agreguen mas notas.
        if(element.note_id == id){
          resolve(index)
        }
      })
      
    }catch(e){
      reject(e)
    }
  })
}
