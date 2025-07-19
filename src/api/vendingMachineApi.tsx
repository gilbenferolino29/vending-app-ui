import type { Drink } from "../types";

// Vite exposes environment variables on import.meta.env
// Only variables prefixed with VITE_ are exposed to client-side code.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
    "VITE_API_BASE_URL is not defined in the environment. Please check your .env file."
  );
}

/**
 * Fetches the current inventory of drinks from the vending machine backend.
 * @returns A promise that resolves to an array of Drink objects.
 * @throws Error if the API call fails or returns a non-OK status.
 */
export const fetchInventory = async (): Promise<{
  drinks: Drink[];
  coins: number;
  cash: number;
}> => {
  if (!API_BASE_URL) {
    throw new Error("API Base URL is not configured. Cannot fetch inventory.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/inventory`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error in fetchInventory API call:", error);
    throw new Error(`Failed to fetch inventory: ${error.message}`);
  }
};

/**
 * Attempts to purchase a drink from the vending machine.
 * @param slot The slot ID of the drink to purchase (e.g., "A1").
 * @param amount The total amount of money inserted by the user.
 * @returns A promise that resolves to an object containing the purchased item and change.
 * @throws Error if the purchase fails (e.g., insufficient funds, item out of stock, invalid slot).
 */
export const buyDrink = async (
  slot: string,
  payment: {
    coins: number;
    cash: number;
  }
): Promise<{ purchasedDrink: Drink; change: number }> => {
  if (!API_BASE_URL) {
    throw new Error("API Base URL is not configured. Cannot buy drink.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slot, payment }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error in buyProduct API call:", error);
    // Re-throw with a more generic message if needed, or specific error parsing
    throw new Error(`Purchase failed: ${error.message}`);
  }
};

export const refillDrink = async (
  slot: string
): Promise<{ message: string; newQuantity?: number }> => {
  if (!API_BASE_URL) {
    throw new Error("API Base URL is not configured. Cannot refill drink.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/refill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slot }), // Sending the slot in the request body
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! Status: ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error("Error in refillDrink API call:", error);
    throw new Error(`Failed to refill drink: ${error.message}`);
  }
};
