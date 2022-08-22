import Layout from "/components/Layout"
import Footer from "/components/Footer"
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, useRef } from 'react';
import Image from 'next/image'
import { AiOutlineRight } from "react-icons/ai"
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { pekerjaan_en, pekerjaan_id } from "../../constant";
import CustomSelect from "@/components/CustomSelect";
import useQuery from "@/helpers/useQuery";
import { ImageInput } from "formik-file-and-image-input/lib";
import * as Yup from 'yup'
import { Spin, message } from 'antd'
import Skeleton from 'react-loading-skeleton'
import AppContext from "@/components/AppContext"
import Link from 'next/link'

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"]))
        }
    };
}

const ConSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    work: Yup.array().required('Required'),
    gender: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    ktp: Yup.mixed().required('Required'),
    acceptTerms: Yup.boolean().oneOf([true], 'Accept Terms & Conditions is required')
});


export default function Con_data() {
    const router = useRouter()
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)
    const [done, setDone] = useState(true)
    const [uid, setUid] = useState(null)
    const [phone, setPhone] = useState(null)
    const [addr, setaddr] = useState(null)
    const [email, setemail] = useState(null)
    const [work, setwork] = useState(null)
    const [gender, setgender] = useState(null)
    const query = useQuery()
    const context = useContext(AppContext)
    const ref = useRef(null);
    const pekerjaan = i18n.language == 'id' ? pekerjaan_id : pekerjaan_en;
    const imageFormats = ["image/png", "image/svg", "image/jpeg"];
    const img = "/images/icons/Photos.png";

    useEffect(() => {
        if (!query) {
            return;
        } else {
            setUid(query.uid)
            setPhone(query.phone)
            setaddr(context.state.addr)
            setemail(context.state.email)
            setwork(context.state.work)
            setgender(context.state.gender)
            fetchData(query.uid)
        }
    }, [query])

    const initialValues = {
        email: email,
        gender: gender,
        work: work,
        address: addr,
        ktp: null,
        acceptTerms: false
    };

    const fetchData = async (id) => {
        await fetch(`/api/get_patient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                uid: id
            })
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            if (json.status != 1 && json.payment_status == 2) {
                setLoad(true)
                setDone(false)
            } else if (json.status == 1 && json.payment_status == 2) {
                setLoad(true)
                setDone(true)
            }
        })
    }

    const onSubmitForm = async (values) => {
        const body = new FormData();

        body.append("phone", phone);
        body.append("email", values.email);
        body.append("work", values.work[0].label);
        body.append("gender", values.gender);
        body.append("address", values.address);
        body.append("image", values.ktp);
        body.append("uid", uid);
        setLoading(true)
        // const resData = await fetch(`http://127.0.0.1:8000/api/con_data`, {
        const resData = await fetch(`https://dev.suratsakit.com/api/con_data`, {
            method: 'POST',
            body
        })

        const res = await resData.json()

        if (resData.status != 200) {
            message.error(res.message)
            setLoading(false)
        } else {
            setLoading(false)
            message.success(`Success`)
            router.push('/step/done')
        }
    }
    const getMaps = () => {
        context.setEmail(ref.current.values.email);
        context.setWork(ref.current.values.work);
        context.setGender(ref.current.values.gender);
        router.push('/step/maps')
    }

    const CustomImageInputWrapper = ({ onClick, fileName, src }) => {
        if (src != null) {
            img = src;
        }
        return (
            <div onClick={onClick}>
                {!src && <a onClick={onClick}> </a>}
                <div className='flex flex-row'>
                    <Image
                        src={img}
                        alt="photo"
                        width={100}
                        height={80}
                    >
                    </Image>
                    <div className='ml-4'>
                        <label className="block mb-1 font-bold text-gray-700 text-sm">{t("step-con-data-title-7")}</label>
                        <div className="">
                            {(src != null) ?
                                <p className="text-sm text-primary-700">{t("step-con-data-title-7-3")}</p>
                                :
                                <p className="text-sm text-error-500">{t("step-con-data-title-7-2")}</p>
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    return (
        <>
            {load ?
                done ?
                    <Layout title={t("step-con-data-title")} back={'/'}>
                        < div className="flex flex-wrap justify-between items-center px-5 pt-5 bg-white overflow-hidden w-full" >
                            <Formik
                                initialValues={initialValues}
                                validationSchema={ConSchema}
                                enableReinitialize={true}
                                innerRef={ref}
                                onSubmit={(values) => onSubmitForm(values)}>
                                {({ values, errors, touched, setFieldValue }) => (
                                    <Form className="flex flex-col justify-between w-full pb-6">
                                        <div className='flex flex-col mb-32'>
                                            <div className='pb-4 my-5'>
                                                <h1 className='text-left text-3xl text-gray-700 font-black'>{t("step-con-data-title-1")}</h1>
                                                <p className='text-md text-gray-600 text-sm font-normal'>{t("step-con-data-title-2")}</p>
                                            </div>
                                            <div className='mb-4 w-full'>
                                                <label className="block mb-1 font-bold text-gray-700 text-sm">{t("step-con-data-title-3")}</label>
                                                <div className="">
                                                    <Field name="email" className="w-full py-2 px-3 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1" type="email" placeholder={t("step-con-data-title-3-2")} />
                                                </div>
                                                {errors.email && touched.email && <div className='text-red-500 font-light text-sm ml-2'>{errors.email}</div>}
                                            </div>
                                            <div className='mb-4 w-full'>
                                                <label className="block mb-1 font-bold text-gray-700 text-sm">{t("step-con-data-title-4")}</label>
                                                <Field
                                                    className="custom-select"
                                                    name="work"
                                                    options={pekerjaan}
                                                    component={CustomSelect}
                                                    placeholder={t("select")}
                                                    isMulti={true}
                                                />
                                                {errors.work && touched.work && <div className='text-red-500 font-light text-sm ml-2'>{errors.work}</div>}
                                            </div>
                                            <div className='mb-4 w-full'>
                                                <label className="block mb-1 font-bold text-gray-700 text-sm">{t("jenis_kelamin")}</label>
                                                <div className='flex flex-row form-check my-2'>
                                                    <label className='text-sm align-middle form-check-label inline-block'>
                                                        <Field type="radio" name="gender" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value="Male" />
                                                        {t("pria")}
                                                    </label>
                                                    <label className='text-sm align-middle form-check-label inline-block'>
                                                        <Field type="radio" name="gender" className="form-check-input appearance-none mx-3 rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-700 checked:border-primary-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" value="Female" />
                                                        {t("wanita")}
                                                    </label>
                                                </div>
                                                {errors.gender && touched.gender && <div className='text-red-500 font-light text-sm ml-2'>{errors.gender}</div>}
                                            </div>
                                            <div className='mb-4 w-full'>
                                                <label className="block mb-1 font-bold text-gray-700 text-sm">{t("step-con-data-title-5")}</label>
                                                <div className="">
                                                    <Field as="textarea" name="address" value={values.address} className="w-full h-28 py-2 px-3 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1" type="text" placeholder={t("step-con-data-title-5-2")} />
                                                </div>
                                                {errors.address && touched.address && <div className='text-red-500 font-light text-sm ml-2'>{errors.address}</div>}
                                            </div>
                                            <div className='mb-4 w-full'>
                                                <div className='flex flex-row justify-between items-center'>
                                                    <div className='flex flex-row' onClick={getMaps}>
                                                        <div>
                                                            <Image
                                                                src="/images/icons/maps.png"
                                                                alt="maps"
                                                                width={47}
                                                                height={47}
                                                            >
                                                            </Image>
                                                        </div>
                                                        <div className='px-4'>
                                                            <label className="block mb-1 text-gray-470 text-sm">{t("step-con-data-title-6")}</label>
                                                            <div className="">
                                                                <p className="font-bold">{t("step-con-data-title-6-2")}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=''>
                                                        <AiOutlineRight color="#3F4254" fontSize="25px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-4 w-full mt-4'>
                                                <div className='flex flex-col'>
                                                    <ImageInput
                                                        hideDelete="true"
                                                        hideEdit="true"
                                                        hideName="true"
                                                        name="ktp"
                                                        validFormats={imageFormats}
                                                        component={CustomImageInputWrapper}
                                                    />
                                                </div>
                                            </div>
                                            <div className='mb-4 w-full mt-4'>
                                                <div className='flex flex-row'>
                                                    <div className='basis-2/12'>
                                                        <Field
                                                            type="checkbox"
                                                            name="acceptTerms"
                                                        />
                                                    </div>
                                                    <div className='basis-auto'>
                                                        <label htmlFor="acceptTerms" className="">{t("term")}</label>
                                                        {errors.acceptTerms && touched.acceptTerms && <div className='text-red-500 text-sm'>{errors.acceptTerms}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='max-w-layout fixed flex fl2ex-col bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 py-5 px-3'>
                                            {loading ? <div className='py-2.5 text-center'><Spin /></div> :
                                                <button
                                                    type="submit"
                                                    className="bg-secondary-500 text-white font-bold block w-full text-center text-sm p-3 rounded-full"
                                                >
                                                    {t("next")}
                                                </button>
                                            }
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div >
                    </Layout >
                    :
                    <Layout title={t("step-con-data-title")} back={'/'}>
                        <div className="min-h-screen bg-primary-700 place-content-center">
                            <div className='flex flex-col justify-center items-center pt-28'>
                                <Image
                                    src="/images/icons/done.png"
                                    alt="done"
                                    width={120}
                                    height={120}
                                >
                                </Image>
                            </div>
                            <div className='flex flex-col px-5 pt-4 items-center bg-primary-700'>
                                <div className="flex justify-center items-center mb-3">
                                    <p className="basis-3/4 text-white text-2xl font-bold text-center">{t("step-done-title-1")}</p>
                                </div>
                                <div className="flex justify-center items-center mb-3">
                                    <p className="basis-3/4 text-white text-center">{t("step-done-title-2")}</p>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </Layout >
                :
                <Layout title={t("step-con-data-title")} back={'/'}>
                    <div className='p-4'>
                        <Skeleton count={1} height={205} />
                        <Skeleton count={1} height={205} />
                        <Skeleton count={1} height={40} />
                    </div>
                </Layout >

            }
        </>
    )
}
