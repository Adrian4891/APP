import { useState } from "react";
import style from "./searchBar.module.css";

const SearchBar = ({handleSearch}) => {
    const [ name, setName ] = useState("");
    const handleInput = (event) => {
       setName(event.target.value);
       handleSearch(name);
    }
    return(
        <div className={style.searchBar}>
            <input 
                type="search"
                onChange={handleInput} 
                placeholder="Busca tu intrumento" 
                value={name}
                className={style.inputSearch}
                name="name"
            />
            <button onClick={()=>setName("")}>Buscar</button>
        </div>
    );
}

export default SearchBar;