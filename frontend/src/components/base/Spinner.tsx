import { css, keyframes } from "@emotion/css";

export interface BaseSpinnerProps {
  color?: string;
  size?: string;
}

const rotate = keyframes`
100% {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}
`;

const svg = css`
  animation: ${rotate} 1.5s linear infinite;
  height: 100%;
  width: 100%;
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1,400;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 178,400;
    stroke-dashoffset: -70;
  }
  100% {
    stroke-dasharray: 179,400;
    stroke-dashoffset: -248;
  }
`;

const circle = css`
  stroke-dasharray: 1, 400;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease-in-out infinite 0s;
  stroke-linecap: round;
  fill: none;
  stroke-width: 10;
`;

export default function Spinner(props: BaseSpinnerProps) {
  const { color = "white", size = "50px" } = props;

  return (
    <>
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
        }}
      >
        <svg viewBox="0 0 100 100" className={svg}>
          <circle cx="50" cy="50" r="40" stroke={color} className={circle} />
        </svg>
      </div>

      <style></style>
    </>
  );
}
