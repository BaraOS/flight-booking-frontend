import { SeatMap as SeatMapModel } from "@/models/response/SeatMapDisplay";
import { FC } from "react";
import Deck from "./Deck";

const SeatMap: FC<{ data: SeatMapModel }> = ({ data }) => {
  return (
    <div className="relative flex-auto overflow-scroll rounded-lg border-2 border-primary">
      {data.decks.map((deck, i) => (
        <Deck deck={deck} key={i} />
      ))}
    </div>
  );
};

export default SeatMap;
