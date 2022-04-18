import React, {useState, useEffect, useRef} from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import "./CommunityModule.css"
import community_decoration from '../../../img/Form/form_decoration.svg'
import IdMaker from './IdMaker'
import Search from './Search'
import Like from './Like'
import axios from 'axios'

function Community() {

  const [Community, setCommunity] = useState([])
  const [Pagination, setPagination] = useState([])
  const CurrentPage = useRef(1)
  const SearchTerm = useRef("")
  const Selection = useRef("")
  const pageNumber = useRef()
  const navigate = useNavigate(); 
  const Skip = 0;
  const Limit = 7;

  const paginationSet = (body) => {
    axios.post('/api/community/count', body)
      .then(response => {
        if (response.data.success){
          const page = response.data.counts

          const list = (page)=>{
            if(page%7>0){
              return Math.floor(page/7 + 1)
            }else{
              return Math.floor(page/7)
            }
          }
          // pagination 구하는 함수

          let chase = []
          for (let i = 1; i <= list(page); i++) {
            chase.push(i)
          }
          //list 함수에서 구한 값을 list로 만들어 Pagination에 넣어주는 작업
          setPagination(chase)

          document.getElementById("pagination1").classList.add("on")
        }
      })
  }

  const getCommunity = (body) => {
    axios.post('/api/community', body)
      .then(response => {
        if (response.data.success) {
          setCommunity(response.data.productInfo)
        }
      })
  }

  const onPageHandler = (e, item) => {
    CurrentPage.current = e
    let body = {
      skip: (e - 1) * 7,
      limit: Limit,
      searchTerm: SearchTerm.current,
      selection:Selection.current
    }

    getCommunity(body)
    
    const domState = item.currentTarget.classList
    const parentState = pageNumber.current.childNodes
    for (let i = 0; i < parentState.length; i++) {
      parentState[i].classList.remove("on")
    }
    domState.add("on")
  }

  const searchHandler = (searchBody)=>{

    SearchTerm.current = searchBody.searchTerm
    Selection.current = searchBody.selection

    let body = {
      selection : searchBody.selection,
      term : searchBody.searchTerm
    }
    getCommunity(searchBody)
    paginationSet(body)
  }

  const detailPageHandler = (communityId)=>{
    navigate(`/community/${communityId}`)
  }

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit
    }
    getCommunity(body)
    paginationSet()
  }, [])

  return (
    <div className='community_wrap'>
      <div className='community_container'>
        <img className='community_decoration' src={community_decoration} alt="community_decoration" />
        <h2>Community</h2>
        <Search refreshFunction={searchHandler}/>
        <table>
          <thead>
            <tr>
              <th className='community_id' >id</th>
              <th className='community_user'>user</th>
              <th className='community_title'>title</th>
              <th className='community_date' >date</th>
              <th className='community_like'>like</th>
            </tr>
          </thead>
          <tbody>
             {Community.map((e, index)=>(
               <tr key={index} onClick={()=>detailPageHandler(e._id)}>
                 <IdMaker page={CurrentPage.current} count={index} community={Community}/>
                 <td className='community_user'>{e.user}</td>
                 <td className='community_title'>{e.title}</td>
                 <td className='community_date'>{e.date}</td>
                 <Like />
               </tr>
             ))}
          </tbody>
        </table>
        <ul className='community_pagination' ref={pageNumber}>
          {Pagination.length === 0 ? 
           <li id={"pagination1"}>1</li>
           : 
           Pagination.map(e =>
            <li key={`pagination${e}`} id={`pagination${e}`} onClick={(item) => onPageHandler(e, item)}>{e}</li>
          )}
        </ul>
        <button className='community_button'><Link to={"/community/upload"}>Upload</Link></button>
      </div>
    </div>
  )
}

export default Community