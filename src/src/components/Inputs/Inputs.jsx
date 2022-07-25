import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { showSubmitButtonAC } from "../../redux/reducers/translate_reducer"
import s from "./Inputs.module.css"
import { setInputsValueAC } from "../../redux/reducers/translate_reducer"
import copy from "../../img/vopy.png"

export const Inputs = () => {
    let dispatch = useDispatch()

    let inputRef = useRef()
    let OutputRef = useRef()

    let inputValue = useSelector(state => state.translate.inputValue);
    let outputValue = useSelector(state => state.translate.outputValue.data.translatedText);

    let InputChange = () => {
        let value = inputRef.current.value
        dispatch(setInputsValueAC( value, {data: {translatedText: ""}} ))

        if (inputRef.current.value.length > 0){
            dispatch(showSubmitButtonAC(true))
        }
        else{
            dispatch(showSubmitButtonAC(false))
            dispatch(setInputsValueAC( inputRef.current.value, {data: {translatedText: ""}} ))
        }
    }

    let copyText = () => {
        navigator.clipboard.writeText(outputValue)
    }

    return (
        <div className={s.inputs}>
            <div className={s.column}>
                <textarea 
                    ref = {inputRef}
                    className={s.input} 
                    value = {inputValue}
                    onChange = {InputChange}
                    placeholder = "Input"
                />
            </div>
            <div className={s.column + " " + s.output_column}>
                <textarea 
                    ref = {OutputRef}
                    className={s.output} 
                    value = {outputValue}
                    onChange = {() => {}}

                    placeholder = "Output" 
                    disabled 
                />
                <button className={s.copy} onClick = {copyText}>
                    <img src={copy} alt="" />
                </button>
            </div>
        </div>
    )
}