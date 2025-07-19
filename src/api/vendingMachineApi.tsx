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
export const fetchInventory = async (): Promise<{ drinks: Drink[] }> => {
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
