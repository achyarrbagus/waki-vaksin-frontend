import Layout from "@/components/Layout"
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import { sakitperut_id, sakitperut_en } from "@/constant/sakitperut"
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext } from "react";
import AppContext from "@/components/AppContext"
import CustomSelect from "@/components/CustomSelect";
import * as Yup from 'yup'

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "sakitperut"]))
        }
    };
}

const OneSchema = Yup.object().shape({
    q1: Yup.string().required('Required'),
    q2: Yup.array().required('Required'),
    q3: Yup.string().required('Required'),
    q4: Yup.string().required('Required'),
    q5: Yup.string().required('Required'),
});

export default function One() {
    const router = useRouter()
    const { t, i18n } = useTranslation(["common", "sakitperut"]);
    const context = useContext(AppContext)

    const onSubmitForm = async (values) => {
        var data = {
            q1: values.q1,
            q2: values.q2,
            q3: values.q3,
            q3_1: values.q3_1,
            q4: values.q4,
            q5: values.q5,
        }
        context.setqf(data)
        context.setDays(values.q5)
        router.push('/step/sakitperut/two')
    }

    const symptoms = i18n.language == 'id' ? sakitperut_id : sakitperut_en;

    return (
        <Layout title={t("step-1-title-1")} back={'/surat'}>
            <div className="flex flex-row justify-between items-center px-5 pt-5 bg-white overflow-hidden w-full" >
                <Formik
                    initialValues={{ q1: '', q2: '', q3: '', q3_1: '', q4: '', q5: '' }}
                    validationSchema={OneSchema}
                    onSubmit={onSubmitForm}>
                    {({ errors, touched, setFieldValue }) => (
                        <Form className="flex flex-col justify-between h-full w-full pb-6">
                            <div className='flex flex-col mb-32'>
                                <div className='py-4 my-5'>
                                    <h1 className='text-left text-3xl text-gray-700 font-black'>{t("title", { ns: 'sakitperut' })}</h1>
                                    <p className='text-md text-gray-600 text-sm font-normal'>{t("step-1-title-3")}</p>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("q1", { ns: 'sakitperut' })}</label>
                                    <p className='text-md text-gray-600 text-sm font-normal mb-2'>{t("suhu-caption")}</p>
                                    <div className='flex flex-row form-check mb-3'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="q1" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="q1" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.q1 && touched.q1 && <div className='text-red-500 font-light text-sm ml-2'>{errors.q1}</div>}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("q2", { ns: 'sakitperut' })}</label>
                                    <Field
                                        className="custom-select"
                                        name="q2"
                                        options={symptoms}
                                        component={CustomSelect}
                                        placeholder={t("select")}
                                        isMulti={true}
                                    />
                                    {errors.q2 && touched.q2 && <div className='text-red-500 font-light text-sm ml-2'>{errors.q2}</div>}
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("q3", { ns: 'sakitperut' })}</label>
                                    <div className='flex flex-row form-check mb-3'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="q3" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yes")} />
                                            {t("yes")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="q3" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("no")} />
                                            {t("no")}
                                        </label>
                                        {errors.q3 && touched.q3 && <div className='text-red-500 font-light text-sm ml-2'>{errors.q3}</div>}
                                    </div>
                                    <div className="">
                                        <Field name="q3_1" className="w-full py-2 px-3 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1" type="text" placeholder={t("if-yes")} />
                                    </div>
                                    <p>{t("more")}</p>
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("q4", { ns: 'sakitperut' })}</label>
                                    <div className='flex flex-col justify-between'>
                                        <div className="form-check">
                                            <label className='text-sm align-middle form-check-label inline-block mb-3'>
                                                <Field type="radio" name="q4" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("today")} />
                                                {t("today")}
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <label className='text-sm align-middle form-check-label inline-block mb-3'>
                                                <Field type="radio" name="q4" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("yesterday")} />
                                                {t("yesterday")}
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <label className='text-sm align-middle form-check-label inline-block mb-3'>
                                                <Field type="radio" name="q4" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("2d")} />
                                                {t("2d")}
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <label className='text-sm align-middle form-check-label inline-block mb-3'>
                                                <Field type="radio" name="q4" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("more-d")} />
                                                {t("more-d")}
                                            </label>
                                        </div>
                                        {errors.q4 && touched.q4 && <div className='text-red-500 font-light text-sm ml-2'>{errors.q4}</div>}
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <label className="block mb-1 font-bold text-gray-700 text-sm">{t("q5", { ns: 'sakitperut' })}</label>
                                    <p className='text-md text-gray-600 text-sm font-normal mb-2'>{t("how-many-days-caption")}</p>
                                    <div className='flex flex-row form-check'>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="q5" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("1-day")} />
                                            {t("1-day")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="q5" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("2-day")} />
                                            {t("2-day")}
                                        </label>
                                        <label className='text-sm align-middle form-check-label inline-block'>
                                            <Field type="radio" name="q5" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value={t("3-day")} />
                                            {t("3-day")}
                                        </label>
                                        {errors.q5 && touched.q5 && <div className='text-red-500 font-light text-sm ml-2'>{errors.q5}</div>}
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
                </Formik >
            </div >
        </Layout >
    )
}
