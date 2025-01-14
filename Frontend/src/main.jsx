 
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { NewsStore } from './Store/store.js';
 

createRoot(document.getElementById('root')).render(
   
    <BrowserRouter>
      <Provider store={NewsStore}>
       
          <App />
       
      </Provider>
    </BrowserRouter>
);
