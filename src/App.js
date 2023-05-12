import { useState} from 'react';
import './App.css';
import axios from 'axios';
// componenets
import Cards from './components/cards/Cards';
import Nav from './components/Nav/Nav';
import About from './components/About/About'
import Form from './components/Form/Form'
// router-Dom
import {Routes, Route, useLocation} from 'react-router-dom';
import Detail from './components/Detail/Detail';

function App() {

   const [characters, setCharacters] = useState ([]);
   const {pathname}= useLocation()
 
   const onSearch = (id) => {
   axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
      if (data.name) {
         setCharacters((oldChars) => [...oldChars, data]);
      } else {
         window.alert('¡No hay personajes con este ID!');
      }
   });
}

const onClose = (id) => {
   setCharacters(characters.filter((char) => char.id !== Number(id)))

}

 
  return (
      <div className='App'>
       
       {
         pathname !== '/' && <Nav onSearch={onSearch}/>
       }
        
        <Routes>

        
        <Route path='/' element={<Form/>}/>
        <Route path='/detail/:id' element={<Detail/>}></Route>
        <Route path='/Home' element={<Cards characters={characters} onClose={onClose}/>}/>
        <Route path='/about' element={<About/>}/>
         
         
        
        
        </Routes>
      </div>
   );
}

export default App;
