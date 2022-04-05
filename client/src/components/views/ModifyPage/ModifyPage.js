import React, {useState,useEffect,useRef} from 'react'
import uploadeDetail_decoration from '../../../img/Form/form_decoration.svg'
import upload_photocard from '../../../img/Upload/photocard_upload.png'
import { useParams} from "react-router";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'

function ModifyPage(props) {

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    const [User, setUser] = useState("")
    const [Photocard, setPhotocard] = useState([])
    const modal01 = useRef(null)
    const modal02 = useRef(null)
    const [Select, setSelect] = useState([])
    const {communityId} = useParams();

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
                skip: 0,
                limit: 8
            }
            getProducts(body)
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
                } else {
                    alert('상품들을 가져오는데 실패했습니다')
                }
            })
    }

    const SampleNextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <FaAngleRight
                className={className}
                onClick={onClick}
            />
        );
    }

    const SamplePrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <FaAngleLeft
                className={className}
                onClick={onClick}
            />
        );
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

    useEffect(() => {
        axios.get(`/api/community/community_by_id?id=${communityId}&type=single`)
            .then(response => {
                setSelect(response.data[0].images)
                setTitle(response.data[0].title)
                setContent(response.data[0].content)
                setUser(response.data[0].user)
            })
            .catch(err => alert(err))
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

  return (
      <div className='uploadeDetail_wrap'>
          <div className='uploadeDetail_container'>
              <img className='uploadeDetail_decoration' src={uploadeDetail_decoration} alt="uploadeDetail_decoration" />
              <h2>Modify Page</h2>
              <div className='uploadPage_left'>
                  {Select.length === 0 ?
                      <div className='slick-slider-1' >
                          <FaAngleLeft className="Arrow prev" />
                          <img className='upload_photocard' src={upload_photocard} alt="upload_photocard" onClick={uploadHandler} />
                          <FaAngleRight className="Arrow" />
                      </div>
                      :
                      <Slider {...settings}>
                          <div className='slick-slider'>
                              <img className='upload_photocard' src={upload_photocard} alt="upload_photocard" onClick={uploadHandler} />
                          </div>
                          {Select.map((e, index) => (
                              <div className='slick-slider' key={index}>
                                  <img className='upload_photocard_select' style={{ margin: "0 auto", width: "220px", height: "auto" }} src={e} alt="upload_photocard_select" />
                              </div>
                          ))}
                      </Slider>
                  }
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
                      <button className="Community_button" >SUBMIT</button>
                  </form>
              </div>
          </div>
          <div className='upload_albumList' ref={modal01}>
              <IoCloseCircle style={{ position: "absolute", top: "-40px", right: "0px", color: "#fff", width: "30px", height: "30px", cursor: "pointer" }} onClick={ondeleteHandler} />
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
          <div className='background'></div>
      </div>
  )
}

export default ModifyPage