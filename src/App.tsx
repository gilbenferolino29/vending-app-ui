import { useEffect } from "react"; // Import useEffect
import "./index.css"; // Ensure Tailwind CSS is imported
import DrinksDisplay from "./components/DrinksDisplay";
import Keypad from "./components/Keypad";
import DisplayScreen from "./components/DisplayScreen";
import CoinInput from "./components/CoinInput";
import CashInput from "./components/CashInput";
import { useVendingMachineStore } from "./store/vendingMachineStore";

function App() {
  // Select all necessary state and actions from your Zustand store
  const fetchInitialData = useVendingMachineStore(
    (state) => state.fetchInitialData
  );
  const dispensedProduct = useVendingMachineStore(
    (state) => state.dispensedProduct
  );
  const returnedChange = useVendingMachineStore(
    (state) => state.returnedChange
  );
  const ejectMoney = useVendingMachineStore((state) => state.ejectMoney);
  const ejectedAmount = useVendingMachineStore((state) => state.ejectedAmount);

  // Effect to load initial data when the App component mounts
  useEffect(() => {
    // Only fetch if data hasn't been loaded or there was an error.
    // This prevents re-fetching on every re-render if data is already present.
    // Your store's fetchInitialData also handles its own loading/error states internally.
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <div className="min-h-screen w-[100vw] bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4">
      {/* Main Vending Machine Container */}
      <div
        className="
          relative
          w-full max-w-[1200px] h-[90vh] min-h-[600px]
          bg-gray-800 rounded-lg shadow-2xl
          border-8 border-gray-900
          flex flex-col
          overflow-hidden
          gap-2
        "
      >
        {/* Top Section: Main Content (Drinks on Left, Controls on Right) */}
        <div className="flex-grow grid grid-cols-[3fr_2fr] gap-4 p-4 overflow-auto">
          {/* Left Column: Drink Display */}
          <div className="bg-gray-700 rounded-lg p-2 overflow-hidden flex flex-col">
            <DrinksDisplay />
          </div>

          {/* Right Column: Controls, Keypad, Money Input, Display */}
          <div className="flex flex-col items-center justify-between space-y-4 p-2 bg-gray-900 rounded-lg mb-0">
            {/* Display Screen */}
            <DisplayScreen
            // Use store state
            // You might also want to pass selectedDrinkPrice to DisplayScreen
            // selectedDrinkPrice={selectedDrinkPrice}
            // dispensedProduct={dispensedProduct}
            // returnedChange={returnedChange}
            />

            {/* Keypad */}
            <Keypad />

            {/* Money Inputs (Coins & Cash) - Grouped for better spacing */}
            <div className="w-full flex-grow flex flex-col justify-start items-center pt-4 overflow-auto">
              <CoinInput />
              <CashInput />
            </div>

            {/* Eject Money Button (at the bottom of controls section) */}
            <button
              onClick={ejectMoney}
              className="
                bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700
                text-white font-bold text-lg
                rounded-md w-full py-3 mt-auto
                shadow-md transition-colors duration-200
              "
            >
              Eject Money
            </button>
          </div>
        </div>

        {/* Dispenser Tray (Spans both columns, at the very bottom) */}
        <div className="bg-gray-700 p-4 rounded-b-lg border-t-4 border-gray-600 flex items-center space-y-4 justify-center min-h-[80px]">
          {dispensedProduct ? (
            <span className="text-green-400 text-lg font-bold">
              Dispensed: {dispensedProduct.name}
            </span>
          ) : (
            <span className="text-gray-400 text-lg">Dispenser Tray</span>
          )}
        </div>

        <div className="bg-gray-700 p-3 rounded-md w-full text-center text-sm text-gray-400 border-t-4 border-gray-600 flex items-center justify-center min-h-[60px]">
          Change Return
          {returnedChange > 0 && (
            <div className="ml-4 text-green-400 font-bold text-lg">
              PHP {returnedChange.toFixed(2)} Returned!
            </div>
          )}
          {ejectedAmount > 0 && (
            <div className="ml-4 text-yellow-400 font-bold text-lg">
              PHP {ejectedAmount.toFixed(2)} Ejected!
            </div>
          )}
          <div className="w-full h-8 bg-gray-600 rounded-sm mt-2 border-2 border-gray-500 hidden"></div>{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
