import axios from "axios"
const serverName = "http://localhost:3000"

class ServerCalls{

  static async getNotes(){

    const result = await axios.get(`${serverName}/note`, {
      params: {
        user: "njmercado",
      }
    })

    console.log("Notes: ", result.data)

    return result.data
  }

  static addNote(data){
    return new Promise( async (resolve, reject) => {

      const result = await axios.post(`${serverName}/note`, {
        params: {
          data: data
        }
      }) 

      if(result == "La nota, que desea crear, ya se encuentra registrada."){
        reject(result)
      }else{
        resolve(result.data.result)
      }
    })
  }

  static async getNoteInformation(data){

    return new Promise((resolve, reject) => {
      try {
        resolve(axios.post(`${serverName}/search`, {
            params:{
              data: data
            }
          }) 
        )
      } catch (e) {
        reject(e)
      }
    })
  }

  static deleteNote(data){
    return new Promise((resolve, reject) =>{
      try{
        resolve(axios.delete(`${serverName}/note`, {
            params: {
              data:data
            }
          })
        )
      }catch(e){
        reject(e)
      }
    })
  }
}

export default ServerCalls
