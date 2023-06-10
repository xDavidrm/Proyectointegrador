import styles from './card.module.css';
import { Link } from 'react-router-dom';

export default function Card(props) {
   const {name, id, status, species, gender, origin, image, onClose} = props; 
   
   return (
      <div className={styles.div}>
         <button className={styles.btn} onClick={() => {onClose(id)}}>X</button>
         <img src={image} alt='' />
         
         <h2 className={styles.name} >{name}</h2>
         <Link to={`/detail/${id}`} >
         <h3 className="card-name">{name}</h3>
         </Link>
         <div >
         <h2>{status}</h2>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <h2>{origin.name}</h2>
         </div>
      </div>
   );
}
