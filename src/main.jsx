import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // Import createRoot for React 18
import './index.css'
import VirtualizedDropdown from './VirtualDropdown'

const root = createRoot(document.getElementById('root')) // Create root using createRoot
root.render(
  <StrictMode>
    <VirtualizedDropdown />
  </StrictMode>
)
