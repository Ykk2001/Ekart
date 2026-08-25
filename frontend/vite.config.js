// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],//react is js library and tailwindcss is a css framework which we are connecting to the vite
//   resolve:{
//     alias:{
//       "@":path.resolve(__dirname,"./src")
//     }
//   }
// })  ---------> first code 

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});;//-------->second code after error (failed to load the component  while importing the component and function beacuse of type module in package.json )
