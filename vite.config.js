import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Employee-Attendance-Mockup-App/",
  plugins: [react()],
});
