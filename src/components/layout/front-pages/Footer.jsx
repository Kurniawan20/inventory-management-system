// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

const Footer = () => {
  return (
    <footer className={frontLayoutClasses.footer}>
      <div className='relative'>
        <img
          src='/images/front-pages/footer-bg.png'
          alt='footer bg'
          className='absolute inset-0 is-full bs-full object-cover -z-[1]'
        />
        <div className={classnames('plb-12 text-white', frontCommonStyles.layoutSpacing)}>
          <Grid container rowSpacing={10} columnSpacing={12}>
            <Grid item xs={12} lg={5}>
              <div className='flex flex-col items-start gap-6'>
                <Link href='/front-pages/landing-page' className='inline-block p-1 bg-white rounded'>
                  <Logo />
                </Link>
                <Typography color='white' className='lg:max-is-[390px] opacity-[0.78]'>
                  Comprehensive Asset Management System for Pertamina. Streamline your asset lifecycle management with powerful tracking, maintenance, and reporting capabilities.
                </Typography>
                <div className='flex gap-4'>
                  <TextField
                    size='small'
                    className={styles.inputBorder}
                    label='Subscribe to newsletter'
                    placeholder='Your email'
                    sx={{
                      ' & .MuiInputBase-root:hover:not(.Mui-focused) fieldset': {
                        borderColor: 'rgb(var(--mui-mainColorChannels-dark) / 0.6) !important'
                      },
                      '& .MuiInputBase-root.Mui-focused fieldset': {
                        borderColor: 'var(--mui-palette-primary-main)!important'
                      },
                      '& .MuiFormLabel-root.Mui-focused': {
                        color: 'var(--mui-palette-primary-main) !important'
                      }
                    }}
                  />
                  <Button variant='contained' color='primary'>
                    Subscribe
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography color='white' className='font-medium mbe-6 opacity-[0.92]'>
                Quick Access
              </Typography>
              <div className='flex flex-col gap-4'>
                <Typography component={Link} href='/front-pages/shortcuts/assets/request' color='white' className='opacity-[0.78]'>
                  Asset Request
                </Typography>
                <Typography component={Link} href='/front-pages/shortcuts/assets/tracking' color='white' className='opacity-[0.78]'>
                  Asset Tracking
                </Typography>
                <Typography component={Link} href='/front-pages/shortcuts/assets/return' color='white' className='opacity-[0.78]'>
                  Asset Return
                </Typography>
                <Typography component={Link} href='/' color='white' className='opacity-[0.78]'>
                  Admin Login
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography color='white' className='font-medium mbe-6 opacity-[0.92]'>
                Services
              </Typography>
              <div className='flex flex-col gap-4'>
                <Typography component={Link} href='/front-pages/landing-page' color='white' className='opacity-[0.78]'>
                  Asset Management
                </Typography>
                <Typography component={Link} href='/front-pages/landing-page' color='white' className='opacity-[0.78]'>
                  Inventory Control
                </Typography>
                <Typography component={Link} href='/front-pages/landing-page' color='white' className='opacity-[0.78]'>
                  Maintenance Scheduling
                </Typography>
                <Typography component={Link} href='/front-pages/landing-page' color='white' className='opacity-[0.78]'>
                  Reporting & Analytics
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Typography color='white' className='font-medium mbe-6 opacity-[0.92]'>
                Support
              </Typography>
              <div className='flex flex-col gap-4'>
                <Typography component={Link} href='/front-pages/landing-page#contact-us' color='white' className='opacity-[0.78]'>
                  Contact Support
                </Typography>
                <Typography component={Link} href='/front-pages/help-center' color='white' className='opacity-[0.78]'>
                  Help Center
                </Typography>
                <Typography color='white' className='opacity-[0.78]'>
                  Email: support@pertamina-ams.com
                </Typography>
                <Typography color='white' className='opacity-[0.78]'>
                  Phone: +62 21 3815 5111
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className='bg-[#211B2C]'>
        <div
          className={classnames(
            'flex flex-wrap items-center justify-center sm:justify-between gap-4 plb-[15px]',
            frontCommonStyles.layoutSpacing
          )}
        >
          <Typography className='text-white opacity-[0.92]' variant='body2'>
            <span>{`© ${new Date().getFullYear()}, PT Pertamina (Persero). All rights reserved. `}</span>
            <span>{`AMS - Asset Management System`}</span>
          </Typography>
          <div className='flex gap-1.5 items-center opacity-[0.78]'>
            <IconButton component={Link} size='small' href='https://www.pertamina.com' target='_blank'>
              <i className='ri-global-line text-white text-lg' />
            </IconButton>
            <IconButton component={Link} size='small' href='https://www.facebook.com/pertamina' target='_blank'>
              <i className='ri-facebook-fill text-white text-lg' />
            </IconButton>
            <IconButton component={Link} size='small' href='https://twitter.com/pertamina' target='_blank'>
              <i className='ri-twitter-fill text-white text-lg' />
            </IconButton>
            <IconButton component={Link} size='small' href='https://www.linkedin.com/company/pertamina' target='_blank'>
              <i className='ri-linkedin-fill text-white text-lg' />
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
