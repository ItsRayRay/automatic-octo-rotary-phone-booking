"use client";

import { Range } from "react-date-range";
import { useState, useCallback } from "react";
import ReactConfetti from "react-confetti";

import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = useCallback(() => {
    onSubmit();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 10000); // 10 seconds
  }, [onSubmit]);

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden relative">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.5}
          initialVelocityY={20}
        />
      )}
    </div>
  );
};

export default ListingReservation;
