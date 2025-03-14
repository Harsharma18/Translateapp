import React, { useEffect, useRef, useState } from 'react';
import {languages} from "../languagesData";

function Translatorapp({onClose}) {
    const [selectlangfrom,setselectlangfrom] = useState("English");
    const [selectlangto,setselectlangto] = useState("Hindi");
    const [showlanguage,setshowlanguage] = useState(false);
    const [selectcurrlang,setselectcurrlang] = useState(false);
    const [inputText,setInputtext] = useState('');
    const [translateText,setTranslateText] = useState('')
    const dropdownRef = useRef(null);
    const [charcount,setcharcount] = useState(0);
    const maxWords = 200;
     function  handleinputchange(e){
        const value = e.target.value;
        if(value.length<= maxWords){
            setInputtext(value);
            setcharcount(value.length);


        }
     }
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                console.log("Dropdown closed"); 
                setshowlanguage(false); 
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        console.log("✅ Event Listener Added");
    
        return () => {
            console.log("❌ Event Listener Removed");
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    
    const handletranlateapi = async () => {
        try {
            if (!inputText.trim()) {
                console.log("❌ No input text to translate.");
                setTranslateText("No input text to translate.plz type 😊 "); 
                return;
            }
           
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${selectlangfrom}|${selectlangto}`);

            const resdata = await response.json();
            console.log(resdata.responseData.translatedText)
           setTranslateText(resdata.responseData.translatedText);
        } catch (e) {
            console.log(e);
        }
    };
   
    function  handlekeydown(e){
        if(e.key==='Enter'){
            e.preventDefault();
            handletranlateapi();
        }
    }
    function handlelanguageclick(type){
        setselectcurrlang(type);
        setshowlanguage(true);

    }
    function handleselectlanguage(item){
        if(selectcurrlang==="from"){
             setselectlangfrom(item);
        }else{
                setselectlangto(item);
        }
        setshowlanguage(false);
    }
  
    function handleSwap(){
            setselectlangfrom(selectlangto)
            setselectlangto(selectlangfrom);
      
    }
    return (
      <div className="w-full max-w-lg  h-full flex flex-col justify-center items-center p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-2 text-white text-2xl hover:scale-110 transition">
          <i className="fa-solid fa-xmark"></i> 
        </button>

        {/* Language Selection Bar */}
        <div className="w-full min-h-16 p-4 rounded-lg flex justify-between items-center bg-gradient-to-br from-[#090c08] via-[#1e3a5f] to-[#3a97a7] shadow-lg">
            <div onClick={()=>handlelanguageclick('from')}  className="text-lg sm:text-2xl cursor-pointer font-[righteous] text-white">{languages[selectlangfrom]|| "English"}</div>
            <i onClick={handleSwap}  className="text-xl  sm:text-2xl text-white cursor-pointer fa-solid fa-arrows-rotate"></i>
            <div onClick={()=>handlelanguageclick('to')} className="text-lg sm:text-2xl cursor-pointer font-[righteous] text-white">{languages[selectlangto]|| "Hindi"}</div>
        </div>
        {
  showlanguage && (
    <div ref={dropdownRef} className="w-[calc(100%-3rem)] h-[calc(100%-8rem)] max-h-80  overflow-y-auto bg-gradient-to-br from-[#090c08] via-[#1e3a5f] to-[#3a97a7] absolute top-32 z-10 shadow-2xl p-4 rounded-lg border border-gray-600">
      <ul className="space-y-2">
        {
          Object.entries(languages).map(([key, value], index) => (
            <li 
              key={index} 
              onClick={()=>handleselectlanguage(key)}
              className="cursor-pointer text-sm font-[Montserrat] text-white bg-opacity-20 px-4 py-2 rounded-lg transition duration-300 hover:bg-amber-300 hover:text-gray-900 hover:scale-105"
            >
              {value}
            </li>
          ))
        }
      </ul>
    </div>
  )
}


        {/* Input Box */}
        <div className="w-full relative mt-6">       
             <textarea onKeyDown={handlekeydown} value={inputText || ""} onChange={handleinputchange} className="w-full h-28 sm:h-32 resize-none shadow-md border-none shadow-black rounded-lg px-4 py-2 font-[righteous] bg-gray-900 text-white focus:outline-none"></textarea>
             <div className="absolute bottom-2 text-white right-4 text-sm">{charcount}/{maxWords}</div>
        </div>

        {/* Translate Button */}
        <button onClick={handletranlateapi} className="mt-4 w-14 h-14 rounded-full flex justify-center items-center bg-gradient-to-br from-[#090c08] via-[#1e3a5f] to-[#3a97a7] hover:scale-110 transition">
            <i className="text-white text-2xl fa-solid fa-chevron-down animate-pulse"></i>
        </button>

        {/* Output Box */}
        <div className="w-full relative mt-6">       
             <textarea value={translateText || ""} readOnly   className="w-full h-28 text-md sm:h-32 resize-none shadow-md border-none shadow-black rounded-lg px-4 py-2 font-[righteous] bg-gray-900  text-[#11c48e] focus:outline-none">{translateText}</textarea>
             <div className="absolute bottom-2 text-white right-4 text-sm">{charcount}/200</div>
        </div>
      </div>
     
    );
}

export default Translatorapp;
