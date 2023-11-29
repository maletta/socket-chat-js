import ChatRoom from './pages/ChatRoom/ChatRoom';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path=":roomId" element={<div>Room id</div>} />
          <Route index element={<ChatRoom />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
