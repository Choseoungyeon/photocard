import React,{useState} from 'react'

import CommentSingle from './CommentSingle'
import CommentWrite from './CommentWrite'

function Comment(props) {
    
  return (
      <div className='comment_wrap'>
          <h3>Comment</h3>
          <hr style={{opacity:"0.3"}}/>
          <CommentSingle commentInfo={props.commentInfo} />
          <CommentWrite />
      </div>
    
  )
}

export default Comment