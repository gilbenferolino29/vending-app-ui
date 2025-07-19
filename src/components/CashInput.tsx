import { useVendingMachineStore } from "../store/vendingMachineStore";

const CashInput = () => {
  // Define the cash bill denominations available (e.g., Philippine Pesos)
  const cashDenominations = [20, 50, 100, 200, 500, 1000]; // Example denominations
  const onInsertCash = useVendingMachineStore((state) => state.insertCash);

  return (
    <div className="bg-gray-700 p-4 rounded-md w-full text-center text-sm text-gray-400 shadow-inner mt-4">
      <div className="font-semibold text-lg text-white mb-3">Insert Bills</div>
      <div className="grid grid-cols-3 gap-2">
        {cashDenominations.map((amount) => (
          <button
            key={amount}
            onClick={() => onInsertCash(amount)}
            className="
              bg-gray-600 hover:bg-gray-500 active:bg-gray-800
              text-white font-bold
              rounded-md w-full h-12 flex items-center justify-center
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
        Bill Acceptor Slot
      </div>
    </div>
  );
};

export default CashInput;
