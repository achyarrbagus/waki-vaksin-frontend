import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@/components/Layout"
import Skeleton from 'react-loading-skeleton'
import { Spin, message } from 'antd'
import { Formik, Form, Field } from 'formik'

export async function getStaticProps({ locale, params }) {
    const uid = params.uid
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "refund"])),
            uid
        }
    };
}
export async function getStaticPaths() {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default function Refund({ uid }) {
    const router = useRouter()
    const { t } = useTranslation(['common', 'refund']);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(false)
    console.log(uid)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await fetch(`/api/refund`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                uid: uid
            })
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            setData(json)
        })
    }

    const onSubmitForm = async (values) => {

        setLoading(true)

        const resData = await fetch(`/api/post_refund`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                uid: values.uid
            })
        })

        const res = await resData.json()

        if (resData.status != 200) {
            message.error(res.message)
            setLoading(false)
        } else {
            setLoading(false)
            message.success(`Success`)
            router.push('/refund/done')
        }
    }
    var admin = null;
    if (data.status == '-1') {
        admin = "Admin";
    } else if (data.status == '-2') {
        admin = data.d_name
    }
    return (
        <Layout title={t("suratsakit")} back={'/'}>
            {data ?
                <Formik
                    initialValues={{ uid: uid }}
                    onSubmit={(values) => onSubmitForm(values)}>
                    {({ errors, touched, setFieldValue }) => (
                        <Form className="flex flex-col justify-between w-full pb-6">
                            <Field name="uid" className="hidden" type="text" placeholder="" />
                            <div className="p-5">
                                <div className="felx flex-row">
                                    <p className="text-md mb-1">{t("1st", { ns: 'refund' })} <b>{data.name}</b></p>
                                    <p className="text-mx">{t("2nd", { ns: 'refund' })} <b>{admin}</b></p>
                                    <p className="text-mx mb-4">{t("3rd", { ns: 'refund' })}</p>
                                    <div className="box h-auto my-2 h-auto p-4 bg-gray-200">

                                        <b>{data.note}</b>
                                    </div>
                                    <p className="text-md mt-4">{t("4th", { ns: 'refund' })}</p>
                                </div>
                                <div className="mt-5">
                                    {loading ? <div className='py-2.5 text-center'><Spin /></div> :
                                        <button
                                            type="submit"
                                            className="bg-primary-700 text-white font-bold block w-full text-center text-sm p-3 rounded-full mt-8"
                                        >
                                            Refund
                                        </button>
                                    }
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                :
                <div className='p-4'>
                    <Skeleton count={1} height={205} />
                    <Skeleton count={1} height={40} />
                </div>
            }
        </Layout>
    )
}

