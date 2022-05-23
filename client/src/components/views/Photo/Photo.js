import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import "./PhotoModule.css"
import axios from 'axios'
import img_plus from "../../../img/Nav/img_plus.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFillDrip, faRibbon, faStar, faTimes, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import Moveable from "react-moveable";
import Dropzone from 'react-dropzone'
import html2canvas from "html2canvas";

function Photo(props) {
  const [loading, setLoading] = useState(false);
  const [Radio, setRadio] = useState({});
  const [Test, setTest] = useState({});
  const [Data, setData] = useState("");
  const [Img, setImg] = useState([]);
  const [Attachment, setAttachment] = useState([]);
  const [Snap, setSnap] = useState(true)
  const [targets, setTargets] = useState([]);
  const [frameMap] = useState(() => new Map());
  const moveableRef = useRef(null);
  const selectoRef = useRef(null);
  const chaseRef = useRef(null);
  const canvasRef = useRef();
  const photoRef = useRef(null);
  const navigate = useNavigate(); 

  const onClickHandler = (values) => {
    const List = Object.keys(Radio)
    const removeIndex = List.indexOf(values)
    List.splice(removeIndex, 1)
    document.getElementById(values).classList.add("on")
    List.map(e => (
      document.getElementById(e).classList.remove("on")
    ))
    setData(values)
  }

  const saveAs = async (img) => {
    
    const test = {
      can: img
    }
    const ImgInfo = await axios.post('/api/photocard/image', test)
    const images1 = ImgInfo.data.result

    const dateFunction = () => {
      const today = new Date();
      const dates = String(today.getDate()).padStart(2, "0");
      const months = String(today.getMonth()+1).padStart(2, "0");
      const years = String(today.getFullYear());

      return `${years} ${months} ${dates}`
    }

    const body = {
      //로그인된 사람의 아이디
      writer: props.user.userData._id,
      images: images1,
      date:dateFunction()
    }

    axios.post('/api/photocard', body).then(response => {
      if (response.data.success) {
        navigate('/')
      } else {
        alert('상품 업로드에 실패했습니다.')
      }
    }).finally(setLoading(false))
  };

  const printDocument = domElement => {
    setLoading(true)
    html2canvas(domElement , { logging: false, letterRendering: 1, useCORS: true }).then(canvas => {
      saveAs(canvas.toDataURL('image/png'));
    });
  };

  const imgClickHandler = (e) => {
    setImg(current => [...current, {
      key:Math.random(10),
      img:e.target.src
    }])
  }

  const colorDrip =(e)=>{
    document.querySelector(".photoCard").style.backgroundColor = e
    document.querySelector(".photoCard").style.backgroundImage = "none"
  }

  const dropHandler = (files) => {
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      const {
        currentTarget:{result},
      } = finishedEvent
      setAttachment([result])
      document.querySelector(".img_plus").classList.add("on")
    }
    reader.readAsDataURL(files[0])
  }

  const testFun = () => {
    if (photoRef.current === undefined || photoRef.current === null) {

    } else {
      let rect = photoRef.current.getBoundingClientRect();
      setTest({
        left: rect.left,
        top: rect.top,
        bottom: rect.bottom,
        right: rect.right
      })
    }
  }

  const ClickHandler =(item)=>{
    setTargets([item.target.offsetParent])
  }

  const ImgClickHandler =(item)=>{
    setTargets([item.target])
  }

  const imgDeleteHandler = (e)=>{
    let body = Img
    let pod  = body.indexOf(e)
    body.splice(pod, 1)
    setImg(body)
    setTargets([])
    console.log("run")
  }

  const cancleHandler = (e)=>{
    if(targets.length>0){
      if(e.target.classList.value === "Img_absolute_img"){
        setTargets([e.target.offsetParent])
      }else{
        setTargets([])
      }
    }
  }


  useEffect(() => {
    let body = { FillDrip: ["#CACFE3", "#838BB2", "#E4A99B", "#F2EEE5","#000000"] }
    const Imgkeys = ["Ribbon", "Sticker"]

    Imgkeys.map(item => axios.get(`/api/select/select_by_id?id=${item}`)
      .then(response => {
        body = {
          ...body, [item]: response.data.result
        }
        setRadio(body)
      }))
  }, [])

  useEffect(()=>{
    testFun()
    window.addEventListener("resize", testFun)

    return () => {
      window.removeEventListener("resize", testFun)
    }
  },[])

  useEffect(() => {
    if(targets === undefined || targets === null){
    }else{
      if (targets.length > 0 && targets[0].hasAttribute("id")) {
        if (targets[targets.length-1] === chaseRef.current) {
          let body = targets
          let pod = body.indexOf(targets[targets.length-1])
          body.splice(pod, 1)
          body.map(e=>(e.children[0].style.display ="block"))
        }else{
          targets.map(e=>(e.children[0].style.display ="block"))
        }
      }else{
        setSnap(false)
      }
    }

    return () => {
      if(targets === undefined || targets === null){
      }else{
        if(targets.length> 0 && targets[0].hasAttribute("id")){
          targets.map(e=>(e.children[0].style.display ="none"))
        }else{
          testFun()
          setSnap(true)
        }
      }
    }
  }, [targets])

  const test = ()=>{
    console.log("test")
  }

  useEffect(() => {
    if(Attachment.length>0){
      chaseRef.current.style.transform = `translate(0px, 0px) rotate(0deg) `;
      chaseRef.current.style.width = `auto`;
      chaseRef.current.style.height = `100%`;
      setTargets([])
    }
    
  }, [Attachment])
  
  return <div className="container" >
    <div className="photo_container">
      <Moveable
        ref={moveableRef}
        draggable={true}
        target={targets}
        snappable={Snap}
        pinchable={true}
        snapThreshold={5}
        snapCenter={false}
        bounds={Test}
        elementGuidelines={document.querySelector(".photo_left")}
        verticalGuidelines={[100, 200, 300]}
        horizontalGuidelines={[0, 100, 200]}
        onClickGroup={e => {
          selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
        }}
        onDragStart={e => {
          const target = e.target;

          if (!frameMap.has(target)) {
            frameMap.set(target, {
              translate: [0, 0],
              rotate: 0,
            });
          }
          const frame = frameMap.get(target);

          e.set(frame.translate);
        }}
        onDrag={e => {
          const target = e.target;
          const frame = frameMap.get(target);

          frame.translate = e.beforeTranslate;
          target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`;
        }}
        onDragGroupStart={e => {
          e.events.forEach(ev => {
            const target = ev.target;

            if (!frameMap.has(target)) {
              frameMap.set(target, {
                translate: [0, 0],
                rotate: 0,
              });
            }
            const frame = frameMap.get(target);

            ev.set(frame.translate);
          });
        }}
        onDragGroup={e => {
          e.events.forEach(ev => {
            const target = ev.target;
            const frame = frameMap.get(target);

            frame.translate = ev.beforeTranslate;
            target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`;
          });
        }}
        resizable={true}
        throttleResize={0}
        keepRatio={true}
        onResizeStart={({ target, set, setOrigin, dragStart }) => {
          // Set origin if transform-origin use %.
          const frame = frameMap.get(target);
          setOrigin(["%", "%"]);

          // If cssSize and offsetSize are different, set cssSize. (no box-sizing)
          const style = window.getComputedStyle(target);
          const cssWidth = parseFloat(style.width);
          const cssHeight = parseFloat(style.height);
          set([cssWidth, cssHeight]);

          // If a drag event has already occurred, there is no dragStart.
          dragStart && dragStart.set(frame.translate);
        }}
        onResize={({ target, width, height, drag }) => {
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          const frame = frameMap.get(target);
          // get drag event
          frame.translate = drag.beforeTranslate;
          target.style.transform
            = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) rotate(${frame.rotate}deg) `;
        }}
        rotatable={true}
        throttleRotate={0}
        rotationPosition="top"
        onRotateStart={({ set, target }) => {
          const frame = frameMap.get(target);
          set(frame.rotate);
        }}
        onRotate={({ target, beforeRotate, drag }) => {
          const frame = frameMap.get(target);
          frame.rotate = beforeRotate;
          target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) rotate(${beforeRotate}deg) `;
        }}
      ></Moveable>
      <div className='photo_left' ref={photoRef} onClick={cancleHandler}>
        <div className='photoCard' ref={canvasRef} >
          {Img.map((e) => (
            <div key={e.key} id={e.key} className='Img_absolute' style={{cursor:"pointer"}}>
              <div className='deleteButton' id={`${e.key}_Delete`} style={{ display: "none" }} onClick={() => imgDeleteHandler(e)} onTouchStart={() => imgDeleteHandler(e)}><FontAwesomeIcon style={{ width: 15, height: "auto", cursor: "pointer" }} icon={faTimes} /></div>
              <img src={e.img} alt="" onClick={ClickHandler} className="Img_absolute_img" />
            </div>
          ))}
          <Dropzone onDrop={dropHandler}>
            {({ getRootProps, getInputProps }) => (
              <div className='photoZone' {...getRootProps()}>
                {Attachment.map((e,index) => (
                  <img key={index} style={{ width: "auto", height: "100%" }} src={e} alt="img" ref={chaseRef} onClick={ImgClickHandler} />
                ))}
                <img src={img_plus} className="img_plus" alt="" />
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      <div className='photo_right'>
        <div className='photo_right_container'>
          <ul>
            <li id="FillDrip" onClick={() => onClickHandler("FillDrip")}><FontAwesomeIcon style={{ width: 28.3, height: "auto", marginTop: "-15px" }} icon={faFillDrip} /></li>
            <li id="Ribbon" onClick={() => onClickHandler("Ribbon")}><FontAwesomeIcon style={{ width: 24.38, height: "auto", marginTop: "-15px" }} icon={faRibbon} /></li>
            <li id="Sticker" onClick={() => onClickHandler("Sticker")}><FontAwesomeIcon style={{ width: 27.11, height: "auto", marginTop: "-15px" }} icon={faStar} /></li>
          </ul>
          <div className='photo_right_imgZone'>
            {Data ? Data === "FillDrip" ? Radio[Data] === undefined ? "Loading..." : Radio[Data].map((e, index) => (<div key={index} style={{ backgroundColor: e }} className="fillDrip" onClick={() => colorDrip(e)}></div>)) : Radio[Data] === undefined ? "Loading..."  : Radio[Data].map((e, index) => (<img key={index} onClick={imgClickHandler} src={e} alt="" />)) : null}
          </div>
        </div>
        <div style={{width:"71.17%"}}>
          <button className='submit_button' onClick={() => printDocument(canvasRef.current)} >
            submit
            <span><FontAwesomeIcon style={{ width: 10, height: "auto", marginLeft:10, transform:"translateY(4px)"}} icon={faCaretRight} /></span>
          </button>
        </div>
      </div>
    </div>
    {loading?<div className='chase_modal'>Loading</div>:null}
  </div>;
}

export default Photo;

