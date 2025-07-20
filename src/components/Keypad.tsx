import { useVendingMachineStore } from "../store/vendingMachineStore";

const Keypad = () => {
  // Define the layout of the keypad buttons
  const keys = ["1", "2", "3", "A", "B", "C"];
  const onKeyPress = useVendingMachineStore((state) => state.handleKeypadPress);
  const onBuy = useVendingMachineStore((state) => state.buyDrink);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="grid grid-cols-3 gap-2 p-2 bg-gray-700 rounded-lg shadow-inner">
        {keys.map((key) => (
          <button
            key={key}
            className="
              bg-gray-600 hover:bg-gray-500 active:bg-gray-700
              text-white font-bold text-xl
              rounded-md w-16 h-16 flex items-center justify-center
              shadow-md transition-colors duration-200
            "
            onClick={() => onKeyPress(key)}
          >
            {key}
          </button>
        ))}
        {/* Clear Button */}
        <button
          className="
            col-span-1
            bg-red-600 hover:bg-red-500 active:bg-red-700
            text-white font-bold text-xl
            rounded-md h-16 flex items-center justify-center
            shadow-md transition-colors duration-200
          "
          onClick={() => onKeyPress("Clear")}
        >
          Clear
        </button>
        {/* Buy Button */}
        <button
          className="
            col-span-2
            !bg-green-600 !hover:bg-green-500 active:bg-green-700
            text-white font-bold text-xl
            rounded-md h-16 flex items-center justify-center
            shadow-md transition-colors duration-200
          "
          onClick={onBuy}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Keypad;
