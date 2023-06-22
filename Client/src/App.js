/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from 'react';
import './App.css';
import Cards from './components/cards/Cards';
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import axios from 'axios'
import {Routes, Route} from "react-router-dom"
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Favorites from './components/Favorites/Favorites'
import { useDispatch } from 'react-redux';
import { clearFav } from './redux/actions';

function App() {
   
   const [characters, setCharacters] = useState([]) //local state characters
   //Login
   const [access, setAccess] = useState(false)
   // const EMAIL = 'myEmail@mail.com'   //mock off user
   // const PASSWORD = 'asdFgtrew1'      //mock off password

   const navigate = useNavigate()
   const dispatch = useDispatch()
   
   // const login = (userData)=> {  //the funcion redirec to home if acces condition is true
   //    if (userData.password === PASSWORD && userData.email === EMAIL) {
   //       setAccess(true);
   //       navigate('/home');
   //    }
   // }
   async function login (userData) {
      try{
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const {data} = await axios(URL + `?email=${email}&password=${password}`)
         const {access} = data
         setAccess(data);
         access ? navigate('/home'):window.alert("Login invalido");
      }
      catch({response}){
         console.log(`${response.status} ${response.statusText}`);  
         // window.alert(`${response.status} ${response.statusText}`)
      }
   }
   const logOut = ()=> {  //clear the acces condition and global states when the user log out
      setAccess(false)
      setCharacters([])
      dispatch(clearFav())
      navigate('/')
   }

   useEffect(() => { //in the actualizacion off estate access, redirect to '/' when the "access" is false
      !access && navigate('/');
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [access])

   useEffect(()=>{ 
      access&&rndCharacter()
   },[access])
   
   // whit promises
   // const onSearch = (id)=> { //make a api request whit an "id" and set "data" in local state
   //    id &&
   //    axios(`http://localhost:3001/rickandmorty/character/${id}`)
   //    .then(({ data }) => {
   //       if (data.name) {
   //          setCharacters((oldChars) => [...oldChars, data]);
   //       } 
   //       // else {
   //       //    window.alert('¡No hay personajes con este ID!');
   //       // }
   //    })
   //    .catch(({response})=>{
   //       console.log(response);
   //       window.alert(response.data)
   //       }
   //    );
   // }

   //whit async await
   const onSearch = async (id)=> { //make a api request whit an "id" and set "data" in local state
      try{
         let found = characters.find((character)=>character.id === Number(id))
         if(!found){
            const {data}= await axios(`http://localhost:3001/rickandmorty/character/${id}`)
            setCharacters((oldChars) => [...oldChars, data]);
         }else{
            window.alert("El personaje y fue agregado")
         }
      }
      catch({response}){
            window.alert(`${response.status} ${response.statusText}`)
      }
   }

   
   const onClose = (id)=>{ //filter the "characters" to remove the card closed
      const filtered = characters.filter((character)=>character.id !== Number(id))
         setCharacters(filtered)
      }
      
   const rndCharacter = async ()=>{
      try{
         const {data}= await axios(`https://rickandmortyapi.com/api/character`)
         await onSearch(Math.floor(Math.random() * (Number(data.info.count)-1))+1)
      }
      catch({response}){
            window.alert(`${response.status} ${response.statusText}`)
      }
   }
        
   // render the elements accordin the defined paths and any other path is redirect to /404
   return (
      <div on className='App'>
         <Nav onSearch={onSearch} logOut={logOut}/>
         <Routes>
            <Route path='/' element={<Form login={login}/>}/>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
            <Route path='/about'element={<About/>}/>
            <Route path='/favorites' element={<Favorites onClose={onClose}/>}/>
            <Route path='/detail/:id' element={<Detail/>} />
            <Route path='*' element={<Navigate to='/404'/>}/> 
            <Route path='/404' element={<Error/>}/>
         </Routes>
      </div>
   );
}

export default App;
