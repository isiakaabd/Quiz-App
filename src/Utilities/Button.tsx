import { Grid, Button } from '@mui/material'
import { Theme } from '@mui/system'
import { makeStyles } from '@mui/styles'
import React from 'react'

type PropTypes = {
  endIcon?: React.ReactNode
  title: string
  type?: any
  textColor?: string
  width?: string
  height?: string
  textColorOnHover?: string
  disabled?: boolean
  click?: boolean
  correct?: boolean
  list?: boolean
  value?: string
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CustomButton: React.FC<PropTypes> = ({
  title,
  endIcon,
  width,
  height,
  textColorOnHover,
  textColor,
  disabled,
  list,
  handleClick,
  type: { background, hover, active, disable },
  click,
  value,
  correct,
  ...rest
}) => {
  const useStyles = makeStyles((theme: Theme) => ({
    button: {
      '&.MuiButton-root': {
        fontSize: list ? '1.2rem' : '2rem',
        backgroundColor: !list
          ? 'black'
          : list && correct
          ? 'green'
          : list && !correct && click
          ? 'red'
          : background,
        color: 'white',
        width: width,
        height: height ? height : '5rem',
        '&:hover': {
          backgroundColor: !list ? hover : null,
          color: textColorOnHover,
          '& .MuiButton-endIcon>*:nth-of-type(1)': {
            color: textColorOnHover,
          },
        },
        '&:active': {
          backgroundColor: active,
          boxShadow: 'none',
        },
        // '&:disabled': {
        //   backgroundColor: disable,
        //   boxShadow: 'none',
        // },
      },
    },
  }))

  const classes = useStyles()

  return (
    <Grid item>
      <Button
        variant="contained"
        type={!list ? 'submit' : 'button'}
        fullWidth
        endIcon={endIcon}
        className={classes.button}
        disabled={disabled}
        onClick={handleClick}
        value={value}
        // correct={correct}
        {...rest}
      >
        {title}
      </Button>
    </Grid>
  )
}

export default React.memo(CustomButton)
