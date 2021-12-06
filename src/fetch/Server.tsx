import { shuffleArray } from "Utilis"


export enum Category{
    "sport"=21,
    "General Knowledge"= 9,
    "computer"=18,
}
export enum Difficulty {
    Easy="easy",
    Hard="hard",
    Medium="medium"
}
type Result={
category:string,
type:string,
question:string[],
incorrect_answers:string[],
correct_answer:string,
}

export type responseState= Result &{answers:string}

export const fetchQuizQuestion= async(amount:number,category:Category,difficulty:Difficulty):Promise<any>=>{
const url =`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
try {
    const data = await fetch(url)
    const JSONResponse= await data.json() 
    return JSONResponse.results.map((result:Result) =>({
...result,
answers: shuffleArray([...result.incorrect_answers,result.correct_answer])
    }))
} catch (error) {
    console.log(error)   
}
}