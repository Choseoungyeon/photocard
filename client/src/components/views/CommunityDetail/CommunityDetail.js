import React, {useState,useEffect} from 'react'
import uploadeDetail_decoration from '../../../img/Form/form_decoration.svg'
import { useParams, useNavigate } from "react-router";
import { useDispatch} from 'react-redux';
import { getComments } from '../../../_action/comment_action';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import fileDownload from "js-file-download";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CommunityDetailModule.css"
import Comment from './Comment';
import axios from 'axios'

function CommunityDetail(props) {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [Select, setSelect] = useState([])
    const [User, setUser] = useState("")
    const {communityId} = useParams();

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

    const handleDownload = (url, filename) => {
        url.forEach((e)=>{
            axios
            .get(e, {
                responseType: "blob"
            })
            .then((res) => {
                fileDownload(res.data, filename);
            });
        })
    };

    const onUserHandler =()=>{
        if (props.user.userData) {
            setUser(props.user.userData._id)
        }
    }

    const modifyPageHandler = (communityId)=>{
        navigate(`/community/modifyPage/${communityId}`)
      }

    const deletePageHandler = (communityId)=>{
        axios.get(`/api/community/delete_by_id?id=${communityId}&type=single`)
        .then(response =>{
            if(response.data.success){
                navigate("/")
            }else{
                alert("error")
            }
        })
    }

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

    useEffect(() => {
        axios.get(`/api/community/community_by_id?id=${communityId}&type=single`)
            .then(response => {
                setSelect(response.data[0])
            })
            .catch(err => alert(err))

        // axios.get(`/api/comment/getComments?id=${communityId}`)
        // .then(response=>{
        //     if(response.data.success){
        //         setComments(response.data.comment)
        //     }else{
        //         alert("????????? ????????? ??????????????? ??????????????????")
        //     }
        // })

        dispatch(getComments(communityId))
        onUserHandler()
    }, [])

    return (
        <div className='uploadeDetail_wrap'>
            <div className='uploadeDetail_container'>
                <img className='uploadeDetail_decoration' src={uploadeDetail_decoration} alt="uploadeDetail_decoration" />
                <div className='uploadPage_left'>
                    {Select.length === 0 ?
                        null : Select.images.length === 1 ?
                            <div className='slick-slider-1'>
                                <SamplePrevArrow className="Arrow prev" />
                                <img className='upload_photocard_select' src={Select.images[0]} alt="upload_photocard_select" />
                                <SampleNextArrow className="Arrow" />
                            </div>
                            :
                            <Slider {...settings}>
                                {Select.images.map((e, index) => (
                                    <div className='slick-slider' key={index}>
                                        <img className='upload_photocard_select' style={{ margin: "0 auto", width: "220px", height: "auto" }} src={e} alt="upload_photocard_select" />
                                    </div>
                                ))}
                            </Slider>
                    }
                </div>
                <div className='communityDetail_right'>
                    <div className='communityDetail_right_detailBox'>
                        <div>
                            <h3>Title :</h3>
                            {Select.length === 0 ? null : <p>{Select.title}</p>}
                        </div>
                        <div>
                            <h3>User :</h3>
                            {Select.length === 0 ? null : <p>{Select.user}</p>}
                        </div>
                        <div>
                            <h3>Date :</h3>
                            {Select.length === 0 ? null : <p>{Select.date}</p>}
                        </div>
                        <div>
                            <h3>Content :</h3>
                            {Select.length === 0 ? null : <p>{Select.content}</p>}
                        </div>
                        <button className='Community_button' onClick={()=>handleDownload(Select.images,"photocard.png")}>DOWNLOAD</button>
                        
                        {Select.length===0 ? null : 
                            User===Select.writer ? 
                                <div className='modify_button'>
                                    <button className='Community_button' onClick={()=>modifyPageHandler(communityId)}>MODIFY</button>
                                    <button className='Community_button' onClick={()=>deletePageHandler(communityId)}>DELETE</button>
                                </div> :
                            null}
                    </div>
                </div>
                <Comment/>
            </div>
            <div className='background'></div>
        </div>
    )
}

export default CommunityDetail