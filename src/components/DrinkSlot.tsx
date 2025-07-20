import React from "react";
import type { Drink } from "../types";
import { useVendingMachineStore } from "../store/vendingMachineStore";

// Define props for the DrinkSlot component
interface DrinkSlotProps {
  drink: Drink; // The drink object to display
  onSelect: (slot: string) => void; // Function to call when this slot is clicked
  isSelected: boolean; // Boolean to indicate if this slot is currently selected
}

const DrinkSlot: React.FC<DrinkSlotProps> = ({
  drink,
  onSelect,
  isSelected,
}) => {
  const isOutOfStock = drink.quantity === 0;
  const isStockForRefill = drink.quantity <= 3;
  const stockRefill = useVendingMachineStore((state) => state.refillDrink);

  // Conditional styling based on stock status and selection
  const slotClasses = `
    relative
    bg-gray-700          /* Dark background for the slot */
    rounded-lg p-4       /* Rounded corners and padding */
    text-center text-white /* Centered text, white color */
    flex flex-col items-center justify-between /* Flexbox for internal layout */
    cursor-pointer       /* Indicates it's clickable */
    transition-all duration-200 /* Smooth transitions for hover/selection effects */
    shadow-md            /* Adds a subtle shadow */
    ${
      isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
    } /* Dims if out of stock, otherwise hover effect */
    ${
      isSelected
        ? "border-4 border-green-400 transform scale-105"
        : "border-4 border-transparent"
    } /* Green border and slight scale if selected */
  `;

  return (
    <div
      className={slotClasses}
      onClick={() => !isOutOfStock && onSelect(drink.slot)} // Call onSelect only if not out of stock
    >
      <div className="text-xl font-bold mb-2">{drink.slot}</div>{" "}
      {/* Displays "A1", "B2", etc. */}
      <div className="text-lg font-semibold">{drink.name}</div>
      <div className="text-md">PHP {drink.price.toFixed(2)}</div>{" "}
      {/* Display price formatted */}
      <div
        className={`text-sm mt-1 ${
          isOutOfStock ? "text-red-400 font-bold" : "text-gray-300"
        }`}
      >
        {isOutOfStock ? "Out of Stock" : `Stock: ${drink.quantity}`}
      </div>
      {isStockForRefill && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            stockRefill(drink.slot);
          }}
          className="
            mt-2 px-3 py-1 text-xs
            bg-blue-600 hover:bg-blue-700 active:bg-blue-800
            text-white font-semibold rounded
            transition-colors duration-200
          "
        >
          Refill
        </button>
      )}
      {/* Optional: Visual checkmark when selected */}
      {isSelected && (
        <div className="absolute top-1 right-1 text-green-400 text-3xl">✓</div>
      )}
    </div>
  );
};

export default DrinkSlot;
