import React from 'react'
import "./LandingPageModule.css"
import { FaGithub, FaEnvelope } from "react-icons/fa";
import community_img from '../../../img/Main/community_img.png'
import main_img from '../../../img/Main/main_img.png'
import makeCard_img from '../../../img/Main/makeCard_img.png'
import blog_icon from '../../../img/Main/blog_icon.svg'
import album_img from '../../../img/Main/album_img.png'

function LandingPage() {
  return (
    <div className='landingPage_wrap'>
      <main>
        <div className='ladingPage_centerbox'>
          <div className='landingPage_main_left section_info'>
            <h2>photocard</h2>
            <p>
              자신만의 추억을 꾸며보세요!<br />
              자유롭게 꾸민 포토카드를 앨범에 저장해보세요
            </p>
          </div>
          <div className='landingPage_main_right'><img src={main_img} alt="main_img" /></div>
        </div>
      </main>

      <section className='landingPage_makeCard'>
        <div className='ladingPage_centerbox'>
          <div className='section_info'>
            <h2>maker</h2>
            <p>
              사진을 자유롭게 꾸며보세요!<br />
              다양한 스티커와 프레임이 준비되어 있습니다
            </p>
            <button>more</button>
          </div>
          <div className='landingPage_makeCard_right'><img src={makeCard_img} alt="makeCard_img" /></div>
        </div>
      </section>

      <section className='landingPage_community'>
        <div className='ladingPage_centerbox'>
          <div className='section_info'>
            <h2>community</h2>
            <p>
              꾸민 사진을 커뮤니티에 공유해보세요!<br />
              예쁘게 꾸민 최애나 추억의 사진을 공유할수 있습니다
            </p>
            <button>more</button>
          </div>
          <div className='landingPage_community_right'><img src={community_img} alt="community_img" /></div>
        </div>
      </section>

      <section className='landingPage_album'>
        <div className='ladingPage_centerbox'>
          <div className='section_info'>
            <h2>album</h2>
            <p>
              꾸민 사진을 앨범에 저장해보세요<br />
              날짜를 통해 만든 포토카드를 검색할 수 있습니다
            </p>
            <button>more</button>
          </div>
          <div className='landingPage_album_right'><img src={album_img} alt="album_img" /></div>
        </div>
      </section>
      <footer>
        <div>
          <FaGithub style={{width:"33px", height:"auto", color:"#C4B595"}} />
          <FaEnvelope style={{width:"34px", height:"auto", color:"#C4B595"}} />
          <img src={blog_icon} alt="blog_icon" />
        </div>
        <p>© 2021 SEOUNG YEONCHO All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default LandingPage