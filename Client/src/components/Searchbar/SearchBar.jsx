import { useState } from 'react';
import styles from './searchbar.module.css'



export default function SearchBar({onSearch}) {
   const [id, setId] = useState('')

   const handlechange = (e) => {
      setId(e.target.value)
   }
  
   return (
      <div className={styles.searchbar}>
         <input  className={styles.input}type='search' onChange={handlechange} value={id}/>
         <button  className={styles.btn} onClick={() => {onSearch(id)}}>Agregar🔍</button>
      </div>
 
  );
}
