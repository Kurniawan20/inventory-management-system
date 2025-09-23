// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import ElementOne from '@/assets/svg/front-pages/landing-page/ElementOne'
import Lines from '@assets/svg/front-pages/landing-page/Lines'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const FaqsData = [
  {
    id: 'panel1',
    question: 'How do I request a new asset?',
    answer:
      'You can request a new asset by using the Asset Request feature. Simply fill out the request form with details like asset type, justification, budget, and expected delivery date. The request will be routed through the appropriate approval workflow based on your department and the asset value.'
  },
  {
    id: 'panel2',
    question: 'How can I track my assigned assets?',
    active: true,
    answer:
      'Use the Asset Tracking feature to search for assets by ID, barcode, or name. You can view real-time location, condition, maintenance schedules, and assignment details. The system also provides detailed asset history and upcoming maintenance alerts.'
  },
  {
    id: 'panel3',
    question: 'What should I do when returning an asset?',
    answer:
      'When returning an asset, use the Asset Return form to specify the return reason, current condition, and any notes about the asset. The system will guide you through the return process and update the asset status in the inventory automatically.'
  },
  {
    id: 'panel4',
    question: 'How does maintenance scheduling work?',
    answer:
      'The system automatically schedules preventive maintenance based on asset type, usage patterns, and manufacturer recommendations. You will receive notifications before maintenance is due, and can track maintenance history and costs through the system.'
  }
]

const Faqs = () => {
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
    <section
      id='faq'
      ref={ref}
      className={classnames('flex flex-col gap-16 plb-[100px]', frontCommonStyles.layoutSpacing)}
    >
      <div className='flex flex-col items-center justify-center'>
        <div className='flex is-full justify-center items-center relative'>
          <ElementOne className='absolute inline-end-0' />
          <div className='flex items-center justify-center mbe-6 gap-3'>
            <Lines />
            <Typography color='text.primary' className='font-medium uppercase'>
              Faq
            </Typography>
          </div>
        </div>
        <div className='flex items-baseline flex-wrap gap-2 mbe-3 sm:mbe-2'>
          <Typography variant='h5'>Frequently asked</Typography>
          <Typography variant='h4' className='font-bold'>
            questions
          </Typography>
        </div>
        <Typography className='font-medium text-center'>
          Find answers to common questions about using the Asset Management System.
        </Typography>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5} className='text-center'>
          <img
            src='/images/front-pages/landing-page/sitting-girl-with-laptop.png'
            alt='girl with laptop'
            className='is-[80%] max-is-[320px]'
          />
        </Grid>
        <Grid item xs={12} lg={7}>
          {FaqsData.map((data, index) => {
            return (
              <Accordion key={index} defaultExpanded={data.active}>
                <AccordionSummary aria-controls={data.id + '-content'} id={data.id + '-header'} className='font-medium'>
                  {data.question}
                </AccordionSummary>
                <AccordionDetails>{data.answer}</AccordionDetails>
              </Accordion>
            )
          })}
        </Grid>
      </Grid>
    </section>
  )
}

export default Faqs
