import { FC, CSSProperties } from "react";

interface WingProps {
  orientation: string;
  start: number;
  end: number;
  planeWidth: number;
}

const Wing: FC<WingProps> = ({ orientation, start, end, planeWidth }) => {
  const leftVal = orientation === "left" ? "-252px" : `${planeWidth * 2.2}em`;
  const style: CSSProperties = {
    height: `${(end - start) * 2}em`,
    top: `${start * 2}em`,
    left: leftVal,
  };

  return <div className={`absolute w-[250px] bg-[#99B2DD]`} style={style}></div>;
};

export default Wing;
