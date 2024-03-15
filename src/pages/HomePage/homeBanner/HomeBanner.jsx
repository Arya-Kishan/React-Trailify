import React, { useEffect, useState } from 'react'
import './homebanner.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import "regenerator-runtime/runtime.js";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import mic from '../../../assets/mic.svg'


let imgSrc;
const num = Math.floor(Math.random() * 19)
export default function HomeBanner() {

    const { url } = useSelector(state => state.home);
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const { popular: data } = useSelector(state => state.home)

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search/${query}`)
        }
    }

    const handleMic = () => {
        listenContinuously()
    }



    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
    } = useSpeechRecognition();




    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }

    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
        });
        stopListen()
    };

    const stopListen = () => {
        setTimeout(() => {
            SpeechRecognition.stopListening()
            resetTranscript()
        }, 5000);
    };



    useEffect(() => {
        if (finalTranscript !== '') {
            navigate(`/search/${finalTranscript}`)
            SpeechRecognition.stopListening()
        }
    }, [interimTranscript, finalTranscript]);





    return (
        <div>
            <div className='homebanner'>
                {data ? (
                    <>
                        <div className='homebanner_img'>

                            <div className='frontText'>

                                <div><h1>WELCOME</h1></div>

                                <div><span>Millions of movies, TV shoes and people to discover .</span></div>

                                <div className='homeInput'>
                                    <input
                                        placeholder='Search for movie..'
                                        value={query}
                                        onChange={(e) => { setQuery(e.target.value) }} type="text"
                                        onKeyUp={(e) => { handleSearch(e) }}
                                    />
                                    <img onClick={handleMic} src={mic} alt="mic" srcSet="" />
                                    <span>Search</span>
                                </div>

                            </div>

                            <img src={url + data[num]?.backdrop_path} alt="" srcSet="" />

                            <div className="opacity-layer"></div>

                        </div>
                    </>
                ) : (
                    <div className='otherwise_homeBanner'>

                        <div className='frontText'>

                            <div><h1>WELCOME</h1></div>

                            <div><span>Millions of movies, TV shoes and people to discover .</span></div>

                            <div className='homeInput'>
                                <input
                                    placeholder='Search for movie..'
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value) }} type="text"
                                    onKeyUp={(e) => { handleSearch(e) }}
                                />
                                <span>Search</span>
                            </div>

                        </div>

                    </div>
                )}

                {listening && <div className='speechBox'>
                    <p>Listening : {listening ? "ON" : "OFF"}</p>
                    <p>{transcript}</p>
                </div>}

            </div>

        </div>
    )
}
