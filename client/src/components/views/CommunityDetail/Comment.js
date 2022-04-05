import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';

import CommentSingle from './CommentSingle'
import CommentWrite from './CommentWrite'

function Comment() {
  const commentArray = useSelector(state=>state.comment)
  const [Comment, setComment] = useState([])

  useEffect(() => {
    setComment(commentArray.comment)

    return()=>{
      setComment([])
    }
  }, [commentArray])

    
  return (
      <div className='comment_wrap'>
          <h3>Comment</h3>
          {Comment === undefined ? null : Comment.length === 0 ? null : <hr style={{opacity:"0.3", marginTop:"20px"}}/>}
          {Comment ? Comment.map((e,index)=>(
            !e.responseTo &&
            <CommentSingle commentInfo={e} key={index}/>
          ))  :null }
          
          <CommentWrite />
      </div>
    
  )
}

export default Comment