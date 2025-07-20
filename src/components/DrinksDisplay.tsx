import DrinkSlot from "./DrinkSlot";
import { fetchInventory } from "../api/vendingMachineApi";
import { useVendingMachineStore } from "../store/vendingMachineStore";


const DrinksDisplay = () => {
  const onSelectSlot = useVendingMachineStore((state) => state.selectSlot);
  const selectedSlot = useVendingMachineStore((state) => state.selectedSlot);
  const error = useVendingMachineStore((state) => state.drinksError);
  const drinks = useVendingMachineStore((state) => state.inventory);
  const isLoading = useVendingMachineStore((state) => state.isLoadingDrinks);

  if (isLoading) {
    return (
      <div className="col-span-4 text-white text-center text-xl p-4 flex items-center justify-center h-full">
        Loading drinks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-4 text-red-400 text-center text-xl p-4 flex flex-col items-center justify-center h-full">
        Error: {error}
        <button
          onClick={fetchInventory} // Allow user to retry fetching
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-base font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  if (drinks.length === 0) {
    return (
      <div className="col-span-4 text-gray-400 text-center text-xl p-4 flex items-center justify-center h-full">
        No drinks available in the machine.
      </div>
    );
  }

  return (
    <div className="bg-gray-700 p-6 grid grid-cols-4 gap-4 overflow-auto">
      <div className="col-span-4 text-white text-center text-2xl font-bold mb-4">
        Drinks Selection
      </div>
      {drinks.map((drink) => (
        <DrinkSlot
          key={drink.slot}
          drink={drink}
          onSelect={onSelectSlot}
          isSelected={selectedSlot === drink.slot}
        />
      ))}
    </div>
  );
};

export default DrinksDisplay;
