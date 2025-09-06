import { Deck as DeckModel, Seat as SeatModel, Facility as FacilityModel } from "@/models/response/SeatMapDisplay";
import { FC } from "react";
import Seat from "./Seat";
import Facility from "./Facility";
import Exit from "./Exit";
import Wing from "./Wing";

const Deck: FC<{ deck: DeckModel }> = ({ deck }) => {
  const width = deck.deckConfiguration.width;
  const length = deck.deckConfiguration.length;
  const seatList = deck.seats;
  const facilities = deck.facilities;
  const wingStart = deck.deckConfiguration.startWingsRow;
  const wingEnd = deck.deckConfiguration.endWingsRow;
  const exitRows = deck.deckConfiguration.exitRowsX;

  return (
    <div
      id="deck"
      className="absolute border-2 border-black"
      style={{ width: `${width * 2.2}em`, height: `${length * 2.1}em` }}
    >
      {displayWings(wingStart, wingEnd, width)}
      {displaySeats(seatList)}
      {facilities ? displayFacilities(facilities) : ""}
      {exitRows ? displayExits(exitRows, width) : ""}
    </div>
  );
};

const displaySeats = (seatList: SeatModel[]) => {
  return (
    <div>
      {seatList.map((seat, index) => (
        <Seat
          number={seat.number}
          x={seat.coordinates.x}
          y={seat.coordinates.y}
          availability={seat.travelerPricing[0].seatAvailabilityStatus}
          cabin={seat.cabin}
          price={seat.travelerPricing[0].price?.total}
          charCodes={seat.characteristicsCodes}
          key={index}
        />
      ))}
    </div>
  );
};

const displayFacilities = (facilityList: FacilityModel[]) => {
  return (
    <div id="facilities" className="h-[1.8em] w-[1.8em]">
      {facilityList.map((facility, index) => (
        <Facility code={facility.code} x={facility.coordinates.x} y={facility.coordinates.y} key={index} />
      ))}
    </div>
  );
};

const displayExits = (exitRows: number[], width: number) => {
  return (
    <div>
      {exitRows.map((row, index) => (
        <Exit row={row} width={width} key={index} />
      ))}
    </div>
  );
};

const displayWings = (start: number, end: number, planeWidth: number) => {
  return (
    <>
      <Wing orientation="left" start={start} end={end} planeWidth={planeWidth} />
      <Wing orientation="right" start={start} end={end} planeWidth={planeWidth} />
    </>
  );
};

export default Deck;
