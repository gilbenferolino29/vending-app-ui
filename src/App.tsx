// src/App.tsx
import { useState } from "react"; // Import useState
import "./index.css"; // Make sure your main CSS file is imported here

function App() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>(
    "Welcome! Please select a drink."
  );
  const [currentAmount, setCurrentAmount] = useState<number>(0); // Amount inserted by user

  // This will be fleshed out later when we integrate with actual drink data
  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
    setCurrentMessage(`Selected: ${slot}. Ready to purchase.`);
    // We'll update logic here later to show price, etc.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4">
      <div
        className="
          relative
          w-full max-w-4xl h-[80vh] min-h-[600px]
          bg-gray-800 rounded-lg shadow-2xl
          border-8 border-gray-900
          grid grid-rows-[3fr_1fr] grid-cols-1
          overflow-hidden
        "
      >
        {/* Top Section: Drink Display Area */}
        {/* This will later be replaced by the <DrinksDisplay /> component */}
        <div className="bg-gray-700 p-6 grid grid-cols-4 gap-4 overflow-auto">
          <div className="col-span-4 text-white text-center text-2xl font-bold mb-4">
            Drinks Selection
          </div>
          {/* Placeholder for drink slots */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`
                bg-gray-600 rounded-md p-4 text-center text-white
                flex flex-col items-center justify-center
                text-lg font-semibold h-32 cursor-pointer
                hover:bg-gray-500 transition-colors duration-200
                ${
                  selectedSlot === `A${(i % 2) + 1}` ||
                  selectedSlot === `B${(i % 2) + 1}`
                    ? "border-4 border-green-400 transform scale-105"
                    : "border-4 border-transparent"
                }
              `}
              onClick={() =>
                handleSelectSlot(
                  `${String.fromCharCode(65 + Math.floor(i / 2))}${(i % 2) + 1}`
                )
              }
            >
              Slot {String.fromCharCode(65 + Math.floor(i / 2))}
              {(i % 2) + 1}
              <span className="text-sm mt-1">PHP 25.00</span>
              <span className="text-xs text-gray-300">Stock: 10</span>
            </div>
          ))}
        </div>

        {/* Bottom Section: Controls & Dispenser */}
        <div className="bg-gray-900 p-6 grid grid-cols-3 gap-6 items-center">
          {/* Left Column: Display Screen & Coin Slot */}
          <div className="col-span-1 flex flex-col items-center justify-between h-full">
            <div className="bg-blue-900 text-green-400 text-right font-mono p-4 rounded-md w-full text-2xl shadow-inner border border-blue-700">
              PHP {currentAmount.toFixed(2)}
            </div>
            <div className="mt-2 text-white text-center text-sm w-full h-16 flex items-center justify-center p-2 rounded-md bg-gray-700">
              {currentMessage}
            </div>
            <div className="mt-4 bg-gray-700 p-3 rounded-md w-full text-center text-sm text-gray-400">
              Insert Coins
              <div className="w-full h-8 bg-gray-600 rounded-sm mt-2 border-2 border-gray-500"></div>
            </div>
          </div>

          {/* Middle Column: Keypad */}
          <div className="col-span-1 flex flex-col items-center">
            {/* This will later be replaced by the <Keypad /> component */}
            <div className="grid grid-cols-3 gap-2 p-2 bg-gray-700 rounded-lg">
              {["1", "2", "3", "A", "B", "C", "Clear"].map((key) => (
                <button
                  key={key}
                  className="
                    bg-gray-600 hover:bg-gray-500 active:bg-gray-700
                    text-white font-bold text-xl
                    rounded-md w-16 h-16 flex items-center justify-center
                    shadow-md
                    transition-colors duration-200
                  "
                >
                  {key}
                </button>
              ))}
              <button className="col-span-3 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-bold text-xl rounded-md h-16 shadow-md transition-colors duration-200">
                Buy
              </button>
            </div>
          </div>

          {/* Right Column: Dispenser Tray & Coin Return */}
          <div className="col-span-1 flex flex-col items-center justify-between h-full">
            <div className="bg-gray-700 p-3 rounded-md w-full text-center text-sm text-gray-400">
              Change Return
              <div className="w-full h-8 bg-gray-600 rounded-sm mt-2 border-2 border-gray-500"></div>
            </div>
            <div className="mt-4 bg-gray-700 p-4 rounded-md w-full h-32 flex items-center justify-center border-t-4 border-gray-600">
              <span className="text-gray-400 text-lg">Dispenser Tray</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
