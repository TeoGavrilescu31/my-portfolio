'use client';
import './page.scss';
import Silhouette from './components/svgComponents/silhouette/silhouette';
import clsx from 'clsx';
import PanelContainer from './components/organisms/panelContainer/panelContainer';

const Page = () => {
  const arrayTest = [
    'Experience_1',
    'Experience_2',
    'Experience_3',
    'Experience_4',
    'Experience_5',
    'Experience_6',
    'Experience_7',
  ];

  return (
    <main className="main">
      <section className="panel hero-text-container">
        <h1 className="hero-text">
          Hello,
          <br /> my name is
          <br />
          <span className="hero-text__name">Teo</span>
        </h1>
        <div className="image-container">
          <div className="silhoutte">
            <Silhouette />
          </div>
        </div>
        {/* <div className="scroll-container">
          <p className="scroll-container__text">Scroll down</p>
          <div className="scroll-container__icon">
            <ScrollDown />
          </div>
        </div> */}
      </section>

      {arrayTest.map((item, index) => (
        <PanelContainer
          className={clsx(index % 2 === 0 && 'left')}
          key={item}
          id={item}
          item={item}
        />
      ))}
    </main>
  );
};

export default Page;
