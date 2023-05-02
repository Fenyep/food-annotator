import { LanguageContext } from "../context/LanguageContext";
import { ReactChildren } from "../interfaces/myContextType";
// import { DateTime } from 'luxon';
// Images
import enIcon from '../assets/flag_en.png';
import frIcon from '../assets/flag_fr.png';

export const LanguageProvider = ({ children }: ReactChildren) => {

    const languages = {
        en: { nativeName: "English" },
        fr: { nativeName: 'French' }
    }

    const getLanguageIcon = (languageCode: string) : string => {
        switch (languageCode) {
            case "en":
                return enIcon;
            case "fr":
                return frIcon;
            default:
                return enIcon;
        }
    }

    // Make the luxon package to work
    // const getGreetingTime = (d = DateTime.now()) => {
    //     const split_afternoon = 12; // 24hr time to split the afternoon
    //     const split_evening = 17; // 24hr time to split the evening
    //     const currentHour = parseFloat(d.toFormat('hh'));
    
    //     if (currentHour >= split_afternoon && currentHour <= split_evening) {
    //         return 'afternoon';
    //     } else if (currentHour >= split_evening) {
    //         return 'evening';
    //   }
    //     return 'morning';
    // }

    const value = {
        langs: languages,
        getLangIcon: getLanguageIcon
    }

    return (
        <LanguageContext.Provider value={value} >
            {children}
        </LanguageContext.Provider>
    );

}