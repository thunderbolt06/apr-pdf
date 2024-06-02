import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Editor from './pages/editor/Editor'
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>
      <Route>
        <Route path="" element={<Editor/>} />
        <Route path="/editor" element={<Editor/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
