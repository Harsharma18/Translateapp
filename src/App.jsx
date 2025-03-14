import { useState } from "react";
import Translatorapp from "./components/Translatorapp";
import Translatorstart from "./components/Translatorstart";

function App() {
  const [showtranslateapp,setShowtranslateapp] = useState(false);
   function opentransapp(){
    setShowtranslateapp(true);
   }
   function closetransapp(){
    setShowtranslateapp(false);
   }
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#090c08] via-[#1e3a5f] to-[#3a97a7] flex justify-center items-center p-4">
      <div className="w-[90%] max-w-lg min-h-[500px] sm:h-[600px] rounded-xl shadow-2xl shadow-gray-900 bg-white/10 backdrop-blur-md flex flex-col items-center p-6 transition-all duration-500">
       
        {
          showtranslateapp ? <Translatorapp onClose={closetransapp}/> :  <Translatorstart onStart={opentransapp} />
        }
       

         
        
      </div>
    </div>
  );
}

export default App;
