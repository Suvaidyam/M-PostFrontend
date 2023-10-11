
import Router from './Components/Router/Router';
import Context from './Context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <>
  
   
<Context>

 <Router/>
 <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />

</Context>


  
   </>
  );
}

export default App;
