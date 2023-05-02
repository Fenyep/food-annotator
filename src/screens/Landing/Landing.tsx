import { ReactNode } from 'react'
import './css/Landing.css';
import indigoblob from '../../assets/blob-indigo.svg';
import greyblob from '../../assets/blob-grey.svg';
import man3d from '../../assets/3d-man.png';


type Props = {
  children: string | JSX.Element | JSX.Element[] | ReactNode
  // | {() : JSX.Element}
}

const Landing = ({ children }: Props ) => {
  return (
    <>
        <div className='landing-blur relative w-[100vw] h-[100vh]'>
          <img className='absolute w-[9em] top-[35%] right-[18%]' src={indigoblob} alt="indigo-blob" />
          <img className='absolute w-[7em] top-[18%] left-[25%]' src={greyblob} alt="indigo-blob" />
          <img className='absolute w-[35em] top-[5.5%] z-20 right-[20%]' src={man3d} alt="indigo-blob" />
          {/* <img className='absolute w-[7em] bottom-[20%] left-[40%]' src={whiteblob} alt="indigo-blob" /> */}
          {children}
        </div>
    </>
  )
}

export default Landing