# Vending Machine Simulator UI

(Assuming this image exists in your project root)

A modern and interactive Vending Machine user interface built with React, TypeScript, and Zustand, designed to simulate typical vending machine operations. This UI is intended to connect with a separate backend API to manage inventory, transactions, and machine balance.

## Table of Contents

Features

### Technologies Used

### Getting Started

### Prerequisites

### Installation

### Running the UI (Development Mode)

### Running with Docker

### Usage

### Project Structure

Contributing

License

## Features

Drink Selection: Browse available drinks and select desired items by slot code.

Money Insertion: Insert coins and cash to make payments.

Purchase & Change: Simulate purchasing a drink and receiving change.

Display Screen: Clear messages for user interaction, current payment, and selected item details.

Keypad Interaction: Use a virtual keypad to input slot codes.

Money Ejection: Option to eject inserted money and cancel transactions.

Machine Balance View: Display of current coin and cash balance within the machine (for maintenance insight).

Stock Refill: A visible button on drink slots when stock is low, allowing for quick refilling (assumes backend integration).

Loading & Error States: Clear indications for data fetching and API errors.

Responsive Design: (If applicable) Adapts to different screen sizes.

## Technologies Used

## Frontend:

React

TypeScript

Zustand for state management

Tailwind CSS for styling

Containerization:

Docker

Nginx for serving static files in production container

##Getting Started
Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (LTS version recommended)

npm (comes with Node.js) or Yarn

Docker Desktop (or Docker Engine)

Backend API: This UI expects a separate backend API running to handle vending machine logic (inventory, transactions, etc.). Make sure your backend is running and accessible (e.g., at http://localhost:3001 or whatever URL your vendingMachineApi.ts is configured to use).

## Installation

Clone the repository:

Bash

git clone <your-repo-url>
cd vending-machine-ui
Install dependencies:

Bash

npm install

# OR

yarn install
Running the UI (Development Mode)
To run the UI in development mode with hot-reloading:

Bash

npm start

# OR

yarn start
The application will typically open in your browser at http://localhost:3000. Remember that it needs the backend API to be running for full functionality.

# Usage

Select a Drink: Click on a drink slot or use the keypad to enter a slot code (e.g., A1). The price will be displayed.

Insert Money: Use the coin and cash input sections to add money.

Buy Drink: Once you've inserted enough money, click the "Buy Drink" button.

Receive Change: Any excess money will be returned as change.

Eject Money: At any time before buying, you can click "Eject Money" to get your inserted amount back.

Refill (Maintenance): If a drink slot shows Stock: 0, 1, or 2, a "Refill" button will appear. Click it to simulate refilling that particular drink slot.

# Project Structure

.
├── public/ # Static assets (like drink-placeholder.png)
├── src/
│ ├── api/ # API service calls (e.g., vendingMachineApi.ts)
│ ├── components/ # Reusable React components (DisplayScreen, DrinksDisplay, Keypad, etc.)
│ ├── store/ # Zustand store definition (vendingMachineStore.ts)
│ ├── types/ # TypeScript type definitions
│ ├── App.tsx # Main application component
│ └── index.tsx # React app entry point
├── Dockerfile # Docker build instructions for the UI
├── nginx.conf # Nginx configuration for serving the UI
├── .dockerignore # Files/folders to ignore during Docker build
├── package.json # Project dependencies and scripts
├── README.md # This file
└── tsconfig.json # TypeScript configuration
└── ...

# Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

# License

This project is open-sourced under the MIT License.
