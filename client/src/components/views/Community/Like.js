import React,{useState} from 'react'
import { FaThumbsUp } from "react-icons/fa";

function Like() {
    const [Like, setLike] = useState(0)

  return (
    <td className='community_like'>
            <FaThumbsUp className="community_like_icon" style={{cursor:"pointer"}}/> {String(Like).padStart(2, "0")}
    </td>
  )
}

export default Like