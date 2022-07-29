import { useSelector, useDispatch } from "react-redux"
import { translateThunk } from "../../redux/reducers/translate_reducer"
import s from "./TranslateButton.module.css"

export const TranslateButton = () => {
    const dispatch = useDispatch()

    let showSubmitButton = useSelector(state => state.translate.showSubmitButton)
    let inputValue = useSelector(state => state.translate.inputValue)
    let wait = useSelector(state => state.translate.wait)
    let input_language = useSelector(state => state.translate.input_language)
    let output_language = useSelector(state => state.translate.output_language)

    if (input_language == "ua"){
        input_language = "uk"
    }
    if (output_language == "ua"){
        output_language = "uk"
    }
    if (input_language == "us"){
        input_language = "en"
    }
    if (output_language == "us"){
        output_language = "en"
    }
    if (input_language == "cn"){
        input_language = "zh"
    }
    if (output_language == "cn"){
        output_language = "zh"
    }

    const translate = () => {
        dispatch(translateThunk(input_language, output_language, inputValue))
    }

    return(
        <div className={s.area}>
            <button 
                className={ showSubmitButton ? s.button + ' ' + s.button_active : s.button}
                onClick = {translate}
            >
                {
                    wait
                    ? <img className={s.waitImg} src = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" />
                    : "Перекласти"
                }
            </button>
        </div>
    )    
}