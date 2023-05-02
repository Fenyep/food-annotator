import curvedArrow from '../../assets/curvedarrow.png';
import upload from '../../assets/upload.svg';
import csv from '../../assets/csv-icon.svg';
import fileicon from '../../assets/file.svg';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MainContext } from '../../context/MainContext';
import './Main.css';
import { formatTime } from '../../utils/utils';


const Main = () => {
  // Main state handler
  const mainContext = useContext(MainContext);
  const { t } = useTranslation();

  const displayTimeTaken = () => {
    if(mainContext?.timeTaken && mainContext.timeTaken > 0) {
      return formatTime(mainContext.timeTaken);
    } else {
      return "00:00:00"
    }
  }

  return (
    <div className='main relative w-full h-[90%] flex flex-col justify-center items-center leading-4'>
        <div className='flex flex-col justify-center items-center leading-4'>
            <div className='font-bold text-white text-6xl lg:text-7xl font-poppinsbold text-indigo-600'>
              {t('main.title1')}
            </div>
            <div className='font-bold text-white text-5xl lg:text-6xl font-poppinsbold mt-4'>
              {t('main.title2')}
            </div>
            <div className='font-bold text-gray-400 text-md font-poppinsmedium mt-4'>
              {t('main.subtitle')}
            </div>
        </div>
        <img className='absolute bottom-[60%] left-[25%] w-[3em] h-[8em]' src={curvedArrow} alt="" />
          
        <div className='mt-12 w-[70%] h-[60%] bg-black bg-opacity-[0.7] rounded-xl px-16 py-12'>
            <div className='relative w-full h-[50%] rounded-xl border-2 border-dashed border-white'>
        {<div className='absolute -top-1/4 font-poppinssemibold left-1/2 transform -translate-x-1/2 -translate-y-1/2" rounded-lg bg-indigo-800 p-2 text-center'>          
          {displayTimeTaken()}
        </div>}
                {mainContext?.files.length > 0 ? (
                    <div className='absolute -top-4 -right-4 px-3 py-2 font-poppinsbold bg-indigo-800 text-white rounded-full'>{mainContext?.files.length}</div>
                ): (null)}
                <form id="form-file-upload" onDragEnter={mainContext?.handleDragEvent} onSubmit={(e) => e.preventDefault()}>
                    <input ref={mainContext?.inputFieldRef} accept='text/csv' type="file" name='file' id="input-file-upload" multiple={true} onChange={mainContext?.handleChangeEvent} />
                    <label id="label-file-upload" htmlFor="input-file-upload" className={mainContext?.dragActive ? "drag-active" : "" }>
                        <div className='flex flex-col justify-center items-center'>
                            <img className='w-[4.2em] mb-3' src={upload} alt="upload-vector" />
                            <div className='flex flex-col justify-center items-center'>
                              <p className='mb-2 font-poppinsmedium'>
                                {t('main.action.indication1')}
                              </p>
                              <div className='flex items-center'>
                                <hr className='h-[0.05em] mr-1 w-[6em] bg-gray-800' />
                                  <span className='font-poppnslight my-1 text-sm'>
                                    {t('or')}
                                  </span>
                                <hr className='h-[0.05em] ml-1 w-[6em] bg-gray-800' />
                              </div>
                              <button className="upload-button bg-gray-700 p-1 rounded-lg flex items-center font-poppinsmedium" onClick={mainContext?.onButtonClickEvent}>
                                <img className='mr-1 w-[1em]' src={fileicon} alt="" />
                                <span>
                                  {t('main.action.indication2')}
                                </span>
                              </button>
                            </div>
                        </div> 
                    </label>
                    { mainContext?.dragActive && <div id="drag-file-element" className='bg-gray-300/[.09] h-full' onDragEnter={mainContext?.handleDragEvent} onDragLeave={mainContext?.handleDragEvent} onDragOver={mainContext?.handleDragEvent} onDrop={mainContext?.handleDropEvent}></div> }
                </form>
            </div>

            <div className='files-wrapper h-[50%] overflow-y-scroll text-white py-4'>
                {
                    mainContext?.files.map((elmt: File) => (
                        <div key={elmt.name + elmt.lastModified} className='w-full flex items-center justify-between h-[3em] mb-2 py-2 px-4 bg-indigo-800 rounded-lg'>
                            <div className='flex'>
                                <img className='w-[2em] mr-2' src={csv} alt="" />
                                <div className='flex flex-col'>
                                  <div className='font-poppinssemibold'>
                                      {elmt.name}
                                  </div>
                                  <div className='text-sm  font-poppinslight'>
                                      {elmt.size} {t('bytes')}
                                  </div>
                                </div>
                            </div>
                            <button className='border-2 px-2 py-1  rounded-full' onClick={() => mainContext?.handleRemoveEvent(elmt.lastModified, elmt.name)}>X</button>
                        </div>
                    ))
                }
            </div>
            <div className={`flex justify-between mt-2 w-full`}>
                {mainContext?.files.length > 0 ? (
                  <>
                  {mainContext?.download && mainContext?.download == true ?
                  (
                    <a href={mainContext.downloadUrl} download="annotations.zip" className='py-2 px-4 font-poppinssemibold bg-white text-indigo-800 rounded-md' onClick={mainContext?.handleDownloadEvent}>{t('download')}</a>
                  ) : (
                    <div></div>
                  )
                  }

                    <div className='flex'>
                      <button className='py-2 px-4 font-poppinssemibold bg-gray-600 text-white rounded-md' onClick={mainContext?.handleClearEvent}>{t('clear')}</button>
                      <div className='w-2'></div>
                      <button className={`py-2 px-4 font-poppinssemibold ${mainContext?.files.length > 0 ? 'bg-indigo-800' : 'bg-gray-400'} text-white rounded-md`} onClick={mainContext?.handleSubmitEvent}>
                        
                        {mainContext?.loading ? ( 
                          <div className='flex items-center '>
                          <div>
                            {t('annotation')}
                          </div>
                            <div className="ml-2 flex justify-center items-center">
                              <div className="relative">
                                <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-dashed border-white"></div>
                              </div>
                            </div>
                          </div>
                        ) : (<div>
                          {t('annotate')}
                        </div>)}
                      </button>
                    </div>
                  </>
                ) : (null)}
            </div>
        </div>
    </div>
  )
}

export default Main