import Link from "next/link"
import Layout from "/components/Layout"
import Image from "next/image"
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"]))
        }
    };
}

export default function Contohbuatsurat() {
    const { t } = useTranslation();

    return (
        <Layout title={t("cb-suratsakit")} back={"/"}>
            <div className="bg-primary-700 pb-4">
                {/* lsit cara buat */}


                <div className="mx-5 pt-6">
                    <div className="flex flex-row px-4 py-4 justify-between items-center">
                        <div className="mr-4 w-1/6">
                            <Image
                                src="/images/icons/c1.png"
                                alt="suratsakit"
                                width={60}
                                height={60}
                            />
                        </div>
                        <div className="w-5/6">
                            <h3 className="font-bold text-white">{t("cb-step-1")}</h3>
                            <p className="text-white">{t("cb-step-1-desk")}</p>
                        </div>
                    </div>
                </div>
                <div className="mx-5">
                    <div className="flex flex-row px-4 py-4 justify-between items-center">
                        <div className="mr-4 w-1/6">
                            <Image
                                src="/images/icons/c2.png"
                                alt="suratsakit"
                                width={60}
                                height={60}
                            />
                        </div>
                        <div className="w-5/6">
                            <h3 className="font-bold text-white">{t("cb-step-2")}</h3>
                            <p className="text-white">{t("cb-step-2-desk")}</p>
                        </div>
                    </div>
                </div>
                <div className="mx-5">
                    <div className="flex flex-row px-4 py-4 justify-between items-center">
                        <div className="mr-4 w-1/6">
                            <Image
                                src="/images/icons/c3.png"
                                alt="suratsakit"
                                width={60}
                                height={60}
                            />
                        </div>
                        <div className="w-5/6">
                            <h3 className="font-bold text-white">{t("cb-step-3")}</h3>
                            <p className="text-white">{t("cb-step-3-desk")}</p>
                        </div>
                    </div>
                </div>
                <div className="mx-5 mb-8">
                    <div className="flex flex-row px-4 py-4 justify-between items-center">
                        <div className="mr-4 w-1/6">
                            <Image
                                src="/images/icons/c4.png"
                                alt="suratsakit"
                                width={60}
                                height={60}
                            />
                        </div>
                        <div className="w-5/6">
                            <h3 className="font-bold text-white">{t("cb-step-4")}</h3>
                            <p className="text-white">{t("cb-step-4-desk")}</p>
                        </div>
                    </div>
                </div>


            </div >
            <div className="px-5 pt-6 justify-between items-center">
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
