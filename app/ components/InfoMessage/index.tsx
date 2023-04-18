import React from "react";

interface IInfoMessageProps {
  message: string;
  className?: string;
}

const InfoMessage = (props: IInfoMessageProps) => {
  const { message, className = "" } = props;
  return (
    <div className="flex items-center justify-center">
      <span className={className}>{message}</span>
    </div>
  );
};

export default InfoMessage;
