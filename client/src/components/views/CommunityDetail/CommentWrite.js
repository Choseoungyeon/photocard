import React,{useState} from 'react'
import { useParams } from "react-router";
import axios from 'axios'
import {useSelector} from 'react-redux'

function CommentWrite() {
    const user = useSelector(state => state.user)
    const {communityId} = useParams();
    const [Content, setContent] = useState("")

    const contentHandler = (e) => {
        setContent(e.target.value)
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault();

        const variables = {
            content : Content,
            writer: user.userData._id,
            postId: communityId
        }

        axios.post('/api/comment/saveComment', variables)
        .then(response =>{
            if(response.data.success){
                console.log(response.data.result)
                setContent("")
            }else{
                alert('커맨트를 저장하지 못했스비다')
            }
        })
    }

    return (
        <form>
            <textarea value={Content} style={{ height: "50px", width: "87.61%" }} onChange={contentHandler} placeholder="write more comment...." />
            <br />
            <button onClick={onSubmitHandler}>SUBMIT</button>
        </form>
    )
}

export default CommentWrite