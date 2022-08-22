import { useRouter } from 'next/router'
import { message, Spin } from 'antd'
import Link from 'next/link'
import Layout from '/components/Layout'
import Image from 'next/image'
import { Formik, Form, Field } from 'formik'
import { payments } from '/constant/index'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useContext, useEffect } from "react";
import AppContext from "@/components/AppContext"
import Skeleton from 'react-loading-skeleton'
import reactStringReplace from 'react-string-replace';

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"]))
        }
    };
}
// import { parseCookies } from '@/helpers/cookie'

export default function PaymentMethod() {
    const router = useRouter()
    const { t, i18n } = useTranslation();
    const locals = i18n.language

    const context = useContext(AppContext)
    const { query } = useRouter();
    const phone = query.phone
    const uid = query.uid
    const name = query.name
    const [loading, setLoading] = useState(false)
    const [methods, setMethods] = useState(null)

    useEffect(() => {
        onInit()
    }, [locals])

    const onInit = async () => {
        Promise.all([
            fetchMethods(),
        ]).then(([
            methods,
        ]) => {
            setMethods(methods)
        }).catch(err => {
            setMethods(null)
        });
    }

    const fetchMethods = async () => {
        const resData = await fetch(`/api/methods?locale=${locals}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        })

        return await resData.json()
    }
    const onSubmitForm = async (values) => {
        setLoading(true)

        const resData = await fetch(`/api/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: values.method,
                uid: uid,
                phone: phone,
                local: locals,
            })
        })

        const res = await resData.json()
        console.log(res)
        if (resData.status != 200) {
            setLoading(false)
            message.error(res.message)
        } else {
            setLoading(false)
            router.replace(res.redirect_url)
        }
    }

    return (

        <Layout title={t("step-py-title")} back={'/step/surat'}>
            <div className='flex flex-col justify-between mb-1'>
                <div className="flex pt-4 bg-white">
                    <div className="relative inline-block">
                        <div className="inline-block object-cover  rounded-full">
                            <Image
                                src={`https://api.sehatcepat.com/images/doctor/dr-peter.png`}
                                alt="suratsakit"
                                width={70}
                                height={66}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="mx-2">
                        <h3 className="text-gray-600 font-bold text-lg">dr. Peter Fernando</h3>
                        <p className="text-gray-400 font-light text-md">{t("step-py-doctor")}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-between mb-1'>
                <div className="flex-row py-3 bg-white">
                    <h3 className="text-gray-400 font-light text-lg px-4">{t('suratsakit')}</h3>
                    <h3 className="font-bold text-lg text-gray-500 px-4">{reactStringReplace(name, "_", (match, i) => ( " "))}</h3>
                </div>
            </div>
            <div className='flex flex-col justify-between mb-1'>
                <div className="flex-row py-3 bg-white">
                    <div className='flex border-b-2 border-gray-300 border-solid pb-2 mx-4 mb-4'>
                        <h3 className='font-bold text-lg text-gray-500'>{t('detail-payment')}</h3>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <p className="font-bold text-lg text-gray-500 px-4">{t('suratsakit')}</p>
                            <p className="font-bold text-lg text-gray-500 px-4">{t('step-py-title-2-2')}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className="font-bold text-lg text-error-600 px-4">{t('discount')}</p>
                            <p className="font-bold text-lg text-error-600 px-4">{t('discount-price')}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className="font-bold text-lg text-gray-500 px-4">{t('step-surat-total')}</p>
                            <p className="font-bold text-lg text-gray-500 px-4">{t('total-price')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Formik
                initialValues={{ method: '', promo: '' }}
                onSubmit={onSubmitForm}>
                {({ errors, isSubmitting, values, setFieldValue }) => (
                    <Form className='w-full'>
                        <div className='flex'>
                            <div className='w-full bg-white py-4'>
                                <div className='flex flex-col'>
                                    <div className='flex border-b-2 border-gray-300 border-solid pb-2 mx-4 mb-4'>
                                        <h3 className='font-bold text-lg text-gray-500'>{t("step-py-title-3")}</h3>
                                    </div>

                                    {/* tabs */}
                                    <div className='mx-4'>
                                        <Tabs value="p-wallet">
                                            <TabsHeader>
                                                <Tab key="wallet" value='p-wallet'>
                                                    E-wallet
                                                </Tab>
                                                <Tab key="bank" value='p-bank'>
                                                    Bank Transfer
                                                </Tab>
                                            </TabsHeader>
                                            <TabsBody>
                                                <TabPanel key="wallet" value="p-wallet" className="p-0">
                                                    {methods ?
                                                        methods.map((item, index) => {
                                                            if (item.methods == 'wallet') {
                                                                return (
                                                                    <div key={index} className='my-2'>
                                                                        <div role="group" aria-labelledby="my-radio-group">
                                                                            <label htmlFor={`payment-${item.id}`} className="flex items-center justify-between bg-info-100 rounded-lg p-3 shadow-md">
                                                                                <div className='flex items-center'>
                                                                                    <div className='w-20'>
                                                                                        <img
                                                                                            src={`/images/payment/${item.logo}`}
                                                                                            alt={item.title}
                                                                                            className="h-6 w-full" />
                                                                                    </div>
                                                                                    <div className='ml-4 text-left'>
                                                                                        <p className='font-bold text-gray-900 text-sm'>{item.title}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <Field name="method">
                                                                                    {({ field, form, meta }) => (
                                                                                        <input
                                                                                            className="form-radio checked:bg-blue-600 checked:border-blue-600 focus:outline-none  focus:outline-none transition duration-200 h-5 w-5 mr-3 " {...field}
                                                                                            type="radio"
                                                                                            id={`payment-${item.id}`}
                                                                                            value={item.id}
                                                                                        />
                                                                                    )}
                                                                                </Field>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                        : <div className='p-4'><Skeleton count={8} height={25} /></div>
                                                    }
                                                </TabPanel>
                                                <TabPanel key="bank" value="p-bank" className="p-0">
                                                    {methods ?
                                                        methods.map((item, index) => {
                                                            if (item.methods == 'bank') {
                                                                return (
                                                                    <div key={index} className='my-2'>
                                                                        <div role="group" aria-labelledby="my-radio-group">
                                                                            <label htmlFor={`payment-${item.id}`} className="flex items-center justify-between bg-info-100 rounded-lg p-3 shadow-md">
                                                                                <div className='flex items-center'>
                                                                                    <div className='w-20'>
                                                                                        <img
                                                                                            src={`/images/payment/${item.logo}`}
                                                                                            alt={item.title}
                                                                                            className="h-6 w-full" />
                                                                                    </div>
                                                                                    <div className='ml-4 text-left'>
                                                                                        <p className='font-bold text-gray-900 text-sm'>{item.title}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <Field name="method">
                                                                                    {({ field, form, meta }) => (
                                                                                        <input
                                                                                            className="form-radio checked:bg-blue-600 checked:border-blue-600 focus:outline-none  focus:outline-none transition duration-200 h-5 w-5 mr-3 " {...field}
                                                                                            type="radio"
                                                                                            id={`payment-${item.id}`}
                                                                                            value={item.id}
                                                                                        />
                                                                                    )}
                                                                                </Field>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                        : <div className='p-4'><Skeleton count={8} height={25} /></div>
                                                    }
                                                </TabPanel>
                                            </TabsBody>
                                        </Tabs>
                                    </div>
                                    {/* end tapbs */}
                                    {errors.method && touched.method && <div className='mx-4 text-red-500 font-light text-sm'>{errors.method}</div>}
                                </div>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='w-full mb-20'>
                                <div className='w-full bg-white px-4 py-4 mt-1 mb-5'>
                                    <label htmlFor='promo' className="block text-xl font-bold text-gray-500">{t("step-py-title-4")}</label>
                                    <div className="mt-1 flex items-center">
                                        <input
                                            type="text"
                                            name="promo"
                                            id="promo"
                                            placeholder={t("step-py-title-4-2")}
                                            className="mt-1 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md p-2"
                                        />
                                        <button
                                            type="button"
                                            className="ml-3 bg-white py-2 px-4 border-2 border-secondary-500 rounded-full shadow-sm text-md font-medium text-secondary-500 hover:bg-gray-50"
                                        >
                                            {t("step-py-title-5")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='max-w-layout fixed flex flex-col bottom-0 w-full bg-white mx-auto border-t border-gray-150 py-2 px-4'>
                            {loading ?
                                <div className='py-2.5 text-center'><Spin /></div> :
                                <div className="flex justify-between">
                                    <div className="flex-row py-1">
                                        <h3 className="text-gray-400 font-light px-4 text-xl">{t('step-surat-total')}</h3>
                                        <h3 className="font-bold text-gray-500 px-4 text-xl">{t('total-price')}</h3>
                                    </div>
                                    <button className="py-2.5 px-4 my-auto h-12 w-52 rounded-full text-center text-white bg-secondary-500 font-bold hover:bg-gray-500 text-lg" type="submit">{t("step-py-btn")}</button>
                                </div>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}
