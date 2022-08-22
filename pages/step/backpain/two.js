import Layout from "@/components/Layout"
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import React from "react";
import { backpain_risk_id, backpain_risk_en, backpain_risk2_id, backpain_risk2_en } from "@/constant/backpain"
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useContext } from "react";
import AppContext from "@/components/AppContext"
import * as Yup from 'yup'

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "backpain"]))
        }
    };
}

const TwoSchema = Yup.object().shape({
    qr1: Yup.string().required('Required'),
    qr2: Yup.string().required('Required'),
    qr3: Yup.string().required('Required'),
    qr4: Yup.string().required('Required'),
    qr5: Yup.string().required('Required'),
    qr6: Yup.string().required('Required'),
    qr7: Yup.string().required('Required'),
    qr8: Yup.string().required('Required'),
    qr9: Yup.string().required('Required'),
    qr10: Yup.string().required('Required'),
    qr11: Yup.string().required('Required'),
    qr12: Yup.string().required('Required'),
    qr13: Yup.string().required('Required')
})

export default function Two() {
    const router = useRouter()

    const [showModal, setShowModal] = useState(false)
    const { t, i18n } = useTranslation();
    const context = useContext(AppContext)

    const onSubmitForm = async (values) => {
        var data = {
            qr1: values.qr1,
            qr2: values.qr2,
            qr3: values.qr3,
            qr4: values.qr4,
            qr5: values.qr5,
            qr6: values.qr6,
            qr7_list: values.qr7,
            qr8: values.qr8,
            qr9: values.qr9,
            qr10: values.qr10,
            qr11: values.qr11,
            qr12_list: values.qr12,
            qr13: values.qr13,
            qr13_1: values.qr13_1,
        }
        context.setqr(data)
        context.seturls('backpain')
        router.push('/step/data_diri')
    }

    const risk = i18n.language == 'id' ? backpain_risk_id : backpain_risk_en;
    const risk2 = i18n.language == 'id' ? backpain_risk2_id : backpain_risk2_en;

    return (
        <Layout title={t("step-2-title")} back={'/step/backpain/one'}>
            <div className="flex flex-wrap justify-between items-center px-5 pt-5 bg-white overflow-hidden w-full">
                <Formik
                    initialValues={{ qr1: '', qr2: '', qr3: '', qr4: '', qr5: '', qr6: '', qr7: '', qr8: '', qr9: '', qr10: '', qr11: '', qr12: '', qr13: '', qr13_1: '' }}
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
                                    <p className='font-bold text-gray-700 text-sm'>{t("risk-desc", { ns: 'backpain' })}</p>
                                </div>
                                <hr className=' decoration-dashed mb-3' />
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr1", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
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
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr2", { ns: 'backpain' })}</label>
                                    <p className='text-md text-gray-600 text-sm font-normal mb-2'>{t("suhu-caption")}</p>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr2" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr2" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr2 && touched.qr2 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr2}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr3", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr3" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr3" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr3 && touched.qr3 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr3}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr4", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr4" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr4" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr4 && touched.qr4 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr4}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr5", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr5" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr5" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr5 && touched.qr5 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr5}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr6", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr6" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr6" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr6 && touched.qr6 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr6}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr7", { ns: 'backpain' })}</label>
                                    <ul className="list-decimal">
                                        {
                                            risk.map((item, index) => {
                                                return (
                                                    <li key={index} className='ml-4 pt-2'><p>{item.value}</p></li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr7" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr7" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr7 && touched.qr7 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr7}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr8", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr8" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr8" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr8 && touched.qr8 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr8}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr9", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr9" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr9" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr9 && touched.qr9 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr9}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr10", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr10" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr10" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr10 && touched.qr10 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr10}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr11", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr11" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr11" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr11 && touched.qr11 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr11}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr12", { ns: 'backpain' })}</label>
                                    <ul className="list-decimal">
                                        {
                                            risk2.slice(0, 5).map((item, index) => {
                                                return (
                                                    <li key={index} className='ml-4 pt-2'><p>{item.value}</p></li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <button type="button" onClick={() => setShowModal(true)} className="text-warning-500 underline">{t("step-2-title-3-2")}</button>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr12" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr12" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr12 && touched.qr12 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr12}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("qr3", { ns: 'backpain' })}</label>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr13" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="qr13" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.qr13 && touched.qr13 && <div className='text-red-500 font-light text-sm ml-2'>{errors.qr13}</div>}
                                    </div>
                                    <div className="mt-3">
                                        <Field name="qr13_1" className="w-full py-2 px-3 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1" type="text" placeholder={t("step-2-title-4-2")} />
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
                                            risk2.map((item, index) => {
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
