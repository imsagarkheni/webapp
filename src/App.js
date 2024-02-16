import React from 'react'
import AllRoutes from './routes/AllRoutes';
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 
import { socket } from "./socket";

function App() {
  return (
    <div className='main min-h-screen w-full'>
      <React.Fragment>
        <AllRoutes />
      </React.Fragment>
    </div>
  );
}

export default App;
