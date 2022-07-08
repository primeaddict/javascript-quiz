

const QUIZ_DATA_KEY = "quiz-data"


export const setLocalStorage = (id, status) => {
    const data = getLocalStorage();
    data[id] = status
    localStorage && localStorage.setItem(QUIZ_DATA_KEY, JSON.stringify(data))
}

export const getLocalStorage = () => {

    if (typeof localStorage !== "undefined") {
        return JSON.parse(localStorage && localStorage.getItem(QUIZ_DATA_KEY)) || {}
    }

    return {}
}



export const getQuestionData = (id) => {
    return getLocalStorage()["" + id]
}