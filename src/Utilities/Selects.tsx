import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Grid,
  SelectChangeEvent,
} from '@mui/material'
import { StateProp } from 'components/Questionnaire'

type Props = {
  state: StateProp
  label: string
  options: any
  setState: React.Dispatch<React.SetStateAction<StateProp>>
  formLabel?: string
  name: string
  value?: string
}

const Selects: React.FC<Props> = ({
  options,
  label,
  name,
  state,
  setState,
  value,
}) => {
  const handleChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value as string,
    })
  }

  return (
    <Grid item container>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          id={`${label} for ${name}`}
          value={value || ''}
          label={label}
          name={name}
          onChange={handleChange}
          defaultValue={options[0].value}
        >
          {options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Grid>
  )
}
export default Selects
