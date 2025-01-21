import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainAuthPage from './components/MainAuthPage.jsx'
import DashboardPage from './components/MainDashboard.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App/>}/>,
      <Route path='/auth' element={<MainAuthPage/>}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
    </>
    
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
