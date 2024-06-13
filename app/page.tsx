'use client'

import Profile from '../assets/images/profile-no-background.png'
import Image from 'next/image'
import Silhoutte from '../assets/images/silhouette.svg'
import ScrollDown from '../assets/images/scroll-down.svg'
import './page.scss'
import Silhouette from './components/silhouette'

const Page = () => {
  return (
    <main className={'main'}>
      <div className="hero-text-container">
        <h1 className="hero-text">
          Hello,
          <br /> my name is
          <br />
          <span className="hero-text__name">Teo</span>
        </h1>
      </div>
      <div className="image-container">
        {/* <Image
          src={Silhoutte}
          alt="Silhoutte"
          className={'silhoutte'}
          priority
        /> */}
        <div className={'silhoutte'}>
          <Silhouette />
        </div>
      </div>
      <div className="scroll-container">
        <p className="scroll-container__text">Scroll down</p>
        <Image
          src={ScrollDown}
          alt="Scroll Down"
          className="scroll-container__icon"
          priority
        />
      </div>
    </main>
  )
}

export default Page
