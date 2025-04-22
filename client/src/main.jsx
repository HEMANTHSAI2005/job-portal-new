// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import {AppContextProvider} from './context/AppContext'
// import { ClerkProvider } from '@clerk/clerk-react'


// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

// createRoot(document.getElementById('root')).render(
//   <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">

//   <BrowserRouter>
//   <AppContextProvider>
//         <App />
//   </AppContextProvider>
//   </BrowserRouter>

//   </ClerkProvider>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const FRONTEND_API = import.meta.env.VITE_CLERK_FRONTEND_API

if (!PUBLISHABLE_KEY || !FRONTEND_API) {
  throw new Error("Missing Clerk environment variables")
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY} 
    frontendApi={FRONTEND_API}
    afterSignOutUrl="/"
  >
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </ClerkProvider>
)
