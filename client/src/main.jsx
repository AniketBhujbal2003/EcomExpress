import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'


import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        // transition={Bounce}
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>,

)
