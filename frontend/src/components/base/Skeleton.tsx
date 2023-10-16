import { css, keyframes } from "@emotion/css";
import { HTMLAttributes } from "react";

const loading = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;
const skeleton = css`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${loading} 2s infinite alternate;
`;

export default function Skeleton(attrs: HTMLAttributes<HTMLDivElement>) {
  return <div {...attrs} className={`${skeleton} ${attrs.className}`} />;
}
