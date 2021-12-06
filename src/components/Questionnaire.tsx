import { Category, Difficulty, fetchQuizQuestion } from 'fetch/Server'
import React, { useState, MouseEvent, useCallback } from 'react'
import QuestionCard from './QuestionCard'
import { Typography, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CustomButton from 'Utilities/Button'
export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}
type StateProp = {
  loading: boolean
  questions: any[]
  answers: any[]
  userAnswers: any[]
  score: number
  number: number
  questionNumber: number
  gameOver: boolean
}

const Questionnaire = () => {
  const TotalQuestion = 10

  const [state, setstate] = useState<StateProp>({
    loading: false,
    questions: [],
    answers: [],
    questionNumber: 0,
    userAnswers: [],
    score: 0,
    gameOver: true,
    number: 0,
  })

  const startGame = async () => {
    setstate({
      ...state,
      loading: true,
      gameOver: false,
      score: 0,
      questions: [],
      userAnswers: [],
      number: 0,
    })

    const data = await fetchQuizQuestion(
      TotalQuestion,
      Category.computer,
      Difficulty.Hard,
    )

    setstate({
      ...state,
      loading: false,
      gameOver: false,
      questions: data,
      score: 0,
      number: 0,
      userAnswers: [],
    })
  }
  const { gameOver, loading, number, score, userAnswers, questions } = state
  const theme = useTheme()
  const button = {
    background: 'green',
    hover: theme.palette.info.dark,
    active: theme.palette.primary.light,
  }
  const nextButton = {
    background: theme.palette.info.dark,
    hover: theme.palette.success.light,
    active: theme.palette.primary.light,
  }
  const handleNext = useCallback(() => {
    const nextQuestion = number + 1
    if (nextQuestion === TotalQuestion) {
      setstate({ ...state, gameOver: true })
    } else setstate({ ...state, number: state.number + 1 })
  }, [state, number])

  const handlePick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!gameOver) {
        const answer = e.currentTarget.value
        const correct = questions[number].correct_answer === answer
        if (correct) setstate({ ...state, score: state.score++ })

        const userObject: AnswerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer,
        }
        setstate({
          ...state,
          userAnswers: [...state.userAnswers, userObject],
        })
      }
    },
    [state, gameOver, questions, number],
  )
  console.log(state)
  return (
    <Grid container width="95%" direction="column" margin="auto" gap={2}>
      <Grid item container>
        <Typography variant="h1">React Quiz Question</Typography>
      </Grid>
      {gameOver || userAnswers.length === TotalQuestion ? (
        <Grid item container md={5} sm={4}>
          <CustomButton
            title="start"
            width="100%"
            type={button}
            handleClick={startGame}
          />
        </Grid>
      ) : null}
      {(!gameOver || userAnswers.length === TotalQuestion) && (
        <Grid item container>
          <Typography variant="h2">score:{score}</Typography>
        </Grid>
      )}
      {loading && (
        <Grid item container>
          <Typography variant="h6">loading</Typography>
        </Grid>
      )}
      {!loading && !gameOver ? (
        <QuestionCard
          loading={loading}
          number={number + 1}
          answers={questions[number].answers}
          TotalQuestion={TotalQuestion}
          userAnswers={userAnswers ? userAnswers[number] : undefined}
          gameOver={gameOver}
          questions={questions}
          answer={questions[number].correct_answer}
          question={questions[number].question}
          handlePick={handlePick}
          score={score}
        />
      ) : null}
      {!loading &&
      !gameOver &&
      userAnswers.length === number + 1 &&
      number + 1 < TotalQuestion ? (
        <Grid item container>
          <CustomButton
            handleClick={handleNext}
            title="Next"
            width="100%"
            type={nextButton}
          />
        </Grid>
      ) : null}
    </Grid>
  )
}
export default React.memo(Questionnaire)
