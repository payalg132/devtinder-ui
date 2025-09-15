import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

// ✅ Connect to backend (adjust URL if using EC2/ngrok etc.)
export const createSocketConnection = () => {
    return io(BASE_URL);
}