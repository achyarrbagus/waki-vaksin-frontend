import Link from 'next/link'
import Layout from '/components/Layout'
import Image from 'next/image'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"]))
        }
    };
}
export default function Contohsurat() {
    const { t } = useTranslation();

    return (
        <Layout title={t("cs-contohsurat")} back={`/`}>
            <div className=''>
                <Image
                    src={`/images/letter/${t("contoh-surat")}`}
                    alt="contohsurat"
                    width={480}
                    height={620}
                >
                </Image>
            </div>
            <div className='px-5 pt-6 justify-between items-center bg-white'>
                <div className="flex ">
                    <p className="font-bold text-2xl">{t("cb-footer")}</p>
                </div>
                <div className="flex pb-3">
                    <p className="text-lg">{t("cb-footer-desk")}</p>
                </div>
                <Link href="/surat">
                    <a
                        type="button"
                        className="bg-secondary-500 text-white font-bold block w-full text-center text-lg p-3 rounded-full"
                    >
                        {t("cb-footer-btn")}

                    </a>
                </Link>
            </div>

        </Layout >
    )
}
