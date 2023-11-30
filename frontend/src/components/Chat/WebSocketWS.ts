import { useEffect, useRef } from 'react';

const useWebSocket = (serverUrl: string) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(serverUrl);

    socketRef.current.onmessage = (event) => {
      console.log('Mensagem recebida:', event.data);
    };

    socketRef.current.onopen = (event) => {
      console.log("conectou no servidor ws")
    }

    return () => {
      socketRef.current?.close();
    };
  }, [serverUrl]);

  const sendMessageWS = (data: string) => {
    console.log("enviando mensagem socket ", JSON.stringify({ message: data }))
    socketRef.current?.send(JSON.stringify({ message: data }));
  };

  return { sendMessageWS };
};


export { useWebSocket }