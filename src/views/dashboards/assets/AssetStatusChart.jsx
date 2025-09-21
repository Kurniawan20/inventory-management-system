'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const AssetStatusChart = ({ data }) => {
  const theme = useTheme()

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-background border border-border rounded-lg p-3 shadow-lg'>
          <Typography variant='body2' className='font-medium'>
            {payload[0].name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Count: {payload[0].payload.count}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Percentage: {payload[0].value}%
          </Typography>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => {
    return (
      <div className='flex flex-wrap gap-4 justify-center mt-4'>
        {payload?.map((entry, index) => (
          <div key={index} className='flex items-center gap-2'>
            <div
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: entry.color }}
            />
            <Typography variant='body2' color='text.secondary'>
              {entry.value} ({entry.payload.count})
            </Typography>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader
        title='Asset Distribution by Category'
        subheader='Current asset allocation across different categories'
      />
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey='value'
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default AssetStatusChart
