import { create } from "zustand";
import type { Drink } from "../types";
import {
  fetchInventory,
  buyDrink as apiBuyDrink,
  refillDrink as apiRefillDrink,
} from "../api/vendingMachineApi";

interface VendingMachineState {
  inventory: Drink[];
  isLoadingDrinks: boolean;
  drinksError: string | null;

  machineBalance: { coins: number; cash: number };
  isLoadingBalance: boolean;
  balanceError: string | null;

  selectedSlot: string | null;
  keypadInput: string;
  currentCustomerPayment: number;
  currentCustomerPaymentCash: number;
  currentCustomerPaymentCoins: number;
  selectedDrinkPrice: number | null;

  currentMessage: string;
  dispensedProduct: Drink | null;
  returnedChange: number;
  ejectedAmount: number;

  fetchInitialData: () => Promise<void>;
  resetCustomerTransaction: () => void;
  selectSlot: (slot: string) => void;
  handleKeypadPress: (key: string) => void;
  insertCoin: (amount: number) => void;
  insertCash: (amount: number) => void;
  ejectMoney: () => void;
  buyDrink: () => Promise<void>;
  refillDrink: (slot: string) => Promise<void>;
  setMessage: (message: string) => void;
}

export const useVendingMachineStore = create<VendingMachineState>(
  (set, get) => ({
    inventory: [],
    isLoadingDrinks: true,
    drinksError: null,

    machineBalance: { coins: 0, cash: 0 },
    isLoadingBalance: true,
    balanceError: null,

    selectedSlot: null,
    keypadInput: "",
    currentCustomerPayment: 0,
    currentCustomerPaymentCash: 0,
    currentCustomerPaymentCoins: 0,
    selectedDrinkPrice: null,

    currentMessage: "Welcome! Please select a drink or insert money.",
    dispensedProduct: null,
    returnedChange: 0,
    ejectedAmount: 0,

    fetchInitialData: async () => {
      set({
        isLoadingDrinks: true,
        drinksError: null,
        isLoadingBalance: true,
        balanceError: null,
      });
      try {
        const [inventoryData] = await Promise.all([fetchInventory()]);
        set({
          inventory: inventoryData.drinks,
          machineBalance: {
            coins: inventoryData.coins,
            cash: inventoryData.cash,
          },
          isLoadingDrinks: false,
          isLoadingBalance: false,
        });
      } catch (err: any) {
        console.error("Error fetching initial data:", err);
        set({
          drinksError: err.message || "Failed to load drinks.",
          balanceError: err.message || "Failed to load machine balance.",
          isLoadingDrinks: false,
          isLoadingBalance: false,
          currentMessage: `Error: ${err.message || "Failed to load data."}`,
        });
      }
    },

    resetCustomerTransaction: () => {
      set({
        selectedSlot: null,
        keypadInput: "",
        currentCustomerPayment: 0,
        currentCustomerPaymentCash: 0,
        currentCustomerPaymentCoins: 0,
        selectedDrinkPrice: null,
        dispensedProduct: null,
        returnedChange: 0,
        ejectedAmount: 0,
      });
    },

    selectSlot: (slot: string) => {
      const drink = get().inventory.find((d) => d.slot === slot);
      set({
        selectedSlot: slot,
        keypadInput: slot,
        selectedDrinkPrice: drink?.price || null,
        currentMessage: drink
          ? `Selected: ${slot}. Price: PHP ${drink.price.toFixed(2)}.`
          : `Selected: ${slot}. Item not found.`,
      });
    },

    handleKeypadPress: (key: string) => {
      set({ dispensedProduct: null, returnedChange: 0, ejectedAmount: 0 });

      if (key === "Clear") {
        set({
          currentMessage:
            "Input cleared. Please select a drink or insert money.",
        });
        return;
      }

      const currentKeypadInput = get().keypadInput;
      if (currentKeypadInput.length < 2) {
        const newKeypadInput = currentKeypadInput + key;
        const drink = get().inventory.find((d) => d.slot === newKeypadInput);

        set({
          keypadInput: newKeypadInput,
          selectedDrinkPrice: drink?.price || null,
          currentMessage:
            newKeypadInput.length === 2
              ? drink
                ? `Selected: ${newKeypadInput}. Price: PHP ${drink.price.toFixed(
                    2
                  )}.`
                : `Selected: ${newKeypadInput}. Item not found.`
              : `Keypad input: ${newKeypadInput}`,
        });
      } else {
        set({ currentMessage: "Max 2 characters for slot." });
      }
    },

    insertCoin: (amount: number) => {
      const newTotal = get().currentCustomerPayment + amount;
      const newTotalCoins = get().currentCustomerPaymentCoins + amount;
      set({
        currentCustomerPayment: newTotal,
        currentCustomerPaymentCoins: newTotalCoins,
        dispensedProduct: null,
        returnedChange: 0,
        ejectedAmount: 0,
        selectedDrinkPrice: null,
        currentMessage: `Inserted PHP ${amount.toFixed(
          2
        )}. Total: PHP ${newTotal.toFixed(2)}`,
      });
    },

    insertCash: (amount: number) => {
      const newTotal = get().currentCustomerPayment + amount;
      const newTotalCash = get().currentCustomerPaymentCash + amount;
      set({
        currentCustomerPayment: newTotal,
        currentCustomerPaymentCash: newTotalCash,
        dispensedProduct: null,
        returnedChange: 0,
        ejectedAmount: 0,
        selectedDrinkPrice: null,
        currentMessage: `Inserted PHP ${amount.toFixed(
          2
        )} bill. Total: PHP ${newTotal.toFixed(2)}`,
      });
    },

    ejectMoney: () => {
      const amountToEject = get().currentCustomerPayment;
      if (amountToEject > 0) {
        set({
          ejectedAmount: amountToEject,
          currentCustomerPayment: 0,
          currentCustomerPaymentCash: 0,
          currentCustomerPaymentCoins: 0,
          selectedSlot: null,
          keypadInput: "",
          currentMessage: `Returning PHP ${amountToEject.toFixed(
            2
          )}. Transaction cancelled.`,
        });
      } else {
        set({ currentMessage: "No money to return." });
      }
    },

    buyDrink: async () => {
      const {
        keypadInput,
        currentCustomerPayment,
        currentCustomerPaymentCash,
        currentCustomerPaymentCoins,
        resetCustomerTransaction,
      } = get();
      set({ dispensedProduct: null, returnedChange: 0, ejectedAmount: 0 });

      if (!keypadInput) {
        set({ currentMessage: "Please enter a slot or select a drink." });
        return;
      }
      if (currentCustomerPayment <= 0) {
        set({ currentMessage: "Please insert money first!" });
        return;
      }

      set({ currentMessage: `Processing purchase for '${keypadInput}'...` });

      try {
        const result = await apiBuyDrink(keypadInput, {
          totalPayment: currentCustomerPayment,
          coins: currentCustomerPaymentCoins,
          cash: currentCustomerPaymentCash,
        });

        // Update state with purchase results
        set({
          dispensedProduct: result.purchasedDrink,
          returnedChange: result.change,
          currentMessage: `Enjoy your ${
            result.purchasedDrink.name
          }! Change: PHP ${result.change.toFixed(2)}.`,
        });

        // Refetch initial data to update inventory and balance
        await get().fetchInitialData();

        // Reset customer transaction after a delay, allowing the user to see the purchase result.
        setTimeout(() => {
          resetCustomerTransaction();
          set({
            currentMessage:
              "Thank you! Please make a new selection or insert coins.",
          });
        }, 2000);
      } catch (error: any) {
        set({ currentMessage: `Error: ${error.message}` });

        console.error("Purchase error:", error);
      }
    },

    refillDrink: async (slot: string) => {
      set({ currentMessage: `Attempting to refill slot ${slot}...` });
      try {
        const result = await apiRefillDrink(slot);
        set({ currentMessage: result.message });
        await get().fetchInitialData();
      } catch (error: any) {
        set({ currentMessage: `Refill Error: ${error.message}` });
        console.error("Refill drink error:", error);
      }
    },

    setMessage: (message: string) => {
      set({ currentMessage: message });
    },
  })
);
