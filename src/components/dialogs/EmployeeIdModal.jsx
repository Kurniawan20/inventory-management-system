'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, pipe, nonEmpty, minLength } from 'valibot'

const schema = object({
  employeeId: pipe(
    string(),
    nonEmpty('Employee ID is required'),
    minLength(3, 'Employee ID must be at least 3 characters long')
  )
})

const EmployeeIdModal = ({ open, onClose, onSubmit, title, description }) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      employeeId: ''
    }
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleFormSubmit = async (data) => {
    setIsLoading(true)
    try {
      await onSubmit(data.employeeId)
      reset()
    } catch (error) {
      console.error('Error submitting employee ID:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle className='flex items-center justify-between'>
        <div>
          <Typography variant='h5' component='div'>
            {title || 'Employee Verification'}
          </Typography>
          <Typography variant='body2' color='text.secondary' className='mt-1'>
            {description || 'Please enter your Employee ID to continue'}
          </Typography>
        </div>
        <IconButton onClick={handleClose} size='small'>
          <i className='ri-close-line' />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent className='pt-4'>
          <Controller
            name='employeeId'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                autoFocus
                label='Employee ID'
                placeholder='Enter your employee ID'
                variant='outlined'
                disabled={isLoading}
                error={!!errors.employeeId}
                helperText={errors.employeeId?.message}
                InputProps={{
                  startAdornment: (
                    <i className='ri-user-line text-textSecondary mr-2' />
                  )
                }}
              />
            )}
          />
        </DialogContent>

        <DialogActions className='p-6 pt-4'>
          <Button
            onClick={handleClose}
            variant='outlined'
            color='secondary'
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isLoading}
            startIcon={isLoading ? <i className='ri-loader-line animate-spin' /> : <i className='ri-check-line' />}
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EmployeeIdModal
