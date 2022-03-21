import React, {useState,useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import uploadeDetail_decoration from '../../../img/Form/form_decoration.svg'
import upload_photocard from '../../../img/Upload/photocard_upload.png'
import { IoCloseCircle } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./UploadPageModule.css"
import axios from 'axios'

function UploadPage(props) {

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    const [User, setUser] = useState("")
    const [Photocard, setPhotocard] = useState([])
    const [PostSize, setPostSize] = useState(0)
    const [Select, setSelect] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const modal01 = useRef(null)
    const modal02 = useRef(null)
    const navigate = useNavigate(); 

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const onTitleHandler =(event)=>{
        setTitle(event.target.value)
    }

    const onContentHandler =(event)=>{
        setContent(event.target.value)
    }

    const onUserHandler =()=>{
        if (props.user.userData) {
            setUser(props.user.userData.name)
        }
    }

    const uploadHandler=()=>{

        modal01.current.classList.add("on")
        modal02.current.classList.add("on")

        if(Photocard.length === 0){
            let body = {
                userId: props.user.userData._id,
                skip: Skip,
                limit: Limit
            }
            getProducts(body)
        }else{
            console.log("yes")
        }
    }

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

    const onSelectHandler = (selectPhotocard) => {
        if (Select.includes(selectPhotocard)) {
            let body = [...Select]
            let pod = body.indexOf(selectPhotocard)
            body.splice(pod, 1)
            setSelect(body)
        } else {
            setSelect([...Select, selectPhotocard])
        }
    }

    const ondeleteHandler =()=>{
        modal01.current.classList.remove("on")
        modal02.current.classList.remove("on")
    }

    const dateFunction = () => {
        const today = new Date();
        const dates = String(today.getDate()).padStart(2, "0");
        const months = String(today.getMonth()+1).padStart(2, "0");
        const years = String(today.getFullYear());
  
        return `${years} ${months} ${dates}`
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault()
        let body = {
            writer : props.user.userData._id,
            user : User,
            images : Select,
            date : dateFunction(),
            title : Title,
            content : Content,
        }

        axios.post('/api/community/upload', body).then(response => {
            if (response.data.success) {
                navigate('/')
            } else {
                alert('상품 업로드에 실패했습니다.')
            }
        })
    }

    useEffect(() => {
        if (props.user.userData) {
            setUser(props.user.userData.name)
        }

    }, [props.user.userData])
    
    return (
        <div className='uploadeDetail_wrap'>
            <div className='uploadeDetail_container'>
                <img className='uploadeDetail_decoration' src={uploadeDetail_decoration} alt="uploadeDetail_decoration" />
                <h2>Upload Page</h2>
                <div className='uploadPage_left'>
                    <Slider {...settings} style={{width:"70%", height:"325px", margin:"38px auto"}}>
                        <div className='slick-slider'>
                            <img className='upload_photocard' src={upload_photocard} alt="upload_photocard" style={{margin:"0 auto", cursor:"pointer"}} onClick={uploadHandler} />
                        </div>
                        {Select.length === 0 ? 
                            <div className='slick-slider'></div> :
                            Select.map((e, index)=>(
                                <div className='slick-slider' key={index}>
                                    <img className='upload_photocard_select' style={{margin:"0 auto", cursor:"pointer", width:"220px", height:"auto"}} src={e} alt="upload_photocard_select" />
                                </div>
                            )) 
                            
                        }
                    </Slider>
                </div>
                <div className='uploadPage_right'>
                    <form>
                        <div>
                            <label>Title :</label>
                            <input type="text" value={Title} onChange={onTitleHandler} placeholder="title" />
                        </div>
                        <div>
                            <label>User :</label>
                            <input type="text" onChange={onUserHandler} value={User} />
                        </div>
                        <div>
                            <label>Content :</label>
                            <textarea value={Content} onChange={onContentHandler} placeholder="write your content here...." />
                        </div>
                        <button className="Community_button" onClick={onSubmitHandler}>SUBMIT</button>
                    </form>
                </div>
            </div>
            <div className='upload_albumList' ref={modal01}>
                <IoCloseCircle style={{position:"absolute", top:"-40px", right:"0px", color:"#fff", width:"30px", height:"30px", cursor:"pointer"}} onClick={ondeleteHandler}/>
                <div className='albumList_container'>
                    {Photocard.map((e, index) => (
                        <div className='albumList_photocard' key={index}>
                            <input type='checkbox' value={e.images.url} checked={Select.includes(e.images.url) ? true : false} onChange={() => onSelectHandler(e.images.url)} />
                            <img src={e.images.url} alt="photocard" />
                        </div>
                    ))}
                </div>
            </div>
            <div className='modal' ref={modal02}></div>
        </div>
    )
}

export default UploadPage