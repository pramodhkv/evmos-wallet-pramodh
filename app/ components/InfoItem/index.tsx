import React from "react";

interface IInfoItemProps {
  label: string;
  value: string;
  extraInfo?: string;
  className?: string;
}

const InfoItem = (props: IInfoItemProps) => {
  const { label, value, extraInfo = "", className = "" } = props;

  return (
    <div className="flex items-center gap-8 my-4">
      <span className="font-bold w-44 text-lg">{label}</span>
      <span className={className}>
        {value}
        {extraInfo ? <span className="text-red-500"> {extraInfo}</span> : null}
      </span>
    </div>
  );
};

export default InfoItem;
