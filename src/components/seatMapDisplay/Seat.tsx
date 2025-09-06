import { SeatAvailabilityStatus } from "@/models/response/SeatMapDisplay";
import { FC, CSSProperties } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setSelectedSeat } from "@/store/flightSearch/seatMapSlice";

interface SeatProps {
  number: string;
  x: number;
  y: number;
  availability: SeatAvailabilityStatus;
  cabin: string;
  price: string;
  charCodes: string[];
}

const Seat: FC<SeatProps> = ({ number, x, y, availability, cabin, price, charCodes }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedSeat, bookedSeats, seatMapDictionaries } = useSelector((state: RootState) => ({
    selectedSeat: state.seatMap.selectedSeat,
    bookedSeats: state.seatMap.bookedSeats,
    seatMapDictionaries: state.seatMap.seatMapDictionaries,
  }));

  let color = "";

  if (availability === SeatAvailabilityStatus.AVAILABLE) {
    if (number === selectedSeat || bookedSeats.includes(number)) {
      color = "gray";
    } else {
      color = "#499167";
    }
  } else {
    color = "#FE5F55";
  }

  const style: CSSProperties = {
    position: "absolute",
    left: `${y * 2}em`,
    top: `${x * 2}em`,
    backgroundColor: color,
    color: "white",
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="h-[1.8em] w-[1.8em] rounded-sm" style={style}>
          {availability === SeatAvailabilityStatus.AVAILABLE ? (
            <button className="text-[0.75em]" onClick={() => dispatch(setSelectedSeat(number))}>
              {number}
            </button>
          ) : (
            <p className="text-[0.75em]">{number}</p>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="">
        <section className="z-[10000] flex w-full justify-between">
          <p>Seat {number}</p>
          {price ? <p>${price}</p> : ""}
        </section>
        <hr />
        <section>
          {cabin}
          {seatMapDictionaries.seatCharacteristics != undefined
            ? charCodes.map((code, index) => <p key={index}>-{seatMapDictionaries.seatCharacteristics![code]}</p>)
            : ""}
        </section>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Seat;
