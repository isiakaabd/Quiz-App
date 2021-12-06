export const shuffleArray=(array:any[])=>{
return [...array].sort(() => Math.random() - 0.5);
  
}

// https://javascript.info/array-methods#shuffle-an-array