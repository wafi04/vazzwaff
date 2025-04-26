"use client"
import { useEffect, useState } from 'react';
import socketClient from '@/lib/websocket';

export default function Page() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastPong, setLastPong] = useState<string | null>(null);
  
  useEffect(() => {
    const socket = socketClient.getSocket();
    
    if (!socket) return;
    
    setIsConnected(socketClient.isSocketConnected());
    
    const connectHandler = () => {
      setIsConnected(true);
    };
    
    const disconnectHandler = () => {
      setIsConnected(false);
    };
    
    const pongHandler = (data: { timestamp: string }) => {
      setLastPong(data.timestamp);
    };
    
    socket.on('connect', connectHandler);
    socket.on('disconnect', disconnectHandler);
    socket.on('server:pong', pongHandler);
    
    // Clean up
    return () => {
      socket.off('connect', connectHandler);
      socket.off('disconnect', disconnectHandler);
      socket.off('server:pong', pongHandler);
    };
  }, []);
  
  const handlePingClick = () => {
    const socket = socketClient.getSocket();
    if (socket) {
      socket.emit('client:ping');
    }
  };
  
  return (
    <div className="socket-status">
      <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
        {isConnected ? 'Connected to server' : 'Disconnected from server'}
      </div>
      
      {lastPong && (
        <div className="last-pong">
          Last server response: {new Date(lastPong).toLocaleTimeString()}
        </div>
      )}
      
      <button onClick={handlePingClick} disabled={!isConnected}>
        Ping Server
      </button>
    </div>
  );
}
