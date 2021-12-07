import { Grid, Typography } from '@mui/material'

type Props = {
  score?: number
}

const Score = (prop: Props) => {
  return (
    <Grid item container>
      <Typography variant="h2">score:{prop.score}</Typography>
    </Grid>
  )
}
export default Score
