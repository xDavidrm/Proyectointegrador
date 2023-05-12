import { Link } from 'react-router-dom';
import SearchBar from '../Searchbar/SearchBar';



const Nav = ({onSearch}) => {

   
 return(
    <div>
    <Link to='/home'>
        <button>HOME</button>
    </Link>
    
    
    <Link to='/about'>
        <button>ABOUT</button>
    </Link>
    
    <SearchBar onSearch={onSearch} />
       
      
    </div>  
       
      
    )
}


export default Nav 