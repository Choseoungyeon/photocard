import React,{useState} from 'react'
import { FaUserCircle, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import CommentWrite from './CommentWrite';

function CommentSingle(props) {
    
    const [OpenReply, setOpenReply] = useState(false)

    const replyHandler =()=>{
        setOpenReply(!OpenReply)
    }

    console.log(props.commentInfo)

  return (
      <div className='commentSingle_container'>
          <FaUserCircle style={{ width: "31px", height: "auto", float: "left", color: "#383838", marginRight: "20px", marginTop: "5px" }} />
          <div className='commentSingle_top'>
              <span>chocho1</span>
              <p>정말 귀엽습니다! 다운로드 해가겠습니다^^</p>
          </div>
          <div className='commentSingle_bottom'>
              <div className='commentSingle_like' style={{ cursor: "pointer" }}>
                  <FaThumbsUp style={{ cursor: "pointer", width: "14px" }} />
                  <span>02</span>
              </div>
              <div className='commentSingle_like' style={{ cursor: "pointer" }}>
                  <FaThumbsDown style={{ cursor: "pointer", width: "14px" }} />
                  <span>02</span>
              </div>
              <p style={{ cursor: "pointer" }} onClick={replyHandler}>reply to</p>
          </div>
          {OpenReply&&<CommentWrite/>}
      </div>
  )
}

export default CommentSingle