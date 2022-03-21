import React, {useState,useEffect} from 'react'
import uploadeDetail_decoration from '../../../img/Form/form_decoration.svg'
import { useParams } from "react-router";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CommunityDetailModule.css"
import Comment from './Comment';
import axios from 'axios'

function CommunityDetail(props) {

    const [Select, setSelect] = useState([])
    const [User, setUser] = useState("")
    const {communityId} = useParams();
    const [Comments, setComments] = useState([])

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

    const onUserHandler =()=>{
        if (props.user.userData) {
            setUser(props.user.userData._id)
        }
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

        axios.get(`/api/comment/getComments?id=${communityId}`)
        .then(response=>{
            if(response.data.success){
                setComments(response.data.comment)
            }else{
                alert("코멘트 정보를 가져오는데 실패했습니다")
            }
        })

        onUserHandler()
    }, [])

    return (
        <div className='uploadeDetail_wrap'>
            <div className='uploadeDetail_container' style={{padding:"60px 80px 60px 80px"}}>
                <img className='uploadeDetail_decoration' src={uploadeDetail_decoration} alt="uploadeDetail_decoration" />
                <div className='uploadPage_left'>
                    {Select.length === 0 ?
                        null : Select.images.length === 1 ?
                            <div>
                                {Select.images.map((e, index) => (
                                    <div className='slick-slider-1' key={index}>
                                        <SamplePrevArrow className="Arrow" />
                                        <img className='upload_photocard_select' style={{ width: "220px", height: "auto" }} src={e} alt="upload_photocard_select" />
                                        <SampleNextArrow className="Arrow" />
                                    </div>
                                ))}

                            </div> :
                            <Slider {...settings} style={{ width: "70%", height: "325px", margin: "38px auto" }}>
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
                        <button className='Community_button'>DOWNLOAD</button>
                        
                        {Select.length===0 ? null : 
                            User===Select.writer ? 
                                <div className='modify_button'>
                                    <button className='Community_button'>MODIFY</button>
                                    <button className='Community_button'>DELETE</button>
                                </div> :
                            null}
                    </div>
                </div>
                <Comment commentInfo={Comment} />
            </div>
            <div className='background'></div>
        </div>
    )
}

export default CommunityDetail