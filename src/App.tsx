import './App.css'
import Questionnaire from 'components/Questionnaire'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from 'muiTheme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Questionnaire />
      </div>
    </ThemeProvider>
  )
}

export default App
