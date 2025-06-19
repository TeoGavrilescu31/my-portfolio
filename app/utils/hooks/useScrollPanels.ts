import { useEffect, useRef, useState } from 'react';

export const useScrollPanels = () => {
  const [nextSection, setNextSection] = useState<HTMLDivElement | null>(null);
  const [isLeft, setIsLeft] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isLastVisible, setIsLastVisible] = useState(false);
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const scrollToNextSection = () => {
    if (!mainRef.current) {
      return;
    }
    const currentScroll = Math.floor((mainRef.current as HTMLDivElement).scrollTop); // Current scroll position
    const windowHeight = window.innerHeight; // Height of the viewport
    const sections = document.querySelectorAll('.test'); // Select all sections

    // Use Array.prototype.some for early termination
    Array.from(sections).some((section, index) => {
      const sectionTop = (section as HTMLDivElement).offsetTop;
      console.log(sectionTop, currentScroll, windowHeight);
      if (sectionTop >= currentScroll + windowHeight) {
        setNextSection(section as HTMLDivElement);
        if (index === Array.from(sections).length - 1) {
          setIsLastVisible(true);
        } else {
          setIsLastVisible(false);
        }
        return true; // Exit loop early once we find the next section
      }
      return false;
    });
  };

  const scrollToPreviousSection = () => {
    if (!mainRef.current) {
      return;
    }
    const currentScroll = Math.floor((mainRef.current as HTMLDivElement).scrollTop); // Current scroll position
    const windowHeight = window.innerHeight; // Height of the viewport
    const sections = document.querySelectorAll('.test'); // Select all sections

    let previousSection = null;
    Array.from(sections).forEach((section, index) => {
      const sectionTop = (section as HTMLDivElement).offsetTop;
      if (sectionTop < currentScroll - windowHeight / 2) {
        previousSection = section;
        if (index === Array.from(sections).length - 1) {
          setIsLastVisible(true);
        } else {
          setIsLastVisible(false);
        }
      }
    });

    if (previousSection) {
      setNextSection(previousSection as HTMLDivElement);
    } else if (heroRef.current) {
      setNextSection(heroRef.current as HTMLDivElement);
    }
  };

  const isInViewport = (element: HTMLDivElement | null) => {
    if (!element) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // Calculate the visible height and width of the element
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);

    // Check if at least half of the element is visible
    return visibleHeight >= rect.height / 2 && visibleWidth >= rect.width / 2;
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.test');
      if (heroRef.current) {
        if (isInViewport(heroRef.current)) {
          setIsHeroVisible(true);
          setIsLeft(false);
        } else {
          setIsHeroVisible(false);
        }
      }
      Array.from(sections).some((section, index) => {
        if (isInViewport(section as HTMLDivElement)) {
          if (index === Array.from(sections).length - 1) {
            setIsLastVisible(true);
          } else {
            setIsLastVisible(false);
          }
          if ((section as HTMLDivElement).classList.contains('left')) {
            setIsLeft(true);
            return true;
          } else {
            setIsLeft(false);
            return false;
          }
        }
      });
    };
    if (heroRef.current) {
      if (isInViewport(heroRef.current)) {
        setIsHeroVisible(true);
        setIsLeft(false);
      } else {
        setIsHeroVisible(false);
      }
    }
    if (mainRef.current) {
      (mainRef.current as HTMLDivElement).addEventListener('scroll', handleScroll);
    }
    return () => {
      if (mainRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        (mainRef.current as HTMLDivElement).removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      if (nextSection.classList.contains('left')) {
        setIsLeft(true);
      } else {
        setIsLeft(false);
      }
    }
  }, [nextSection]);

  return {
    mainRef,
    heroRef,
    isLastVisible,
    isLeft,
    scrollToNextSection,
    isHeroVisible,
    scrollToPreviousSection,
  };
};
