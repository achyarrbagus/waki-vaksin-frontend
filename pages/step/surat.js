import Link from 'next/link'
import Layout from '/components/Layout'
import Image from 'next/image'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from 'next/router'
import { useState, useContext } from "react";
import AppContext from "@/components/AppContext"


export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["letter", "common"]))
        }
    };
}

function getAge(dateString) {
    var ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
}

export default function Surat() {
    const context = useContext(AppContext)
    const { t, i18n } = useTranslation(['letter', "common"]);
    const { query } = useRouter();
    const phone = query.phone
    const uid = query.uid
    const name = query.name
    var today = new Date()
    var datesnow = '';
    var datesnow2 = '';
    var days = context.state.days.match(/\d/g) - 1
    if (i18n.language == 'id') {
        const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        datesnow = today.getDate() + ' ' + (month[today.getMonth()]) + ' ' + today.getFullYear()
        datesnow2 = today.getDate() + days + ' ' + (month[today.getMonth()]) + ' ' + today.getFullYear()

    } else {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        datesnow = today.getDate() + ' ' + (month[today.getMonth()]) + ' ' + today.getFullYear()
        datesnow2 = today.getDate() + days + ' ' + (month[today.getMonth()]) + ' ' + today.getFullYear()
    }

    var bg = (i18n.language == 'id') ? 'bg-letter-id' : 'bg-letter-en';
    return (
        <Layout title={t("cs-contohsurat")} back={'/'}>
            <div className={bg}>
                <p className="text_header">{t("title")}</p>
                <p className="text_header-2">{t("h1")}</p>
                <p className="text-name-doctor"><b>dr. Wahyu Setiawan</b></p>
                <p className="text_header-3">{t("h2")}</p>
                <table className="table-patient">
                    <tr className="px-3">
                        <td>{t("name")}</td>
                        <td>:</td>
                        <td>{context.state.data_diri.name}</td>
                        <td className="pl-5">{t("pria", { ns: 'common' })} / {t("wanita", { ns: 'common' })}</td>
                    </tr>
                    <tr className="px-3">
                        <td>{t("age")}</td>
                        <td>:</td>
                        <td>{getAge(context.state.data_diri.dateofbirth)} {t("tahun")}</td>
                    </tr>
                    <tr className="px-3">
                        <td>{t("occupation")}</td>
                        <td>:</td>
                        <td></td>
                    </tr>
                    <tr className="px-3">
                        <td>{t("address")}</td>
                        <td>:</td>
                        <td></td>
                    </tr>
                </table>
                <p className="text_header-4">{t("h3")} {context.state.days} {t("h3-1")}</p>
                <p className="text_header-5">{t("h4")} {datesnow} {t("h4_2")} {datesnow2}</p>
                <p className="text_header-6">{t("h5")}</p>
                <p className="text_header-7">{t("h6")}.</p>
                <div className="ttd">
                    <p className="date">Jakarta, {datesnow}</p>
                    <Image
                        src={'/images/letter/wahyu.png'}
                        alt="payment"
                        width={90}
                        height={45}
                    >
                    </Image>
                    <p className="date-doc"><b>dr Wahyu Setiawan</b></p>
                </div>
            </div>
            <div className='max-w-layout fixed flex flex-col bottom-0 left-0 right-0 bg-white mx-auto border-t border-gray-150 z-30 py-3 px-3'>
                <div className="my-4">
                    <Link href={`/step/payment?phone=${phone}&uid=${uid}&name=${context.state.data_diri.name}`}>
                        <a
                            type="button"
                            className="bg-secondary-500 text-white font-bold block w-full text-center text-lg p-3 rounded-full"
                        >
                            {t("step-surat-payment", { ns: 'common' })}
                        </a>
                    </Link>
                </div>
            </div>
        </Layout >
    )
}
