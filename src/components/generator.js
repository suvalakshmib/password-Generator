import React, { useEffect, useState } from 'react'
import Password_logo from '../img/Password_logo.png';
import hacker_angry from '../img/hacker_angry.png';
import hacker_smile_red from '../img/hacker_smile_red.png';
import logo_white from '../img/logo_white.png';
import { Slider } from "@material-ui/core";
import hacker from '../img/hacker.svg';
import red from '../img/red.png';
import Medium from '../img/Medium.png';
import GreenLast from '../img/GreenLast.png';
import Regenerate from '../img/Regenerate.png';
import Sidered from '../img/Sidered.png';
import SideOrange from '../img/SideOrange.png';
import SideGreen from '../img/SideGreen.png';
import '../components/MediaQuery.css'




const uppercaselist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const mixedcaselist = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbercaselist = '0123456789';
const symbolscaselist = '!@#$%^&*()?';

function Generator() {
    const [password, setPassword] = useState("");
    const [lowercase, setLowerCase] = useState(true);
    const [uppercase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [passwordlength, setPasswordLength] = useState(16);
    const [score, setScore] = useState(4);
    const [ButtonText, setButtonText] = useState("Copy");
    const [isValue, setValue] = useState(16)

    useEffect(() => {
        generatePassword()
    }, [isValue])


    const generatePassword = () => {

        let characterlist = '';

        if (lowercase) {

            characterlist += mixedcaselist;
        }
        if (uppercase) {
            characterlist += uppercaselist;
        }
        if (numbers) {
            characterlist += numbercaselist;
        }
        if (symbols) {
            characterlist += symbolscaselist;
        }


        let tempPassword = '';
        const characterlistLength = characterlist.length;
        for (let i = 0; i < isValue; i++) {
            const characterIndex = Math.round(Math.random() * characterlistLength);
            tempPassword += characterlist.charAt(characterIndex);
        }
        setPassword(tempPassword);
    }


    const handleClick = () => {
        navigator.clipboard.writeText(password);
        setButtonText("Copied!");
        setTimeout(() => setButtonText("Copy"), 1500);
    };





    const getScoreColor = (isValue) => {

        if (isValue >= 1 && isValue < 8) {
            return {
                bg: "linear-gradient(to right, #e53935, #e35d5b)",
                img: red,
                hacker: hacker_smile_red,
                label: " ~o1 minutes needed ,in order to have a 1% probability of at least one collision",
                comment: "Bad password",
                assestColor: "#e35d5b",
                className: 'red-track',
                sideimg: Sidered
            };

        }
        if (isValue >= 8 && isValue <= 15) {
            return {
                bg: "linear-gradient(to right, #D28A33 ,#FF8C00)",
                img: Medium,
                hacker: hacker,
                label: "144 years,needed ,in order to have a 1% problability of a at least one collision",
                comment: "Weak password",
                assestColor: "#FF8C00",
                sideimg: SideOrange
            };
        }
        if (isValue <= 40) {
            return {
                bg: "linear-gradient(to right ,#4B8673 , #70A694)",
                img: GreenLast,
                hacker: hacker_angry,
                label: "149 billion years needed ,in order to have a 1% problability of a at least one collision",
                comment: "Strong password",
                assestColor: "#70A694",
                sideimg: SideGreen
            };
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", checkKeyPress)
        return () => {
            window.removeEventListener("keydown", checkKeyPress)
        }
    }, [isValue])

    const checkKeyPress = (e) => {
        if (e.key === "ArrowRight" && isValue < 40) {
            setValue(isValue + 1)
        }
        else if (e.key === "ArrowLeft" && isValue > 1) {
            setValue(isValue - 1)

        }
    }



    const handleChange = (e, newValue) => {
        setPassword(newValue)
        getScoreColor(newValue)
        generatePassword(newValue)
        setValue(newValue)
        checkKeyPress(isValue)
    }
    return (
        <div className='container' style={{
            background: getScoreColor(isValue)?.bg
        }}>
            <div className='inner_container'>
                <div className='header_heading last1' >
                    <div className=' header_heading_one'>
                        <img src={Password_logo} alt="password-logo" />
                        <span className='span-title'>Password Generator</span>
                    </div>
                    <div className=' header_heading_two'>
                        <p><a target='_blank' href="https://brownbutton.io/privacy" > Privacy Policy</a></p>
                    </div>
                </div>


                <div className='content_section'>
                    <div className='content_heading'>
                        <p>Sheild your digital realm with robust security!</p>
                    </div>
                    <div className='content_header'>
                        <div className='content_whitebox'>
                            <div className='in-cnct '>
                                <div className='inline-cnct1'>
                                    <input type="text"
                                        className='pc' disabled
                                        value={password}
                                        placeholder='Tap on character use to generate password' />
                                </div>

                                <div className='inline-cnct2' onClick={generatePassword} >
                                    <img src={Regenerate} alt="recycle" className='fa-solid' onClick={generatePassword} />
                                </div>
                                <div className='inline-cnct3 '>
                                    <button className='bn ' style={{ background: `${isValue <= 7 ? '#e35d5b' : isValue <= 15 ? "#FF8C00" : "#70A694"}` }}
                                        onClick={handleClick} >{ButtonText}</button>
                                </div>
                                
                            </div>
                            
                            <div className='flex progress-container'>
                                <p style={{ color: `${isValue <= 7 ? '#e35d5b' : isValue <= 15 ? "#FF8C00" : "#70A694"}` }}>
                                    {getScoreColor(isValue)?.comment} </p>

                            </div>
                            <div className='white-block-content'>
                                <div className='password-length'>
                                    <p className='p-p'>Password Length</p>
                                </div>

                                <Slider
                                    value={isValue}
                                    valueLabelDisplay="auto"
                                    onKeyPress={checkKeyPress}
                                    onChange={handleChange}
                                    min={1}
                                    max={40}
                                    classes={{ thumb: "thumb" }} // Add custom styles to the thumb
                                    aria-labelledby="range-slider"
                                    className={isValue <= 7 ? "range-slider red-slider" :
                                        isValue <= 15 ? "range-slider orange-slider" :
                                            isValue <= 40 ? "range-slider green-slider" : "range-slider green-track"}
                                />

                                <div className='rc'>
                                    <div className='radio-custom'>
                                        <p className='p-b'>Character use</p>
                                        <div className='customize'>
                                            <div className='checkboxes'>
                                                <div className='check-wrapper'>
                                                    <div className='wrapper'>
                                                        <div className='checkbox-wrapper'>
                                                            <input type="checkbox" name='upper' id='upper'
                                                                defaultValue={true} checked={uppercase}
                                                                onClick={() => {
                                                                    setUpperCase(!uppercase);
                                                                }} />
                                                        </div>
                                                        <div className='text-wrapper' htmlFor='upper'>Letter (A-Z)</div>
                                                    </div>
                                                    <div className='wrapper'>
                                                        <div className='checkbox-wrapper'>
                                                            <input type="checkbox" name='lower' id='lower'
                                                                defaultValue={true} checked={lowercase}
                                                                onChange={() => {
                                                                    setLowerCase(!lowercase);
                                                                    setScore(score)
                                                                }} />
                                                        </div>
                                                        <div className='text-wrapper' htmlFor='lower'>Mixed Case(Aa-Zz)</div>
                                                    </div>
                                                    <div className='wrapper'>
                                                        <div className='checkbox-wrapper'>
                                                            <input type="checkbox" name='numbers' id='numbers'
                                                                defaultValue={true} checked={numbers}
                                                                onChange={() => {
                                                                    setNumbers(!numbers);
                                                                    setScore(numbers ? score - 1 : score + 1)
                                                                }} />
                                                        </div>
                                                        <div className='text-wrapper' htmlFor='numbers'>Digits(0-9)</div>
                                                    </div>
                                                    <div className='wrapper'>

                                                        <div className='checkbox-wrapper'>
                                                            <input type="checkbox" name='symbols' id='symbols'

                                                                defaultValue={true} checked={symbols}
                                                                onChange={() => {
                                                                    setSymbols(!symbols);
                                                                    setScore(symbols ? score - 1 : score + 1)
                                                                }} />
                                                        </div>
                                                        <div className='text-wrapper' htmlFor='symbols'>Symblos(!,@,#)</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='content_image'>
                            <div className='inline-img'>
                                <img className='command_up' src={getScoreColor(isValue)?.sideimg} />
                            </div>
                            <img className='command' src={getScoreColor(isValue)?.img}
                                alt="command" />
                            <div className='inline-img'>
                                <img className='angry' src={getScoreColor(isValue)?.hacker} alt="hacker" />
                                <p className='label'>{getScoreColor(isValue)?.label}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='last'>
                    <p><a className='link-a'target='_blank' href='https://github.com/suvalakshmib'>https://github.com/suvalakshmib</a></p>
                    <p className='link-a' >Developed by suvalakshmi</p>
                </div>
            </div>
        </div >
    )
}


export default Generator