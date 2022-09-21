import Link from "next/link";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import SliderUpdatedArticle from "@/components/mobiles/SliderUpdatedArticle";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Table, Tabs, Modal, Button, DatePicker, Spin, TimePicker } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default function Pofile() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    phone: Yup.string()
      .min(9, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    dateofbirth: Yup.string().required("Required"),
  });
  const onSubmitForm = async (values) => {
    // var phone = t("phone_code") + values.phone;
    // var dt = {
    //   name: values.name,
    //   phone: phone,
    //   dateofbirth: values.dateofbirth,
    // };
    // context.setdata_diri(dt);
    // setLoading(true);
    // const resData = await fetch(`/api/post_quest`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     data: {
    //       cont: context,
    //       name: values.name,
    //       phone: phone,
    //       local: locals,
    //       dateofbirth: values.dateofbirth,
    //       camp: datacamp,
    //     },
    //   }),
    // });
    // const res = await resData.json();
    // if (resData.status != 200) {
    //   message.error(res.message);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    //   message.success(`Success`);
    //   router.push(`/step/surat?phone=${values.phone}&uid=${res.uid}`);
    // }
  };

  return (
    <>
      <Layout title="Profile" back="/">
        <div className="flex flex-wrap justify-between items-center px-5 pt-5 bg-white overflow-hidden w-full">
          <Formik
            initialValues={{ name: "", phone: "", dateofbirth: "" }}
            validationSchema={RegisterSchema}
            onSubmit={onSubmitForm}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="flex flex-col justify-between w-full pb-6">
                <div className="flex flex-col">
                  <div className="py-4 my-5">
                    <h1 className="text-left text-3xl text-gray-700 font-black">
                      Data Orang Tua
                    </h1>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 font-bold text-gray-700 text-sm">
                      Nama Orang Tua{" "}
                    </label>
                    <div className="">
                      <Field
                        name="name"
                        className="w-full py-2 px-3 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1"
                        type="text"
                        placeholder={""}
                      />
                    </div>
                    {errors.name && touched.name && (
                      <div className="text-red-500 font-light text-sm ml-2">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 font-bold text-gray-700 text-sm">
                      Nomor Handphone{" "}
                    </label>
                    <div className="mt-1 relative">
                      <div className="bg-gray-100 rounded-l-lg absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
                        <span className="text-gray-700 text-md">
                          {t("phone_code")}
                        </span>
                      </div>
                      <Field
                        name="phone"
                        className="block w-full py-2 pl-14  rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1"
                        type="number"
                        placeholder={t("phone")}
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <div className="text-red-500 font-light text-sm ml-2">
                        {errors.phone}
                      </div>
                    )}
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 font-bold text-gray-700 text-sm">
                      Alamat Rumah
                    </label>
                    <div className="mt-1 relative">
                      <Field
                        name="phone"
                        className="block w-full py-2  px-3 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1"
                        type="text"
                        placeholder={""}
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <div className="text-red-500 font-light text-sm ml-2">
                        {errors.phone}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row mb-4 w-full">
                    <div className="w-full mr-1">
                      <label className="block mb-1 font-bold text-gray-700 text-sm">
                        Pilih Tanggal
                      </label>
                      <div className="">
                        <DatePicker
                          format="YYYY-MM-DD"
                          name="dateofbirth"
                          placeholder={t("select_date")}
                          onChange={(date, dateString) =>
                            setFieldValue("dateofbirth", dateString)
                          }
                          className={`py-2 px-3 rounded-lg text-lg text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1 w-full`}
                        />
                      </div>
                      {errors.dateofbirth && touched.dateofbirth && (
                        <div className="text-red-500 font-light text-sm ml-2">
                          {errors.dateofbirth}
                        </div>
                      )}
                    </div>
                    <div className="w-full ml-1">
                      <label className="block mb-1 font-bold text-gray-700 text-sm">
                        Pilih Waktu
                      </label>
                      <div className="">
                        <TimePicker
                          size="large"
                          className="rounded-lg w-full"
                          use12Hours
                          format="h:mm a"
                          onChange={""}
                        />
                      </div>
                      {errors.dateofbirth && touched.dateofbirth && (
                        <div className="text-red-500 font-light text-sm ml-2">
                          {errors.dateofbirth}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="max-w-layout fixed flex flex-col bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 py-5 px-3">
                  {loading ? (
                    <div className="py-2.5 text-center">
                      <Spin />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="bg-secondary-500 text-white font-bold block w-full text-center text-sm p-3 rounded-full"
                    >
                      {t("next")}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex flex-col jusifty-between bg-white mt-2 px-5 pt-5">
          <p className="text-xl font-bold">Data Anak</p>
          <div className="flex flex-col bg-theme p-5 rounded-xl"></div>
        </div>
        <Footer />
      </Layout>
    </>
  );
}
