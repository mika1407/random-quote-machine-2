import React, { useState, useCallback, useEffect } from 'react';
import {FaTwitter, FaQuoteLeft } from "react-icons/fa";
import './App.css';

// Määritellään tyyppi lainauksen datalle
interface QuoteData {
  content: string;
  author: string;
}

const App: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('');

  // Funktio satunnaisen värin generoimiseksi
  const generateRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Funktio lainauksen hakemiseksi API:sta
  const fetchQuote = useCallback(async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data: QuoteData = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      setBgColor(generateRandomColor()); // Päivitetään taustaväri
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  }, []); // Tyhjä taulukko tarkoittaa, että tämä funktio on vakaa eikä muutu

  // Käytetään useEffectiä kutsumaan fetchQuote komponentin ladatessa
  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const transition = "all 1s"

  return (
    <div className='background' style={{ backgroundColor:bgColor, transition }}>
    <div id="quote-box" style={{ backgroundColor:'#fff' , color:bgColor, transition }}>
      <div className='quote-content'>
        <blockquote>
          <h2 id="text"> 
          <FaQuoteLeft size="30" style={{ marginRight: "10px" }}/> 
          {quote}
          </h2>
          <footer id="author">- {author}</footer>
        </blockquote>
      </div>
        <div className='button-container'>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter style={{ backgroundColor:bgColor, color:"#fff", padding:"10px", borderRadius:"5px", transition }}/>
        </a>
        <button id="new-quote" onClick={fetchQuote} style={{ backgroundColor:bgColor, color:"#fff", padding:"10px", borderRadius:"5px", transition }}>New Quote</button>
        </div>
    </div>
    </div>
  );
};

export default App;

