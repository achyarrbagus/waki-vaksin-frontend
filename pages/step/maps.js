import Layout from '/components/Layout'
import Maps from "/components/Maps"
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from 'next/router'

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"]))
        }
    };
}
export default function Done() {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <Layout title="" back={'/'}>
            <div className="min-h-screen  place-content-center">
                <div className='flex flex-col justify-center items-center'>
                    <Maps />
                </div>
                <div className='max-w-layout fixed flex fl2ex-col bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 py-5 px-3'>
                    <button
                        onClick={() => router.back()}
                        type="button"
                        className="bg-secondary-500 text-white font-bold block w-full text-center text-sm p-3 rounded-full"
                    >
                        {t("next")}
                    </button>
                </div>
            </div>
        </Layout >
    )
}
