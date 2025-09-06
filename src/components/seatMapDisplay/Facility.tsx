import { FC } from "react";

const Facility: FC<{ code: string; x: number; y: number }> = ({ code, x, y }) => {
  const left = `${y * 2}em `;
  const top = `${x * 2}em`;

  return (
    <div className={`absolute h-[1.8em] w-[1.8em] rounded-sm bg-[#F5EE9E]`} style={{ left: left, top: top }}>
      <p>{code}</p>
    </div>
  );
};

export default Facility;
