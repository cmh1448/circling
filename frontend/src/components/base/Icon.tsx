import { HTMLAttributes } from "react";

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  fill?: boolean;
  weight?: number;
  grad?: number;
  opsz?: number;
}

export default function Icon(props: IconProps) {
  const {
    icon,
    fill = false,
    weight = 300,
    grad = 0,
    opsz = 40,
    ...rest
  } = props;
  const iconStyle = () =>
    `'FILL' ${Number(fill)},
    'wght' ${weight},
    'grad' ${grad},
    'opsz' ${opsz}`;

  return (
    <span
      {...rest}
      className={`material-symbols-outlined  select-none ${props.className}`}
      style={{
        fontVariationSettings: iconStyle(),
      }}
    >
      {icon}
    </span>
  );
}
