"use client";
import React, { useState } from "react";

interface IFormTextInputProps {
  onSubmit: (address: string) => unknown;
}

const FormTextInput = (props: IFormTextInputProps) => {
  const { onSubmit } = props;

  const [address, setAddress] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form className="flex flex-col gap-3 my-10" onSubmit={handleFormSubmit}>
      <div className="bg-gray-700/50 rounded-lg text-sm mx-2 mb-2 md:text-lg">
        <input
          type="text"
          placeholder="Enter the address"
          className="p-4 bg-transparent focus:outline-none w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-center w-full">
        <button
          type="submit"
          className="p-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-lg text-lg w-[24rem]"
        >
          Search Transactions
        </button>
      </div>
    </form>
  );
};

export default FormTextInput;
