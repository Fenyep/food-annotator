import logo from '../../assets/logo.svg';

const Loader = () => {
  return (
    <div className='flex items-center animate-bounce'>
        <img className='' src={logo} alt="arrow-right" />
        <div className='header-logo text-white text-2xl font-poppinsbold'><em>FA.</em></div>
    </div>
  )
}

export default Loader