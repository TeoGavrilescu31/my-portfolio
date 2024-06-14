'use client'
import './page.scss'
import Silhouette from './components/svgComponents/silhouette/silhouette'
import ScrollDown from './components/svgComponents/scrollDown/scrollDown'
import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

const Page = () => {
  const [nextSection, setNextSection] = useState<HTMLDivElement | null>(null)
  const [isLeft, setIsLeft] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isLastVisible, setIsLastVisible] = useState(false)
  const mainRef = useRef(null)
  const heroRef = useRef(null)
  const scrollToNextSection = () => {
    if (!mainRef.current) {
      return
    }
    const currentScroll = Math.floor(
      (mainRef.current as HTMLDivElement).scrollTop
    ) // Current scroll position
    const windowHeight = window.innerHeight // Height of the viewport
    const sections = document.querySelectorAll('.test') // Select all sections

    // Use Array.prototype.some for early termination
    Array.from(sections).some((section, index) => {
      const sectionTop = (section as HTMLDivElement).offsetTop
      console.log(sectionTop, currentScroll, windowHeight)
      if (sectionTop >= currentScroll + windowHeight) {
        setNextSection(section as HTMLDivElement)
        if (index === Array.from(sections).length - 1) {
          setIsLastVisible(true)
        } else {
          setIsLastVisible(false)
        }
        return true // Exit loop early once we find the next section
      }
      return false
    })
  }

  const scrollToPreviousSection = () => {
    if (!mainRef.current) {
      return
    }
    const currentScroll = Math.floor(
      (mainRef.current as HTMLDivElement).scrollTop
    ) // Current scroll position
    const windowHeight = window.innerHeight // Height of the viewport
    const sections = document.querySelectorAll('.test') // Select all sections

    let previousSection = null
    Array.from(sections).forEach((section, index) => {
      const sectionTop = (section as HTMLDivElement).offsetTop
      if (sectionTop < currentScroll - windowHeight / 2) {
        previousSection = section
        if (index === Array.from(sections).length - 1) {
          setIsLastVisible(true)
        } else {
          setIsLastVisible(false)
        }
      }
    })

    if (previousSection) {
      setNextSection(previousSection as HTMLDivElement)
    } else if (heroRef.current) {
      setNextSection(heroRef.current as HTMLDivElement)
    }
  }

  const isInViewport = (element: HTMLDivElement | null) => {
    if (!element) {
      return
    }
    const rect = element.getBoundingClientRect()
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth

    // Calculate the visible height and width of the element
    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    const visibleWidth =
      Math.min(rect.right, windowWidth) - Math.max(rect.left, 0)

    // Check if at least half of the element is visible
    return visibleHeight >= rect.height / 2 && visibleWidth >= rect.width / 2
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.test')
      if (heroRef.current) {
        if (isInViewport(heroRef.current)) {
          setIsHeroVisible(true)
          setIsLeft(false)
        } else {
          setIsHeroVisible(false)
        }
      }
      Array.from(sections).some((section, index) => {
        if (isInViewport(section as HTMLDivElement)) {
          if (index === Array.from(sections).length - 1) {
            setIsLastVisible(true)
          } else {
            setIsLastVisible(false)
          }
          if ((section as HTMLDivElement).classList.contains('left')) {
            setIsLeft(true)
            return true
          } else {
            setIsLeft(false)
            return false
          }
        }
      })
    }
    if (heroRef.current) {
      if (isInViewport(heroRef.current)) {
        setIsHeroVisible(true)
        setIsLeft(false)
      } else {
        setIsHeroVisible(false)
      }
    }
    if (mainRef.current) {
      ;(mainRef.current as HTMLDivElement).addEventListener(
        'scroll',
        handleScroll
      )
    }
    return () => {
      if (mainRef.current) {
        ;(mainRef.current as HTMLDivElement).removeEventListener(
          'scroll',
          handleScroll
        )
      }
    }
  }, [])

  useEffect(() => {
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      if (nextSection.classList.contains('left')) {
        setIsLeft(true)
      } else {
        setIsLeft(false)
      }
    }
  }, [nextSection])

  const arrayTest = ['test1', 'test2', '3', '4', '5']

  return (
    <main className="main" ref={mainRef}>
      <div className="hero-text-container" ref={heroRef}>
        <h1 className="hero-text">
          Hello,
          <br /> my name is
          <br />
          <span className="hero-text__name">Teo</span>
        </h1>
        <div className="image-container">
          <div className={'silhoutte'}>
            <Silhouette />
          </div>
        </div>
      </div>
      {arrayTest.map((item, index) => (
        <div
          className={clsx('test', index % 2 === 0 && 'left')}
          key={item}
          id={item}
        >
          {item}
        </div>
      ))}
      {!isLastVisible && (
        <div
          className={clsx(
            'scroll-container',
            isLeft && 'left-scroll-container'
          )}
          onClick={scrollToNextSection}
        >
          <p className="scroll-container__text">Scroll down</p>
          <div className="scroll-container__icon">
            <ScrollDown />
          </div>
        </div>
      )}
      <div className={clsx('navigation-arrows', isLeft && 'left-navigation')}>
        <div
          onClick={() => !isHeroVisible && scrollToPreviousSection()}
          className={clsx(isHeroVisible && 'disabled')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
          </svg>
        </div>
        <div
          onClick={() => !isLastVisible && scrollToNextSection()}
          className={clsx(isLastVisible && 'disabled')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
          </svg>
        </div>
      </div>
    </main>
  )
}

export default Page
