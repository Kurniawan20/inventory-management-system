'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, email, pipe, nonEmpty } from 'valibot'
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import EmployeeIdModal from '@components/dialogs/EmployeeIdModal'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const schema = object({
  email: pipe(string(), minLength(1, 'This field is required'), email('Please enter a valid email address')),
  password: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(5, 'Password must be at least 5 characters long')
  )
})

const Login = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState(null)
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [selectedShortcut, setSelectedShortcut] = useState(null)

  // Vars
  const pertaminaBg = '/images/pages/pertamina-login-bg.jpg'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()
  const { settings } = useSettings()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: 'admin@materialize.com',
      password: 'admin'
    }
  })

  // Use the custom Pertamina background image for both light and dark modes
  const authBackground = pertaminaBg

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async data => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res && res.ok && res.error === null) {
      // Vars
      const redirectURL = searchParams.get('redirectTo') ?? '/dashboards/assets'

      router.replace(getLocalizedUrl(redirectURL, locale))
    } else {
      if (res?.error) {
        const error = JSON.parse(res.error)

        setErrorState(error)
      }
    }
  }

  // Shortcut handlers
  const handleShortcutClick = (shortcutType) => {
    setSelectedShortcut(shortcutType)
    setEmployeeModalOpen(true)
  }

  const handleEmployeeIdSubmit = async (employeeId) => {
    // Store employee ID in session storage for the shortcut session
    sessionStorage.setItem('shortcutEmployeeId', employeeId)
    sessionStorage.setItem('shortcutTimestamp', Date.now().toString())
    
    // Navigate to the selected shortcut page
    const routes = {
      request: '/shortcuts/assets/request',
      tracking: '/shortcuts/assets/tracking',
      return: '/shortcuts/assets/return'
    }
    
    if (selectedShortcut && routes[selectedShortcut]) {
      router.push(getLocalizedUrl(routes[selectedShortcut], locale))
    }
    
    setEmployeeModalOpen(false)
    setSelectedShortcut(null)
  }

  const handleModalClose = () => {
    setEmployeeModalOpen(false)
    setSelectedShortcut(null)
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <img 
          src={authBackground} 
          alt='Pertamina Background'
          className='absolute inset-0 z-[-1] w-full h-full object-cover max-md:hidden' 
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px] bg-white rounded-lg p-3 shadow-md'>
          <Logo />
        </div>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
            <Typography>Please sign-in to your account and start the adventure</Typography>
          </div>
          <Alert icon={false} className='bg-[var(--mui-palette-primary-lightOpacity)]'>
            <Typography variant='body2' color='primary'>
              Email: <span className='font-medium'>admin@materialize.com</span> / Pass:{' '}
              <span className='font-medium'>admin</span>
            </Typography>
          </Alert>

          <form
            noValidate
            action={() => {}}
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  autoFocus
                  type='email'
                  label='Email'
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  {...((errors.email || errorState !== null) && {
                    error: true,
                    helperText: errors?.email?.message || errorState?.message[0]
                  })}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Password'
                  id='login-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='toggle password visibility'
                        >
                          <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...(errors.password && { error: true, helperText: errors.password.message })}
                />
              )}
            />
            <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
              <FormControlLabel control={<Checkbox defaultChecked />} label='Remember me' />
              <Typography
                className='text-end'
                color='primary'
                component={Link}
                href={getLocalizedUrl('/forgot-password', locale)}
              >
                Forgot password?
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Log In
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>New on our platform?</Typography>
              <Typography component={Link} href={getLocalizedUrl('/register', locale)} color='primary'>
                Create an account
              </Typography>
            </div>
          </form>
          <Divider className='gap-3'>or</Divider>
          <Button
            color='secondary'
            className='self-center text-textPrimary'
            startIcon={<img src='/images/logos/google.png' alt='Google' width={22} />}
            sx={{ '& .MuiButton-startIcon': { marginInlineEnd: 3 } }}
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </Button>
          
          <Divider className='gap-3'>Quick Access</Divider>
          
          <div className='flex flex-col gap-3'>
            <Typography variant='body2' color='text.secondary' className='text-center'>
              Access common features directly:
            </Typography>
            <div className='flex flex-col gap-2'>
              <Button
                variant='outlined'
                color='primary'
                startIcon={<i className='ri-file-add-line' />}
                onClick={() => handleShortcutClick('request')}
                className='justify-start'
              >
                Permintaan Aset (Asset Request)
              </Button>
              <Button
                variant='outlined'
                color='primary'
                startIcon={<i className='ri-map-pin-line' />}
                onClick={() => handleShortcutClick('tracking')}
                className='justify-start'
              >
                Tracking Aset (Asset Tracking)
              </Button>
              <Button
                variant='outlined'
                color='primary'
                startIcon={<i className='ri-arrow-go-back-line' />}
                onClick={() => handleShortcutClick('return')}
                className='justify-start'
              >
                Pengembalian Aset (Asset Return)
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee ID Modal */}
      <EmployeeIdModal
        open={employeeModalOpen}
        onClose={handleModalClose}
        onSubmit={handleEmployeeIdSubmit}
        title="Employee Verification Required"
        description={`Please enter your Employee ID to access ${
          selectedShortcut === 'request' ? 'Asset Request' :
          selectedShortcut === 'tracking' ? 'Asset Tracking' :
          selectedShortcut === 'return' ? 'Asset Return' : 'the feature'
        }`}
      />
    </div>
  )
}

export default Login
