import React,{useState, useRef, useEffect} from 'react'
import { useParams } from "react-router";
import { useDispatch} from 'react-redux';
import { saveComments } from '../../../_action/comment_action';
import {useSelector} from 'react-redux'

function CommentWrite(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const {communityId} = useParams();
    const [Content, setContent] = useState("")
    const replyId = useRef()

    const contentHandler = (e) => {
        setContent(e.target.value)
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault();

        const variables = {
            content : Content,
            writer: user.userData._id,
            postId: communityId,
            ...replyId.current
        }

        console.log(variables)

        dispatch(saveComments(variables))
        .then(setContent("")).then(props.refreshFunction())
    }

    useEffect(() => {
        if(props.replyId === undefined){
        }else{
          replyId.current = {responseTo : props.replyId}
        }
  
      }, [props.replyId])

    return (
        <form className='commentWrite_wrap'>
            <textarea value={Content} onChange={contentHandler} placeholder="write more comment...." />
            <br />
            <button onClick={onSubmitHandler}>SUBMIT</button>
        </form>
    )
}

export default CommentWrite