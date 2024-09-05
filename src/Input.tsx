import { useState, useCallback, useEffect } from 'react';
import colornames from 'colornames';
import Fuse from 'fuse.js';
import colorNames from './ColorNames';

const fuse = new Fuse(colorNames, {
  includeScore: true,
  threshold: 0.4,
});

interface InputProps {
  colorValue: string;
  setColorValue: React.Dispatch<React.SetStateAction<string>>;
  setHexValue: React.Dispatch<React.SetStateAction<string>>;
  isDarkText: boolean;
  setIsDarkText: React.Dispatch<React.SetStateAction<boolean>>;
}

const getSuggestions = (input: string) => {
  if (!input) return [];
  return fuse.search(input).map(result => result.item);
};

const Input: React.FC<InputProps> = ({ colorValue, setColorValue, setHexValue, setIsDarkText }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const storedColor = localStorage.getItem('selectedColor');
    if (storedColor) {
      setColorValue(storedColor);
      setHexValue(colornames(storedColor) || '');
    }
  }, [setColorValue, setHexValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorValue(value);
    
    setSuggestions(getSuggestions(value));
    const hex = colornames(value) || '';
    setHexValue(hex);
    
    localStorage.setItem('selectedColor', value);
  }, [setColorValue, setHexValue]);

  const handleSuggestionClick = useCallback((name: string) => {
    setColorValue(name);
    const hex = colornames(name) || '';
    setHexValue(hex);
    
    localStorage.setItem('selectedColor', name);
    setSuggestions([]);
  }, [setColorValue, setHexValue]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="colorInput">Add Color Name:</label>
      <input
        id="colorInput"
        autoFocus
        type="text"
        placeholder="Add color name"
        required
        value={colorValue}
        onChange={handleChange}
      />
      <button
        className='toggle-button'
        type='button'
        onClick={() => setIsDarkText(prev => !prev)}
      >
        Toggle Text Color
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((name, index) => (
            <li key={index} onClick={() => handleSuggestionClick(name)}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default Input;
