
import React, { useEffect, useRef, useState } from 'react';
import { languages } from "../languagesData";

function TranslatorApp({ onClose }) {
    const [selectLangFrom, setSelectLangFrom] = useState("English");
    const [selectLangTo, setSelectLangTo] = useState("Hindi");
    const [showLanguage, setShowLanguage] = useState(false);
    const [selectCurrLang, setSelectCurrLang] = useState(false);
    const [inputText, setInputText] = useState('');
    const [translateText, setTranslateText] = useState('');
    const dropdownRef = useRef(null);
    const [charCount, setCharCount] = useState(0);
    const maxWords = 200;
    const [searchTerm, setSearchTerm] = useState('');

    function handleInputChange(e) {
        const value = e.target.value;
        if (value.length <= maxWords) {
            setInputText(value);
            setCharCount(value.length);
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLanguage(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleTranslateAPI = async () => {
        try {
            if (!inputText.trim()) {
                setTranslateText("No input text to translate. Please type 😊");
                return;
            }
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${selectLangFrom}|${selectLangTo}`);
            const resData = await response.json();
            setTranslateText(resData.responseData.translatedText);
        } catch (e) {
            console.log(e);
        }
    };

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleTranslateAPI();
        }
    }

    function handleLanguageClick(type) {
        setSelectCurrLang(type);
        setShowLanguage(true);
    }

    function handleSelectLanguage(item) {
        if (selectCurrLang === "from") {
            setSelectLangFrom(item);
        } else {
            setSelectLangTo(item);
        }
        setShowLanguage(false);
        setSearchTerm(''); 
    }

    function handleSwap() {
        setSelectLangFrom(selectLangTo);
        setSelectLangTo(selectLangFrom);
    }

    return (
        <div className="w-full max-w-lg h-full flex flex-col justify-center items-center p-6 relative">
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-2 text-white text-2xl hover:scale-110 transition">
                <i className="fa-solid fa-xmark"></i> 
            </button>

            {/* Language Selection Bar */}
            <div className="w-full min-h-16 p-4 rounded-lg flex justify-between items-center bg-gradient-to-br from-[#090c08] via-[#1e3a5f] to-[#3a97a7] shadow-lg">
                <div onClick={() => handleLanguageClick('from')} className="text-lg sm:text-2xl cursor-pointer font-[righteous] text-white">
                    {languages[selectLangFrom] || "English"}
                </div>
                <i onClick={handleSwap} className="text-xl sm:text-2xl text-white cursor-pointer fa-solid fa-arrows-rotate"></i>
                <div onClick={() => handleLanguageClick('to')} className="text-lg sm:text-2xl cursor-pointer font-[righteous] text-white">
                    {languages[selectLangTo] || "Hindi"}
                </div>
            </div>

            {/* Language Dropdown with Search */}
            {
                showLanguage && (
                    <div ref={dropdownRef} className="w-[calc(100%-3rem)] h-[calc(100%-8rem)] max-h-80 overflow-y-auto bg-gradient-to-br from-[#090c08] via-[#1e3a5f] to-[#3a97a7] absolute top-32 z-10 shadow-2xl p-4 rounded-lg border border-gray-600">
                        
                        {/* Search Bar */}
                        <div className="relative mb-4">
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search language..." 
                                className="w-full px-4 py-2 text-sm font-[Montserrat] bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                           
                        </div>

                        {/* Language List */}
                        <ul className="space-y-2">
                            {
                                Object.entries(languages)
                                    .filter(([key, value]) => value.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map(([key, value], index) => (
                                        <li 
                                            key={index} 
                                            onClick={() => handleSelectLanguage(key)}
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
                <textarea onKeyDown={handleKeyDown} value={inputText || ""} onChange={handleInputChange} className="w-full h-28 sm:h-32 resize-none shadow-md border-none shadow-black rounded-lg px-4 py-2 font-[righteous] bg-gray-900 text-white focus:outline-none"></textarea>
                <div className="absolute bottom-2 text-white right-4 text-sm">{charCount}/{maxWords}</div>
            </div>

            {/* Translate Button */}
            <button onClick={handleTranslateAPI} className="mt-4 w-14 h-14 rounded-full flex justify-center items-center bg-gradient-to-br from-[#090c08] via-[#1e3a5f] to-[#3a97a7] hover:scale-110 transition">
                <i className="text-white text-2xl fa-solid fa-chevron-down animate-pulse"></i>
            </button>

            {/* Output Box */}
            <div className="w-full relative mt-6">       
                <textarea value={translateText || ""} readOnly className="w-full h-28 text-md sm:h-32 resize-none shadow-md border-none shadow-black rounded-lg px-4 py-2 font-[righteous] bg-gray-900 text-[#11c48e] focus:outline-none"></textarea>
                <div className="absolute bottom-2 text-white right-4 text-sm">{charCount}/200</div>
            </div>
        </div>
    );
}

export default TranslatorApp;
