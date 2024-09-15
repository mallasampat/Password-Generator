import React, { useEffect, useState } from 'react'
import usePasswordGenerator from './use-Password-Generator';

const PasswordGenerator = () => {
  const [charLength, setCharLength] = useState(4);
  const [checkBoxData, setCheckBoxData] = useState([
    {value: 'Include Uppercase Letters', state: false},
    {value: 'Include Lowercase Letters', state: false},
    {value: 'Include Numbers', state: false},
    {value: 'Include Symbols', state: false},
  ]);
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (index) => {
    const copy = [...checkBoxData];
    copy[index].state = !checkBoxData[index].state;
    setCheckBoxData(copy);
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(password)
    .then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 3000);
    });
  }

  const {password, errorMessage, setErrorMessage,  GeneratePassword } = usePasswordGenerator();

  useEffect(() => {
    if(errorMessage) {
      const trueCheckBoxes = checkBoxData.filter((value) => value.state);
      if(trueCheckBoxes.length > 0) {
        setErrorMessage("")
      }
    }
  }, [checkBoxData]);

  return (
    <>
    <div className='heading'>
      <h1>Generate a Password</h1>
    </div>
    <div className='password-container'>
      <div className='password-generator'>
        <div className='password-header'>
          <span>{password}</span>
        {password && <button onClick={handleCopyClick}>{isCopied ? "Copied" : "Copy"}</button>}
        </div>
        <div className='char-length'>
          <span>Character Length</span>
          <span>{charLength}</span>
        </div>
        <input 
        className='slider' 
        type='range' 
        min='4' 
        max='20' 
        value={charLength} 
        onChange={(e) => setCharLength(e.target.value)} 
        />
        <div className='checkbox-wrapper'>
        {checkBoxData.map((item, index) => (
          <>
          <div key={index} className='checkbox-children'>
            <input 
            id={index}
            type='checkbox' 
            checked={item.state} 
            onChange={() => handleChange(index)}/>
            <label htmlFor={index}>{item.value}</label>
          </div>
          </>
        ))}
      </div>
      <button className='genertae-password' onClick={() => GeneratePassword(checkBoxData, charLength)}>generate password</button>
      {errorMessage && <span className='err-message'>{errorMessage}</span>}
      </div>
    </div>
    </>
  )
}

export default PasswordGenerator
