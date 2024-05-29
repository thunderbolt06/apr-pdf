import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Editor from './pages/editor/Editor'




function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route>
        <Route path="" element={<Editor/>} />
        <Route path="/editor" element={<Editor/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App
