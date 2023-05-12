import React, { useState, useEffect} from 'react'
import styles from './Detail.module.css';
import axios from 'axios'
import { useParams, } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Detail = () => {
 
 const {id} = useParams({})
 
  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
       if (data.name) {
          setCharacter(data);
       } else {
          window.alert('No hay personajes con ese ID');
       }
    });
    return setCharacter({});
 }, [id]);
 
 
 const [characters, setCharacter] = useState()
  return (
      <> 
    {characters?.name &&(

      <div className={styles.container}>
      <h1>Name:{characters.name}</h1>
      <h1>Status:{characters.status}</h1>
      <h1>Species:{characters.Species}</h1>
      <h1>Gender:{characters.gender}</h1>
      <h1>Origin:{characters.origin?.name}</h1>
      <img src={characters.image} alt="" />
    </div>
      )}
    <Link to={'/'}/>
    <div>VOLVER ATRAS</div>
      </>
    )
}

export default Detail