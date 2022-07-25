import s from "./CahngeText.module.css"
import { useSelector, useDispatch } from "react-redux/es/exports"
import { useRef } from "react"
import { setlanguagesAC } from "./../../redux/reducers/translate_reducer"

export const ChangeText = () => {
    const dispatch = useDispatch()

    let inputRef = useRef()
    let outputRef = useRef()

    let input_language = useSelector(state => state.translate.input_language)
    let output_language = useSelector(state => state.translate.output_language)

    let input_country_img_path = "https://flagcdn.com/"+input_language+".svg"
    let output_country_img_path = "https://flagcdn.com/"+output_language+".svg"

    const change = () => {
        let input_value = inputRef.current.value;
        let output_value = outputRef.current.value
        dispatch(setlanguagesAC(input_value, output_value))
    }

    return(
        <div className={s.ChangeText}>
            <div className={s.column}>
                <img className={s.img} src={input_language == "auto" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/1024px-Solid_black.svg.png" : input_country_img_path} alt="" />
                <select className={s.input} value = {input_language} onChange={change} ref = {inputRef}>
                    <option value="ua">Українська</option>
                    <option value="us">Англіська</option>
                    <option value="cn">Китайська</option>
                    <option value="it">Італійська</option>
                    <option value="pl">Польська</option>
                    <option value="auto">Авто</option>
                </select>
            
            </div>
            <div className={s.column}>
                <img className={s.img} src={output_country_img_path} alt="" />
                <select onChange={change} ref = {outputRef} value={output_language} className={s.input}>
                    <option value="ua">Українська</option>
                    <option value="us">Англіська</option>
                    <option value="cn">Китайська</option>
                    <option value="it">Італійська</option>
                    <option value="pl">Польська</option>
                </select>
            
            </div>
        </div>
    )
}