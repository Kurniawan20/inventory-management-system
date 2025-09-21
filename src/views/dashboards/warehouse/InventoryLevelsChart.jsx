'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const InventoryLevelsChart = ({ data }) => {
  const theme = useTheme()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-background border border-border rounded-lg p-3 shadow-lg'>
          <p className='font-medium'>{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader
        title='Inventory Movement Trends'
        subheader='Monthly inbound, outbound, and stock levels'
      />
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey='inbound' fill='#82ca9d' name='Inbound' />
            <Bar dataKey='outbound' fill='#8884d8' name='Outbound' />
            <Bar dataKey='stock' fill='#ffc658' name='Current Stock' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default InventoryLevelsChart
