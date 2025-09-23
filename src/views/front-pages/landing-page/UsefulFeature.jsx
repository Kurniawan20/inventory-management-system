// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import Lines from '@assets/svg/front-pages/landing-page/Lines'
import LaptopCharging from '@assets/svg/front-pages/landing-page/LaptopCharging'
import TransitionUp from '@assets/svg/front-pages/landing-page/TransitionUp'
import Edit from '@assets/svg/front-pages/landing-page/Edit'
import Cube from '@assets/svg/front-pages/landing-page/Cube'
import LifeBuoy from '@assets/svg/front-pages/landing-page/Lifebuoy'
import Document from '@assets/svg/front-pages/landing-page/Document'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const feature = [
  {
    icon: <LaptopCharging />,
    title: 'Asset Tracking',
    description: 'Real-time tracking of all assets with barcode scanning and location monitoring capabilities.'
  },
  {
    icon: <TransitionUp />,
    title: 'Maintenance Scheduling',
    description: 'Automated maintenance scheduling with alerts and preventive maintenance workflows.'
  },
  {
    icon: <Edit />,
    title: 'Request Management',
    description: 'Streamlined asset request process with approval workflows and budget tracking.'
  },
  {
    icon: <Cube />,
    title: 'Inventory Control',
    description: 'Complete inventory management with stock levels, procurement, and asset lifecycle tracking.'
  },
  {
    icon: <LifeBuoy />,
    title: 'Compliance Ready',
    description: 'Built-in compliance features for regulatory requirements and audit trails.'
  },
  {
    icon: <Document />,
    title: 'Comprehensive Reports',
    description: 'Detailed analytics and reporting for asset utilization, costs, and performance metrics.'
  }
]

const UsefulFeature = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef(null)

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id='features' ref={ref} className='bg-backgroundPaper'>
      <div className={classnames('flex flex-col gap-12 plb-[100px]', frontCommonStyles.layoutSpacing)}>
        <div className={classnames('flex flex-col items-center justify-center')}>
          <div className='flex items-center justify-center mbe-6 gap-3'>
            <Lines />
            <Typography color='text.primary' className='font-medium uppercase'>
              Key Features
            </Typography>
          </div>
          <div className='flex items-baseline max-sm:flex-col gap-x-2 mbe-3 sm:mbe-2'>
            <Typography variant='h4' className='font-bold'>
              Complete Asset Management
            </Typography>
            <Typography variant='h5'>for enterprise operations</Typography>
          </div>
          <Typography className='font-medium text-center'>
            Comprehensive solution designed specifically for Pertamina's asset management requirements.
          </Typography>
        </div>
        <div>
          <Grid container rowSpacing={12} columnSpacing={6}>
            {feature.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  <div className={classnames('mbe-2', styles.featureIcon)}>
                    <div className='flex items-center border-2 rounded-full p-5 is-[82px] bs-[82px]'>{item.icon}</div>
                  </div>
                  <Typography variant='h5'>{item.title}</Typography>
                  <Typography className='max-is-[364px] text-center'>{item.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default UsefulFeature
