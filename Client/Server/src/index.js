const http = require('http');
const data = require('./utils/data')
const getCharByid = require('./controllers/getChardByid')
const PORT = 3001;

http.createServer((req, res)=>{
    res.setHeader('access-Control-Allow-Origin','*');
    
    const { url } = req
    if(url.iincludes("rickandmorty/character")){
        // rickandmorty/character/2
        // [rickandmorty/character, 234]
        const id = url.split("/").at(-1);
        // const id = urlParts[urlParts.length-1];
        // const character = data.find((character) => character.id === Number(id));
        // if(!character){
        //     res.writeHead(400,{'Content-Type': 'text/plain'});
        //     return res.end("Route no found")
        // }
        // res.writeHead(200,{'Content-Type': 'application/json'});
        // return res.end(JSON.stringify(character));
        return getCharByid(res, id)
    }
}).listen(3001, 'LOCALHOST',() => {
    console.log(`Servidor escuchado en puerto ${PORT}`)
})