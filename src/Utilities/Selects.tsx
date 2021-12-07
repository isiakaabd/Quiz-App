import {
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
} from '@mui/material'

type Props = {
  state?: any
  label?: string
  options?: any
  setState?: any
  formLabel?: string
  name?: string
  value?: string | undefined
  initialState?: string
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
    <Grid item>
      <FormControl sx={{ m: 1, width: '300px' }} fullWidth>
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
