import Layout from "@/components/Layout"
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import React from "react";
import { fever_risk_id, fever_risk_en } from "@/constant/fever"
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext } from "react";
import AppContext from "@/components/AppContext"
import * as Yup from 'yup'

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "fever"]))
        }
    };
}


const TwoSchema = Yup.object().shape({
    qr1: Yup.string().required('Required'),
    qr2: Yup.string().required('Required'),
})

export default function Two() {
    const router = useRouter()

    const [showModal, setShowModal] = React.useState(false)
    const { t, i18n } = useTranslation(["common", "fever"]);
    const context = useContext(AppContext)

    const onSubmitForm = async (values) => {
        var data = {
            qr1_list: values.qr1,
            qr2: values.qr2,
            qr2_1: values.qr2_1,
        }
        context.setqr(data)
        context.seturls('fever')
        router.push('/step/data_diri')
    }
    const risk = i18n.language == 'id' ? fever_risk_id : fever_risk_en;

    return (
        <Layout title={t("step-2-title")} back={'/step/fever/one'}>
            <div className="flex flex-wrap justify-between items-center px-5 pt-5 bg-white overflow-hidden w-full">
                <Formik
                    initialValues={{ qr1: '', qr2: '', qr2_1: '' }}
                    validationSchema={TwoSchema}
                    onSubmit={onSubmitForm}>
                    {({ errors, touched }) => (
                        <Form className="flex flex-col justify-between min-h-screen pb-6 w-full">
                            <div className='flex flex-col mb-32'>
                                <div className='py-5 5my-5'>
                                    <h1 className='text-left text-3xl text-gray-700 font-black'>{t("step-2-title-1")}</h1>
                                    <p className='text-md text-gray-600 text-sm font-normal'>{t("step-2-title-2")}</p>
                                </div>
                                <div className='py-2'>
                                    <p className='font-bold text-gray-700 text-sm'>{t("qr1", { ns: 'fever' })}</p>
                                </div>
                                <hr className='decoration-dashed mb-3' />
                                <div className='px-4 mb-4'>
                                    <ul className="list-decimal">
                                        {
                                            risk.slice(0, 5).map((item, index) => {
                                                return (
                                                    <li key={index} className='mb-3'><p>{item.value}</p></li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <button onClick={() => setShowModal(true)} type="button" className="text-warning-500 underline">{t("step-2-title-3-2")}</button>
                                </div>
                                <div className='flex flex-row form-check mb-4'>
                                    <label className='text-sm align-middle form-check-label inline-block'>
                                        <Field type="radio" name="qr1" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                        {t("yes")}
                                    </label>
                                    <label className='text-sm align-middle form-check-label inline-block'>
                                        <Field type="radio" name="qr1" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                        {t("no")}
                                    </label>
                                    {errors.qr1 && touched.qr1 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr1}</div>}
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr2", { ns: 'fever' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr2" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr2" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr2 && touched.qr2 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr2}</div>}
                                    </div>
                                    <div className="mt-3">
                                        <Field name="qr2_1" className="w-full py-2 px-3 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1" type="text" placeholder={t("step-2-title-4-2")} />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="text-sm text-info-400 bg-info-200 rounded-lg">
                                        <p className="p-4">{t("step-2-title-5")} <strong>{t("next")}</strong> {t("step-2-title-5-2")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='max-w-layout fixed flex flex-col bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 py-5 px-3'>
                                <button
                                    type="submit"
                                    className="bg-secondary-500 text-white font-bold block w-full text-center text-sm p-3 rounded-full"
                                >
                                    {t("next")}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            {showModal ? (
                <>
                    <div id="defaultModal" tabIndex="-1" className="mx-auto max-w-layout justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none fixed z-50 md:inset-0 h-modal md:h-full">
                        <div className="relative p-4 w-full h-4/5">
                            <div className="relative bg-white rounded-lg shadow ">
                                <div className="p-6 space-y-6">
                                    <ul className="list-decimal">
                                        {
                                            risk.map((item, index) => {
                                                return (
                                                    <li key={index} className='ml-4 pt-2'><p>{item.value}</p></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                                    <button data-modal-toggle="defaultModal" onClick={() => setShowModal(false)} type="button" className="bg-secondary-500 text-white font-bold block w-full text-center text-sm p-3 rounded-full">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </Layout >
    )
}
