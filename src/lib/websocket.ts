import { io, Socket } from "socket.io-client";

class SocketClient {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  
  constructor() {
    this.initialize();
  }
  
  private initialize() {
    this.socket = io("http://localhost:4000", {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    
    this.setupEventHandlers();
  }
  
  private setupEventHandlers() {
    if (!this.socket) return;
    
    this.socket.on("connect", () => {
      console.log("Connected to WebSocket Server");
      this.isConnected = true;
    });
    
    this.socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket Server");
      this.isConnected = false;
    });
    
    this.socket.on("server:ack", (data) => {
      console.log("Server acknowledgment:", data);
    });

    
    this.socket.on("server:pong", (data) => {
      console.log("Server pong received:", data);
    });
    
    setInterval(() => {
      if (this.isConnected) {
        this.socket?.emit("client:ping");
      } else {
        console.log("Not connected to server, attempting to reconnect...");
        this.socket?.connect();
      }
    }, 30000); 
  }
  
  public getSocket(): Socket | null {
    return this.socket;
  }
  
  public isSocketConnected(): boolean {
    return this.isConnected;
  }
  
  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const socketClient = new SocketClient();

export default socketClient;
