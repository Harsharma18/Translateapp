import React from 'react';

function Translatorstart({onStart}) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      
      <div className="w-[90%] max-w-md p-6 flex flex-col justify-center bg-gradient-to-t from-[#0b0f1e] via-[#1e3a5f] to-[#3a97a7] mx-auto mt-5 rounded-t-full rounded-bl-full pr-6 shadow-lg shadow-black animate-fade-in">
        <p className="text-center text-4xl sm:text-6xl font-[Shojumaru] text-white drop-shadow-lg">HELLO</p>
        <p className="text-center font-[Hind] text-2xl sm:text-3xl text-white tracking-wide">नमस्ते जी</p>
        <p className="font-[Shojumaru] text-3xl sm:text-4xl text-right text-red-600 animate-pulse">राम राम जी</p>
        <p className="font-[Shojumaru] text-3xl sm:text-4xl text-right text-green-300">رام رام جی</p>
        <p className="text-right text-xl sm:text-2xl font-[Noto Sans JP] text-blue-300">ਹੈਲੋ ਜੀ</p>
        <p className="text-xl sm:text-2xl text-right text-red-300">こんにちは</p>
      </div>

      {/* Translator App Title */}
      <div className="text-center mt-6">
        <h1 className="font-[Righteous] text-2xl sm:text-3xl text-white tracking-widest shadow-lg animate-fade-in">TRANSLATOR APP</h1>
      </div>

      {/* Start Button */}
      <div className="mt-6">
        <button onClick={onStart} className="font-[Righteous] text-lg sm:text-2xl font-bold w-36 sm:w-40 h-10 sm:h-12 tracking-widest rounded-full bg-gradient-to-r from-[#3f2c34] to-[#000000] text-white shadow-lg hover:scale-105 transition">
          START
        </button>
      </div>
    </div>
  );
}

export default Translatorstart;
