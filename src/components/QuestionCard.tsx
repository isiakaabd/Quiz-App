import { AnswerObject } from './Questionnaire'
import { Card, Typography, Grid } from '@mui/material'
import CustomButton from 'Utilities/Button'
import { useTheme } from '@mui/material/styles'
import { parse } from 'node-html-parser'

type Props = {
  loading: boolean
  questions: string[]
  answers: string[]
  userAnswers: AnswerObject | undefined
  score: number
  number: number
  gameOver: boolean
  TotalQuestion: number
  question: string
  answer: string
  handlePick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const QuestionCard: React.FC<Props> = ({
  number,
  userAnswers,
  answers,
  TotalQuestion,
  question,
  handlePick,
}) => {
  const theme = useTheme()
  const nextButton = {
    background: theme.palette.info.dark,
    hover: theme.palette.success.light,
    active: theme.palette.primary.light,
  }
  const { firstChild } = parse(question)

  return (
    <Grid container width="90%" direction="column" margin="auto" gap={2}>
      <Grid item container>
        <Typography variant="h6" textAlign="center" gutterBottom>
          Questions: {number} / {TotalQuestion}
        </Typography>
      </Grid>
      <Grid item container md={4} sm={10} justifyContent="center">
        <Card>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {firstChild.text}
            </Typography>
          </Grid>
          <Grid item container direction="column" gap={2}>
            {answers.map((answer) => (
              <Grid item key={answer}>
                <CustomButton
                  type={nextButton}
                  list={true}
                  width="75%"
                  correct={userAnswers?.correctAnswer === answer}
                  click={userAnswers?.answer === answer}
                  disabled={!!userAnswers} // userAnswers?true:false
                  title={answer}
                  value={answer}
                  handleClick={handlePick}
                />
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

export default QuestionCard
