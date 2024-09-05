import { useState } from "react";
import Square from "./Square";
import Input from "./Input";

function App() {
  const [colorValue, setColorValue] = useState<string>('');
  const [hexValue, setHexValue] = useState<string>('');
  const [isDarkText, setIsDarkText] = useState<boolean>(true);

  return (
    <div className="App">
      <Square 
        colorValue={colorValue}
        hexValue={hexValue}
        isDarkText={isDarkText}
      />
      <Input 
        colorValue={colorValue}
        setColorValue={setColorValue}
        setHexValue={setHexValue}
        isDarkText={isDarkText}
        setIsDarkText={setIsDarkText}
      />
    </div>
  );
}

export default App;
