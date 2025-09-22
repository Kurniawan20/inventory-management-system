// Next Imports
import Image from 'next/image'

const Logo = props => {
  return (
    <img
      src='/images/Pertamina_Logo.svg.png'
      alt='Pertamina Logo'
      width={160}
      height={50}
      style={{ objectFit: 'contain' }}
      {...props}
    />
  )
}

export default Logo
