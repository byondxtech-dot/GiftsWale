
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import{ HomeProvider} from './Context/HomeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
<HomeProvider>
  
   
   <App />

</HomeProvider>
 </BrowserRouter>

   
 
)
