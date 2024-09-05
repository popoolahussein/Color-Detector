interface SquareProps {
  colorValue: string;
  hexValue: string;
  isDarkText: boolean;
}

const Square: React.FC<SquareProps> = ({ colorValue = "Empty Color Value", hexValue, isDarkText = true }) => {
  return (
    <section
      className='square'
      style={{
        backgroundColor: colorValue,
        color: isDarkText ? "#000" : "#fff"
      }}
    >
      <p className='square-p'>{colorValue ? colorValue : "Empty Value"}</p>
      <p className='square-p'>{hexValue ? hexValue : null}</p>
    </section>
  );
};

export default Square;
