import { useState } from 'react'
import './App.css'
import DynamicForm from './DyanamicForms'
import { Button } from '@mui/material'
import Editor from './pages/editor/Editor'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ViewerPage from './pages/editor/components/Viewer'




function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/editor" element={<Editor/>} />
        <Route path="/viewer" element={<ViewerPage/>} />
        <Route path="/pdf.worker.js" element={<ViewerPage/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App
