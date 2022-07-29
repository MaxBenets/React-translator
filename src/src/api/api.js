import * as axios from "axios";

export const translate = (language_from, language_to, text) => {
    const encodedParams = new URLSearchParams();

    encodedParams.append("source_language", language_from);
    encodedParams.append("target_language", language_to);
    encodedParams.append("text", text);

    const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '52e80a631amsh26dc9fa01d0b41fp18a9aajsn9cc198b73eee',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        data: encodedParams
    };

    return axios.request(options)
    .then(
        res => {
            console.log(res)
            return res.data
        }
    )
    .catch(
        error => {
            return error
        }
    )
}