const axios = require('axios')

const URL = 'https://rickandmortyapi.com/api/character/'

const getCharByid = (res, id) => {

   axios.get(URL+id).then((response)=>{
      const {data} = response
        
      const character = {
         id: data.id,
         name: data.name,
         gender: data.gender,
         species: data.species,
         origin: data.origin,
         imagen: data.imagen,
         status: data.status
        }
       
      //   console.log(character)
        res.writeHead(200, {"Content-Type": "aplication/json"})
       return res.end(JSON.stringify(character))
   
      }).catch((error)=>{
      console.log(error.message)
      res.writeHead(500,{"Content-Type": "text/plain"})
      return res.end(error.message)
      // console.log(error.response.data.error)
    
   })

}

 
module.exports = getCharByid