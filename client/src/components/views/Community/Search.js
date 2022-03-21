import React,{useState} from 'react'
import { FaSearch } from "react-icons/fa";

function Search(props) {

    const [Selection, setSelection] = useState("user")

    const onChange = (event) => {
        let body = {
            skip: 0,
            limit: 7,
            selection:Selection,
            searchTerm: event.target.value
        }

        props.refreshFunction(body)
    }

    const onSelectHandler =(event)=>{
        setSelection(event.target.value)
    }
    
    return (
        <form className='community_form_search'>
            <div>
                <select className='community_form_selection' onChange={onSelectHandler}>
                    <option value="user">user</option>
                    <option value="title">title</option>
                    <option value="date">date</option>
                </select>
                <input type="text" placeholder="search" onChange={onChange} />
                <button><FaSearch style={{ width: 16, height: "auto" }} /></button>
            </div>
        </form>
    )
}

export default Search