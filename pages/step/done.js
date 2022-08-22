import Layout from '/components/Layout'
import Image from 'next/image'
import Footer from "/components/Footer"
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"]))
        }
    };
}
export default function Done() {
    const { t } = useTranslation();

    return (
        <Layout title="" back={'/'}>
            <div className="min-h-screen bg-primary-700 place-content-center">
                <div className='flex flex-col justify-center items-center pt-28'>
                    <Image
                        src="/images/icons/done.png"
                        alt="done"
                        width={120}
                        height={120}
                    >
                    </Image>
                </div>
                <div className='flex flex-col px-5 pt-4 items-center bg-primary-700'>
                    <div className="flex justify-center items-center mb-3">
                        <p className="basis-3/4 text-white text-2xl font-bold text-center">{t("step-done-title-1")}</p>
                    </div>
                    <div className="flex justify-center items-center mb-3">
                        <p className="basis-3/4 text-white text-center">{t("step-done-title-2")}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout >
    )
}
