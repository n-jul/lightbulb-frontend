import './App.css'
import { NavLink } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          LIGHTBULB
        </h1>
        <p className="text-gray-600 mb-8">
          Illuminate your path to success
        </p>
        <NavLink 
          to="/auth"
          className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out shadow-sm"
        >
          Get Started
        </NavLink>
      </div>
    </div>
  )
}

export default App