import './scrollDown.scss';

const ScrollDown = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path
          className="scroll-down-svg"
          stroke="white"
          strokeWidth={2}
          d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z"
        />
      </svg>
    </>
  );
};

export default ScrollDown;
