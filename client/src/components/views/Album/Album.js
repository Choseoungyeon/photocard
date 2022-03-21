import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import album_decoration from '../../../img/Form/form_decoration.svg'
import { AiOutlineInbox, AiOutlineDownload, AiFillDelete} from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import fileDownload from "js-file-download";
import axios from 'axios'
import "./AlbumModule.css"

function Album(props) {

    const [Photocard, setPhotocard] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)

    const getProducts = (body) => {
        axios.post('/api/photocard/album', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setPhotocard([...Photocard, ...response.data.productInfo])
                    } else {
                        setPhotocard(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('상품들을 가져오는데 실패했습니다')
                }
            })
    }

    const handleDownload = (url, filename) => {
        axios
            .get(url, {
                responseType: "blob"
            })
            .then((res) => {
                fileDownload(res.data, filename);
            });
    };

    useEffect(() => {
        if (props.user.userData) {
            let body = {
                userId: props.user.userData._id,
                skip: Skip,
                limit: Limit
            }
            getProducts(body)
        }

    }, [props.user.userData])

    const loadMoreHandler = () => {
        let changeSkip = Skip + Limit

        let body = {
            skip: changeSkip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(Skip)
    }

    const mouseHandler = (e) => {
        const domState = e.currentTarget.children[2].classList
        if (domState.contains("on")) {
            domState.remove("on")
        } else {
            domState.add("on")
        }
    }

    const handleDelete = (e) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.post('/api/photocard/image/delete', e.images)
            axios.get(`/api/photocard/delete_id?id=${e._id}&type=single`)
                .then(response => {
                    if (response.data.success) {
                        let body = [...Photocard]
                        let pod = body.indexOf(e)
                        body.splice(pod, 1)
                        setPhotocard(body)
                    } else {
                        alert('삭제를 실패했습니다')
                    }
                })
        }
    }

    const onChange = (event)=>{
        console.log(event.target.value)
        let body={
            skip:0,
            limit:Limit,
            searchTerm : event.target.value
        }

        setSkip(0)
        getProducts(body)
      }

    return (
        <div className='album_wrap'>
            <div className='album_container'>
                <img className='album_decoration' src={album_decoration} alt="album_decoration" />
                <h2>My album</h2>
                <form className='form_search'>
                    <div>
                        <input type="text" placeholder="search" onChange={onChange} />
                        <button><FaSearch style={{ width: 16, height: "auto" }} /></button>
                    </div>
                </form>
                <div className='photocard_wrap'>
                    
                    {Photocard.length === 0 ?
                        <div className='photocard_empty'>
                            <AiOutlineInbox style={{width:200, height:"auto"}} />
                            <Link to={"/photoCard"}>Make photocard now!</Link>
                        </div>
                        :
                        <div className='photocard_container'>
                            {Photocard.map((e, index) => (
                                <div className='photocard' key={index}  onMouseEnter={mouseHandler} onMouseLeave={mouseHandler}>
                                    <img src={e.images["url"]} alt="photocard" />
                                    <p>{e.date}</p>
                                    <div className='photocard_button'>
                                        <button onClick={()=>handleDownload(e.images["url"],"photocard.png")}><AiOutlineDownload style={{width:20, height:"auto"}} /></button>
                                        <button onClick={()=>handleDelete(e)}><AiFillDelete style={{width:20, height:"auto"}} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Album