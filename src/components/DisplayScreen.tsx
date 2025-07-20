import { useVendingMachineStore } from "../store/vendingMachineStore";

const DisplayScreen = () => {
  const currentAmount = useVendingMachineStore(
    (state) => state.currentCustomerPayment
  );
  const machineBalance = useVendingMachineStore(
    (state) => state.machineBalance
  );
  const currentCoins = useVendingMachineStore(
    (state) => state.currentCustomerPaymentCoins
  );
  const currentCash = useVendingMachineStore(
    (state) => state.currentCustomerPaymentCash
  );
  const message = useVendingMachineStore((state) => state.currentMessage);
  const keypadInput = useVendingMachineStore((state) => state.keypadInput);
  return (
    <div className="flex flex-col items-center w-full h-fit ">
      {/* Amount Display */}
      <div className="bg-blue-900 text-green-400 text-right font-mono p-4 rounded-md w-full text-2xl shadow-inner border border-blue-700">
        <div className="text-amber-400 text-sm">
          <span>Machine Balance </span>
          <span>Coins: {machineBalance.coins} </span>
          <span>Cash: {machineBalance.cash}</span>
        </div>
        <span>PHP {currentAmount.toFixed(2)}</span>
        <div className="text-amber-400 text-sm">
          <span>Coins: {currentCoins} </span>
          <span>Cash: {currentCash}</span>
        </div>
      </div>
      {/* Message Display */}
      <div className="mt-2 text-white text-center text-sm w-full h-16 flex items-center justify-center p-2 rounded-md bg-gray-700">
        {message}
      </div>
      {/* Keypad Input Display */}
      <div className="bg-gray-700 text-white text-center text-2xl font-mono p-2 rounded-md w-full mt-2">
        {keypadInput || "_ _"}{" "}
        {/* Displays current keypad input, or placeholder */}
      </div>
    </div>
  );
};

export default DisplayScreen;
