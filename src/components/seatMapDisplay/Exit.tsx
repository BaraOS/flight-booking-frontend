import { FC, CSSProperties } from "react";

const Exit: FC<{ row: number; width: number }> = ({ row, width }) => {
  const styleLeft: CSSProperties = {
    position: "absolute",
    left: "-4.1em",
    top: `${row * 2}em`,
    backgroundColor: "#499167",
  };

  const styleRight: CSSProperties = {
    position: "absolute",
    left: `${width * 2}em`,
    top: `${row * 2}em`,
    backgroundColor: "#499167",
  };

  return (
    <div className="exit">
      <span style={styleLeft}>EXIT</span>
      <span style={styleRight}>EXIT</span>
    </div>
  );
};

export default Exit;
