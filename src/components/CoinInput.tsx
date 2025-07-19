// src/components/CoinInput.tsx
import React from "react";

interface CoinInputProps {
  onInsertCoin: (amount: number) => void; // Function to call when a coin is inserted
}

const CoinInput: React.FC<CoinInputProps> = ({ onInsertCoin }) => {
  const coinDenominations = [5, 10, 20, 50, 100]; // Example Philippine Pesos denominations

  return (
    <div className="bg-gray-700 p-4 rounded-md w-full text-center text-sm text-gray-400 shadow-inner">
      <div className="font-semibold text-lg text-white mb-3">Insert Coins</div>
      <div className="grid grid-cols-3 gap-2">
        {coinDenominations.map((amount) => (
          <button
            key={amount}
            onClick={() => onInsertCoin(amount)}
            className="
              bg-gray-600 hover:bg-gray-500 active:bg-gray-800
              text-white font-bold
              rounded-full w-16 h-16 flex items-center justify-center
              shadow-md text-md
              transition-colors duration-200
              border-2 border-gray-500
            "
          >
            PHP {amount}
          </button>
        ))}
      </div>
      <div className="w-full h-8 bg-gray-600 rounded-sm mt-4 border-2 border-gray-500 flex items-center justify-center text-gray-400 text-xs">
        Coin Slot
      </div>
    </div>
  );
};

export default CoinInput;
