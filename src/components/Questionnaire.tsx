import { fetchQuizQuestion } from 'fetch/Server'
import React, { useState, MouseEvent, useCallback } from 'react'
import QuestionCard from './QuestionCard'
import Score from 'components/Score'
import Selects from 'Utilities/Selects'
import { Typography, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CustomButton from 'Utilities/Button'
import Circular from 'Utilities/Circular'
export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}
export type StateProp = {
  loading: boolean
  questions: any[]
  answers: any[]
  userAnswers: any[]
  score: number
  number: number
  questionNumber?: string
  gameOver: boolean
  category?: string
  challenge: string
  error?: string
}
type Options = {}[]

const options: Options = [
  { value: 21, label: 'sport' },
  { value: 9, label: 'General Knowledge' },
  { value: 18, label: 'computer' },
]

const questionNo = [
  { value: 10, label: 10 },
  { value: 20, label: 20 },
  { value: 30, label: 30 },
]
const challengeOption: {}[] = [
  { label: 'Easy', value: 'easy' },
  { label: 'Hard', value: 'hard' },
  { label: 'Medium', value: 'medium' },
]
const Questionnaire = () => {
  const [state, setstate] = useState<StateProp>({
    loading: false,
    questions: [],
    answers: [],
    questionNumber: '',
    userAnswers: [],
    score: 0,
    gameOver: true,
    number: 0,
    category: '',
    challenge: '',
    error: '',
  })
  const {
    gameOver,
    loading,
    number,
    score,
    userAnswers,
    questions,
    questionNumber,
    challenge,
    category,
    // error,
  } = state
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
    if (!questionNumber || !category || !challenge)
      return setstate({
        ...state,
        error: ' Enter a  valid input',
      })
    else {
      try {
        const data = await fetchQuizQuestion(
          QUestionNumber,
          category,
          challenge,
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
      } catch (error) {
        console.log(error)
      }
    }
  }

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
    if (nextQuestion === QUestionNumber) {
      setstate({ ...state, gameOver: true })
    } else setstate({ ...state, number: state.number + 1 })
    // eslint-disable-next-line
  }, [state, questionNumber, number])

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

  const QUestionNumber = Number(questionNumber)
  return (
    <Grid container width="95%" direction="column" margin="auto" gap={2}>
      <Grid item container>
        <Typography variant="h1">
          {questions.length > 0 ? 'Quiz Question' : "Let's get Started"}
        </Typography>
      </Grid>
      {gameOver || userAnswers.length === QUestionNumber ? (
        <>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Grid
              item
              direction="column"
              container
              md={5}
              sm={4}
              gap={2}
              margin="auto"
            >
              {}
              <Grid item container gap={2}>
                <Grid item container>
                  <Selects
                    label="Select Category"
                    state={state}
                    setState={setstate}
                    options={options}
                    name="category"
                    value={category}
                  />
                </Grid>
                <Grid item container>
                  <Selects
                    label="Select Difficulty"
                    state={state}
                    name="challenge"
                    setState={setstate}
                    value={challenge}
                    options={challengeOption}
                  />
                </Grid>
                <Grid item container>
                  <Selects
                    label="Select No of Questions"
                    state={state}
                    name="questionNumber"
                    setState={setstate}
                    value={state.questionNumber}
                    options={questionNo}
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
          <Grid item container>
            <CustomButton
              title="start"
              width="100%"
              type={button}
              handleClick={startGame}
            />
          </Grid>
        </>
      ) : null}
      {(!gameOver || userAnswers.length === QUestionNumber) &&
        questions.length > 0 && <Score score={score} />}
      {loading && (
        <Grid item container>
          <Circular />
        </Grid>
      )}
      {!loading && !gameOver && questions.length > 0 ? (
        <Grid item container>
          <QuestionCard
            loading={loading}
            number={number + 1}
            answers={questions[number].answers}
            TotalQuestion={QUestionNumber}
            userAnswers={userAnswers ? userAnswers[number] : undefined}
            gameOver={gameOver}
            questions={questions}
            answer={questions[number].correct_answer}
            question={questions[number].question}
            handlePick={handlePick}
            score={score}
          />
        </Grid>
      ) : null}
      {!loading &&
      !gameOver &&
      userAnswers.length === number + 1 &&
      number + 1 < QUestionNumber ? (
        <Grid item container>
          <CustomButton
            handleClick={handleNext}
            title="Next"
            width="100%"
            type={nextButton}
            list={false}
          />
        </Grid>
      ) : null}
    </Grid>
  )
}
export default React.memo(Questionnaire)
