import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { FaUserCircle, FaThumbsUp, FaThumbsDown, FaSortDown } from "react-icons/fa";
import CommentWrite from './CommentWrite';

function CommentSingle(props) {
    const commentArray = useSelector(state=>state.comment)
    const [OpenReply, setOpenReply] = useState(false)
    const [ReplyComment, setReplyComment] = useState(false)
    const [Refly, setRefly] = useState([])
    
    const replyHandler =()=>{
        setOpenReply(!OpenReply)
    }

    const replyCommentHandler =()=>{
        setReplyComment(!ReplyComment)
    }

    useEffect(() => {
          const Loot = commentArray.comment.filter(e=>
              e.responseTo === props.commentInfo._id
          )
          setRefly(Loot)
    
    }, [commentArray.comment])

  return (
      <div className='commentSingle_wrap'>
          {props.commentInfo ?
              <div className='commentSingle_container'>
                  <FaUserCircle className='commentSingle_userIcon' />
                  <div className='commentSingle_top'>
                      <span>{props.commentInfo.writer.name}</span>
                      <p>{props.commentInfo.content}</p>
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
                  {OpenReply && <CommentWrite replyId={props.commentInfo._id}/>}
                  <div className='coment_reply'>
                      {Refly.length===0 ? null : <p onClick={replyCommentHandler}><FaSortDown style={{ width: "18px", height: "auto", marginRight: "5px" }} />답글보기({Refly.length})</p>}
                      {ReplyComment && Refly.map((e, index) => (
                          <CommentSingle commentInfo={e} key={index} />
                      ))}
                  </div>
              </div>
              :
              null
          }
      </div>
  )
}

export default CommentSingle