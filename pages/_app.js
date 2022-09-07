import '@/styles/font.css'
import 'antd/dist/antd.css'
import '@/styles/scss/tailwind.scss'
import '@/styles/scss/globals.scss'
import '@/styles/scss/custom/index.scss'
import 'sendbird-uikit/dist/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { appWithTranslation } from 'next-i18next';
import { useState, createContext, useEffect } from "react";
import AppContext from "@/components/AppContext"
import TagManager from 'react-gtm-module'
import { switchGTM } from '/helpers/gtm'
import { switchGTM2 } from '/helpers/gtm2'
import { useTranslation } from 'next-i18next';
import { ThemeProvider } from "@material-tailwind/react";

// const AppContext = createContext();
function MyApp({ Component, pageProps }) {
    const { i18n } = useTranslation();

    const tagManagerArgs = {
        gtmId: switchGTM(i18n.language),
    }

    const tagManagerArgs2 = {
        gtmId: switchGTM2(i18n.language),
    }

    useEffect(() => {
        if (tagManagerArgs.gtmId != '') {
            TagManager.initialize(tagManagerArgs)
        }

        if (tagManagerArgs2.gtmId != '') {
            TagManager.initialize(tagManagerArgs2)
        }

    })
    const customTheme = {
      tabsHeader: {
        styles: {
          base: {
            width: "w-full",
            border: "border-none",
            radius: "rounded-none",
            background: "bg-white",
          },
        },
      },
      tab: {
        styles: {
          base: {
            tab: {
              initial: {
                display: "grid",
                placeItems: "place-items-center",
                color: "text-secondary-500",
                font: "font-bold",
                border: "border-b-2 border-secondary-500",
              },
              disabled: {
                color: "text-secondary-500",
                font: "font-bold",
                border: "border-b-2 border-secondary-500",
                background: "bg-secondary-500",
              },
            },
          },
        },
      },
    };

    const [qf, setqf] = useState('')
    const [qr, setqr] = useState('')
    const [data_diri, setdata_diri] = useState('')
    const [addr, setAddr] = useState('')
    const [slugs, setSlugs] = useState('')
    const [urls, seturls] = useState('/surat')
    const [email, setEmail] = useState('')
    const [work, setWork] = useState('')
    const [gender, setGender] = useState('')
    const [days, setDays] = useState('')
    return (
        <ThemeProvider value={customTheme}>
            <AppContext.Provider value={{
                state: {
                    qf: qf,
                    qr: qr,
                    urls: urls,
                    addr: addr,
                    slugs: slugs,
                    data_diri: data_diri,
                    email: email,
                    work: work,
                    gender: gender,
                    days: days
                },
                setqf: setqf,
                setqr: setqr,
                seturls: seturls,
                setAddr: setAddr,
                setSlugs: setSlugs,
                setdata_diri: setdata_diri,
                setEmail: setEmail,
                setWork: setWork,
                setGender: setGender,
                setDays: setDays,
            }}>
                <Component {...pageProps} />
            </AppContext.Provider >
        </ThemeProvider>
    )
}

export default appWithTranslation(MyApp);