import React, { useState } from 'react'

const usePasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let charSet = "", samplePassword = "", validate={};

    const GeneratePassword = (checkBoxData, charLength) => {
        console.log('charLength:',charLength);
        const trueCheckBoxes = checkBoxData.filter((value) => value.state);
        if(trueCheckBoxes.length === 0) {
            setErrorMessage("Please select atleast one criteria")
            return;
        }
        trueCheckBoxes.map((item) => {
            switch(item.value) {
                case "Include Uppercase Letters": 
                    validate[item.value] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    return charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                case "Include Lowercase Letters": 
                    validate[item.value] = "abcdefghijklmnopqrstuvwxyz";
                    return charSet += "abcdefghijklmnopqrstuvwxyz";
                case "Include Numbers": 
                    validate[item.value] = "1234567890";
                    return charSet += "1234567890";
                case "Include Symbols":
                    validate[item.value] = "!@#$%^&*()_+-=";
                    return charSet += "!@#$%^&*()_+-="
            }
        })
        for(let i = 0; i < charLength; i++) {
            let randomIndex = Math.floor(Math.random() * charSet.length);
            samplePassword += charSet[randomIndex];
        }
        let isValidArray;
        const passwordArray = [...samplePassword];
        let array = Object.values(validate);
        for(let i = 0; i < array.length; i++) {
            isValidArray = passwordArray.map((item) => {
                let split = [...array[i]];
                return split.some((item1) => item1 === item);
            });
            const trueElements = isValidArray.filter(item => item);
            if(trueElements.length === 0) {
                samplePassword = "";
                GeneratePassword(checkBoxData, charLength);
            } else {
                setPassword(samplePassword);
            }
        }
        setErrorMessage("");
    }

    return { password, errorMessage, setErrorMessage, GeneratePassword };
}

export default usePasswordGenerator
