import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { setInputsValueAC, showSubmitButtonAC } from "../../redux/reducers/translate_reducer"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import s from "./Inputs.module.css";
import copy from "../../img/vopy.png";
import microphone from "../../img/microphone.png";
import stop from "../../img/stop.png"

export const Inputs = () => {
    let dispatch = useDispatch()

    let inputRef = useRef()
    let OutputRef = useRef()

    let inputValue = useSelector(state => state.translate.inputValue);
    let outputValue = useSelector(state => state.translate.outputValue.data.translatedText);

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const speetchText = "Говоріть..."

    let InputChange = () => {
        let value = inputRef.current.value
        dispatch(setInputsValueAC( value, {data: {translatedText: ""}} ))
    }

    if (inputValue.length > 0){
        dispatch(showSubmitButtonAC(true))
    }
    else{
        dispatch(showSubmitButtonAC(false))
        dispatch(setInputsValueAC( inputValue, {data: {translatedText: ""}} ))
    }
    if (inputValue == speetchText){
        dispatch(showSubmitButtonAC(false))
    }

    let copyText = () => {
        navigator.clipboard.writeText(outputValue)
    }
    let readVoise = () => {
        dispatch(setInputsValueAC(
            speetchText,
            {data: {translatedText: ""}}
        ))
        if (!browserSupportsSpeechRecognition) {
            dispatch(setInputsValueAC(
                "Ваш браузер не підтримує данної функції🙁",
                {data: {translatedText: ""}}
            ))
        }else{
            SpeechRecognition.startListening()
        }
    }
    let stopReading = () => {
        SpeechRecognition.stopListening()
        dispatch(setInputsValueAC(
            transcript,
            {data: {translatedText: ""}}
        ))
    }

    return (
        <div className={s.inputs}>
            <div className={s.column}>
                <textarea 
                    ref = {inputRef}
                    className={s.input} 
                    value = {inputValue}
                    onChange = {InputChange}
                    placeholder = "Введіть текст"
                />

                <button className={s.tfunc} onClick = {listening ? stopReading : readVoise}>
                    {
                        listening
                        ? <img src = {stop} />
                        : <img src={microphone} alt="" />
                    }
                </button>

            </div>
            <div className={s.column + " " + s.output_column}>
                <textarea 
                    ref = {OutputRef}
                    className={s.output} 
                    value = {outputValue}
                    onChange = {() => {}}

                    placeholder = "Переклад" 
                    disabled 
                />
                {
                    outputValue.length == 0
                    ? ""
                    : <button className={s.tfunc} onClick = {copyText}>
                        <img src={copy} alt="" />
                      </button>
                }
            </div>
        </div>
    )
}