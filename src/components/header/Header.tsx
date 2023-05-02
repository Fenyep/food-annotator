// Hooks
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
// Images
import arrowRight from '../../assets/arrow-right.svg';
import logo from '../../assets/logo.svg';

// Context
import { LanguageContext } from '../../context/LanguageContext'

const Header = () => {
  const { t } = useTranslation();

  return (
    <nav className='header-container w-full h-[10%] md:flex items-center justify-between px-20 '>
        <div className='flex items-center'>
          <img className='' src={logo} alt="arrow-right" />
          <div className='header-logo text-white text-2xl font-poppinsbold'><em>FA.</em></div>
        </div>
        <div className='header-links'>
          <ul className='header flex list-none'>
            <HeaderLink name={t('header.home')} link={"#"} />
            <LanguageHeaderLink name={t('header.language')} link={"#"} />
            <HeaderLink name={t('header.share')} link={"#"} />
            <HeaderLink name={"FAQ"} link={"#"} />
          </ul>
        </div>
        <div className='header-cta'>
          <button className='start-cta flex flex-col justify-center items-center text-white border-2 border-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300 px-4 py-2 rounded-full sm:text-sm lg:text-lg font-poppinsmedium'>
            <div>{t('header.start')}</div>
              <img className='' src={arrowRight} alt="arrow-right" />
            </button>
        </div>
    </nav>
  )
}

type HeaderLinkProps = {
  name: String | null,
  link: String
}

const HeaderLink = ({ name , link }: HeaderLinkProps) => {
  return (
    <li className='relative mx-4 lg:mx-8 group'>
      <a className='text-white text-lg text-bold font-poppinsmedium' href={`${link}`}>
        {name ?? ""}
      </a>
      <div className="w-0 h-1 bg-indigo-500 rounded-lg transition delay-150 ease-in group-hover:w-full duration-1000"></div>
      <div className='hidden group-hover:block absolute w-32 h-32 bg-red-500 -translate-x-[20%] z-20'>

      </div>
    </li>
  )
}
const LanguageHeaderLink = ({ name , link }: HeaderLinkProps) => {

  const langContext = useContext(LanguageContext);
  const { i18n } = useTranslation();  

  return (
    <li className='relative mx-4 lg:mx-8 group'>
      <a className='text-white text-lg text-bold font-poppinsmedium' href={`${link}`}>
        {name ?? ""}
      </a>
      <div className="w-0 h-1 bg-indigo-500 rounded-lg transition delay-150 ease-in group-hover:w-full duration-1000"></div>
      <div className='hidden group-hover:block absolute min-w-[150px] h-auto bg-black bg-opacity-[0.7] rounded-xl -translate-x-[20%] z-20'>
        {
          Object.keys(langContext?.langs ?? {}).map((lng, index) => (
            <div className=''>
              <button className={`text-white px-3 py-2 ${index == Object.keys(langContext?.langs ?? {}).length - 1 ? "pt-0": "pt-2"} flex items-center ${i18n.resolvedLanguage === lng ? "font-poppinssemibold" : "font-poppinslight"} `} key={lng} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                <img className='w-6 h-6 mr-2' src={langContext?.getLangIcon(lng)} alt={lng} />
                {langContext?.langs?.[lng]?.nativeName}
              </button>
              {index == Object.keys(langContext?.langs ?? {}).length - 1 ? null : (<hr className='w-full h-2' />)}
            </div>
          ))
        }
      </div>
    </li>
  )
}

export default Header