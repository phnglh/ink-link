import type { Server } from "socket.io";

export const registerSocketEvent = (io: Server) => {
	io.on("connection", (socket) => {
		console.log("Client connection:", socket.id);

		socket.on("message", (data) => {
			console.log("Received:", data);
			io.emit("message", data);
		});
	});
};
