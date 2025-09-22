// Next Imports
import Image from 'next/image'

const Logo = props => {
  return (
    <Image
      src='/images/logo-effiework.png'
      alt='Effiework Logo'
      width={160}
      height={50}
      style={{ objectFit: 'contain' }}
      {...props}
    />
  )
}

export default Logo
