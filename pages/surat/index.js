import Link from "next/link"
import Layout from "/components/Layout"
import Footer from "/components/Footer"
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

export default function Buat_surat() {
    const { t } = useTranslation();

    return (
        <Layout title={t("sr-title")} back="/">
            <div className="px-5 pt-5 bg-white overflow-hidden">
                <div className="flex justify-between items-center ">
                    <div className="my-4 px-4 overflow-hidden">
                        <Link href="/step/fever/one">
                            <a>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src="/images/jenis_penyakit/demam.webp"
                                        alt="img"
                                        width={480}
                                        height={480}
                                    >
                                    </Image>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-center">{t("sr-Fever")}</p>
                                </div>
                            </a>
                        </Link>
                    </div>

                    <div className="my-4 px-4 overflow-hidden">
                        <Link href="/step/flu/one">
                            <a>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src="/images/jenis_penyakit/flu.webp"
                                        alt="img"
                                        width={480}
                                        height={480}
                                    >
                                    </Image>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-center">{t("sr-flu")}</p>
                                </div>
                            </a>
                        </Link>

                    </div>

                    <div className="my-4 px-4 overflow-hidden">
                        <Link href="/step/kandungkemih/one">
                            <a>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src="/images/jenis_penyakit/kandungkemih.webp"
                                        alt="img"
                                        width={480}
                                        height={480}
                                    >
                                    </Image>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-center">{t("sr-Bladder")}</p>
                                </div>
                            </a>
                        </Link>

                    </div>
                </div>
                <div className="flex justify-between items-center ">
                    <div className="my-4 px-4 overflow-hidden">
                        <Link href="/step/vaksin/one">
                            <a>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src="/images/jenis_penyakit/keluhanvaksin.webp"
                                        alt="img"
                                        width={480}
                                        height={480}
                                    >
                                    </Image>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-center">{t("sr-vac")}</p>
                                </div>
                            </a>
                        </Link>

                    </div>

                    <div className="my-4 px-4 overflow-hidden">
                        <Link href="/step/migraine/one">
                            <a>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src="/images/jenis_penyakit/migrain.webp"
                                        alt="img"
                                        width={480}
                                        height={480}
                                    >
                                    </Image>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-center">{t("sr-Migraine")}</p>
                                </div>
                            </a>
                        </Link>

                    </div>

                    <div className="my-4 px-4 overflow-hidden">
                        <Link href="/step/haid/one">
                            <a>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src="/images/jenis_penyakit/nyerihaid.webp"
                                        alt="img"
                                        width={480}
                                        height={480}
                                    >
                                    </Image>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-center">{t("sr-Menstrual_Pain")}</p>
                                </div>
                            </a>
                        </Link>

                    </div>
                </div>
                <div className="flex justify-between items-center ">
                    <div className="my-4 px-4 overflow-hidden">
                        <Link href="/step/backpain/one">
                            <a>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src="/images/jenis_penyakit/nyeripunggung.webp"
                                        alt="img"
                                        width={480}
                                        height={480}
                                    >
                                    </Image>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-center">{t("sr-Back_pain")}</p>
                                </div>
                            </a>
                        </Link>

                    </div>

                    <div className="my-4 px-4 overflow-hidden">
                        <Link href="/step/sakitperut/one">
                            <a>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src="/images/jenis_penyakit/sakitperut.webp"
                                        alt="img"
                                        width={480}
                                        height={480}
                                    >
                                    </Image>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-center">{t("sr-Stomach_ache")}</p>
                                </div>
                            </a>
                        </Link>

                    </div>

                    <div className="my-4 px-4 overflow-hidden">
                        <Link href="/step/stress/one">
                            <a>
                                <div className="flex flex-col justify-center">
                                    <Image
                                        src="/images/jenis_penyakit/stress.webp"
                                        alt="img"
                                        width={480}
                                        height={480}
                                    >
                                    </Image>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-center">{t("sr-Stress")}</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex px-5 pt-5 bg-white">
                <div className="w-full bg-gradient-to-r from-primary-700 to-primary-600 rounded-xl p-2">
                    <div className="flex justify-center items-center">
                        <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.077 0C5.3666 0 0.732056 4.48 0.732056 10C0.732056 15.52 5.3666 20 11.077 20C16.7874 20 21.422 15.52 21.422 10C21.422 4.48 16.7874 0 11.077 0ZM12.1115 17H10.0425V15H12.1115V17ZM14.2529 9.25L13.3219 10.17C12.577 10.9 12.1115 11.5 12.1115 13H10.0425V12.5C10.0425 11.4 10.508 10.4 11.2529 9.67L12.5357 8.41C12.9184 8.05 13.146 7.55 13.146 7C13.146 5.9 12.215 5 11.077 5C9.93908 5 9.00803 5.9 9.00803 7H6.93904C6.93904 4.79 8.79078 3 11.077 3C13.3633 3 15.215 4.79 15.215 7C15.215 7.88 14.8426 8.68 14.2529 9.25Z" fill="white" />
                        </svg>
                        <p className="text-white px-2 text-lg"><b>{t("any-q")}</b> {t("any-q-desc")}</p>
                    </div>
                    <div className="flex justify-center py-4">
                        <Link href="https://api.whatsapp.com/send/?phone=6281281881802&text&app_absent=0">
                            <a className="font-bold text-white text-lg text-center px-3 py-2 border-2 border-white rounded-full">{t("c-w")}</a>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout >
    )
}
