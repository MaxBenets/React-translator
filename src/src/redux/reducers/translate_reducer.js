import { translate } from "../../api/api";

const TOGGLE_SHOW_BUTTON = "TOGGLE_SHOW_BUTTON";
const TOGGLE_WAIT = "TOGGLE_WAIT";
const SET_INPUTS_VALUE = "SET_INPUTS_VALUE";
const SET_OUTPUT_TEXT = "SET_OUTPUT_VALUE";
const SET_LANGUAGES_TEXT = "SET_LANGUAGES_TEXT";

let initial_state = {
    showSubmitButton: false,
    wait: false,

    input_language: "ua",
    output_language: "us",

    inputValue: "",
    outputValue: {data: {translatedText: ""}},
}

const translate_reducer = (state = initial_state, action) => {
    switch (action.type){
        case TOGGLE_SHOW_BUTTON:
            return{
                ...state,
                showSubmitButton: action.value
            }
        case SET_INPUTS_VALUE:
            return{
                ...state,
                inputValue: action.input,
                outputValue: action.output
            }
        case SET_OUTPUT_TEXT:
            return{
                ...state,
                outputValue: action.translated_text
            }
        case TOGGLE_WAIT:
            return{
                ...state,
                wait: action.value
            }
        case SET_LANGUAGES_TEXT:
            return{
                ...state,
                input_language: action.input_language,
                output_language: action.output_language,
            }
        default:
            return state
    }
}

export const showSubmitButtonAC = (value) => {
    return{
        type: TOGGLE_SHOW_BUTTON, value
    }
}
export const setInputsValueAC = (input, output) => {
    return{
        type: SET_INPUTS_VALUE, input, output
    }
}
export const setlanguagesAC = (input_language, output_language) => {
    return{
        type: SET_LANGUAGES_TEXT,
        input_language, output_language
    }
}
const setOutputValueAC = (translated_text) => {
    return{
        type: SET_OUTPUT_TEXT, translated_text
    }
}
const setWaitAC = (value) => {
    return{
        type: TOGGLE_WAIT, value
    }
}

export const translateThunk = (language_from, language_to, text) => {
    return (dispatch) => {
        dispatch(setWaitAC(true))
        translate(language_from, language_to, text).then(res => {
            dispatch(setOutputValueAC(res))
            dispatch(setWaitAC(false))
        })
    }
}

export default translate_reducer