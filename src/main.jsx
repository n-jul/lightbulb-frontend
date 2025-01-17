import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AuthPage from './components/AuthPage.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App/>}/>,
      <Route path='/auth' element={<AuthPage/>}/>
    </>
    
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
