import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './accessibility/accessibility.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadingProvider } from './components/LoadingContext.jsx'
import { AuthProvider } from './components/AuthContext.jsx'
import { AccessibilityProvider } from './accessibility/AccessibilityContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <AccessibilityProvider>
            <App />
          </AccessibilityProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>,
)
