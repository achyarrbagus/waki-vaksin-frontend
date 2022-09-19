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
import { Table, Tabs, Button, Modal } from "antd";

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

  // useEffect(() => {
  //   onInit();
  // }, [i18n.language]);

  // const onInit = async () => {
  //   Promise.all([fetchArticles()])
  //     .then(([articles, doctors]) => {
  //       setArticles(articles);
  //     })
  //     .catch((err) => {
  //       setArticles(null);
  //     });
  // };

  // const fetchArticles = async () => {
  //   const resData = await fetch(`/api/articles?locale=${i18n.language}`, {
  //     method: "GET",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   });
  //   return await resData.json();
  // };

  const columns = [
    {
      title: "Bulan",
      dataIndex: "bulan",
      key: "bulan",
    },
    {
      title: "Tinggi Badan(cm)",
      dataIndex: "tinggi_bdn",
      key: "tinggi_bdn",
    },
    {
      title: "Berat Badan(kg)",
      dataIndex: "berat_bdn",
      key: "berat_bdn",
    },
    {
      title: "Lingkar Kepala (cm)",
      dataIndex: "ling_kepala",
      key: "ling_kepala",
    },
    {
      title: "Tanggal Submit",
      dataIndex: "tgl_submit",
      key: "tgl_submit",
    },
  ];

  const dataSource = [
    {
      key: "1",
      bulan: "0",
      tinggi_bdn: "46.3 - 53.4",
      berat_bdn: "2.5 - 4.3",
      ling_kepala: "32.1 - 36.9",
      tgl_submit: "Update",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout title="Profile" back="/">
      {/* profile */}
      <div className="bg-white flex flex-col px-6 pt-6">
        {/* btn nama anak */}
        <div className="flex flex-row">
          <Swiper slidesPerView={"auto"} spaceBetween={30} freeMode={true}>
            <SwiperSlide key={1} style={{ width: "50%" }}>
              <Link href="#">
                <a className="h-full text-center -top-6">
                  <div className="bg-secondary-500 rounded-full px-4 py-3 mb-5">
                    <p className="text-white font-bold text-lg">Nama Anak</p>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
            <SwiperSlide key={2} style={{ width: "50%" }}>
              <Link href="#">
                <a className="h-full text-center -top-6">
                  <div className="bg-secondary-500 rounded-full px-4 py-3 mb-5">
                    <p className="text-white font-bold text-lg">Nama Anak</p>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
            <SwiperSlide key={3} style={{ width: "50%" }}>
              <Link href="#">
                <a className="h-full text-center -top-6">
                  <div className="bg-theme rounded-full px-4 py-3 mb-5">
                    <p className="text-white font-bold text-lg text-secondary-500">
                      Tambah +
                    </p>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* profile anak */}
        <div className="flex flex-col justify-between mb-1">
          <div className="flex pt-4 bg-white">
            <div className="relative inline-block">
              <div className="inline-block object-cover rounded-full border-solid border-4 border-primary-700">
                <Image
                  src={`https://api.sehatcepat.com/images/doctor/dr-peter.png`}
                  alt="suratsakit"
                  width={65}
                  height={60}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="ml-4 content-center">
              <h3 className="text-gray-700 font-bold text-2xl">Nama Anak</h3>
              <p className="text-gray-400 font-light text-lg mt-1">
                Laki - laki | 2 Bulan 3 Hari
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex flex-row mt-4 cursor-pointer justify-content-center border-solid border-2 border-theme rounded-md"
          onClick={showModal}
        >
          <div className="basis-2/6">
            <div className="text-center my-2 ml-2 border-r-2 border-theme">
              <p>Tinggi Badan</p>
              <p className="mt-2">
                52 <sub>cm</sub>
              </p>
            </div>
          </div>
          <div className="basis-2/6">
            <div className="text-center my-2 border-r-2 border-theme">
              <p>Berat Badan</p>
              <p className="mt-2">
                10 <sub>kg</sub>
              </p>
            </div>
          </div>
          <div className="basis-2/6">
            <div className="text-center my-2">
              <p>Lingkar Kepala</p>
              <p className="mt-2">
                52 <sub>cm</sub>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 mx-6">
        <Tabs
          defaultActiveKey="1"
          size={"large"}
          tabBarStyle={{ width: "100%", color: "#A7A7A7" }}
        >
          <Tabs.TabPane tab="Vaksin" key="1">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <Link href="#">
                  <a className="h-full text-center -top-6">
                    <div className="text-grey-800 rounded-full border-2 border-theme cursor-pointer px-4 py-3 m-2 hover:bg-secondary-500 hover:text-gray-100">
                      <p className="text-lg font-bold">Belum</p>
                    </div>
                  </a>
                </Link>
                <Link href="#">
                  <a className="h-full text-center -top-6">
                    <div className="text-grey-800 rounded-full border-2 border-theme cursor-pointer px-4 py-3 m-2 hover:bg-secondary-500 hover:text-gray-100">
                      <p className="text-lg font-bold">Sudah</p>
                    </div>
                  </a>
                </Link>
                <Link href="#">
                  <a className="h-full text-center -top-6">
                    <div className="text-grey-800 rounded-full border-2 border-theme cursor-pointer px-4 py-3 m-2 hover:bg-secondary-500 hover:text-gray-100">
                      <p className="text-lg font-bold">Semua</p>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="flex flex-col">
                <p className="text-2xl font-bold mb-2">Riwayat Vaksin Anak</p>
                <div className="flex justify-between flex-row w-full p-2 border-solid border-2 border-theme rounded-lg mt-2 bg-theme ">
                  <div className="mx-4 my-2 font-bold">0 Bulan</div>
                  <div className="flex flex-col mx-4">
                    <div className="px-6 my-2 text-secondary-500 font-bold">
                      Hepatitis B1
                    </div>
                    <div className="px-6 my-2 text-secondary-500 font-bold">
                      Polio
                    </div>
                  </div>
                  <div className="flex flex-col mx-4">
                    <div className="text-warning-500 bg-warning-100 px-6 my-2 rounded-full font-bold">
                      Belum
                    </div>
                    <div className="text-warning-500 bg-warning-100 px-6 my-2 rounded-full font-bold">
                      Belum
                    </div>
                  </div>
                </div>
                <div className="flex justify-between flex-row w-full p-2 border-solid border-2 border-theme rounded-lg mt-2">
                  <div className="mx-4 my-2 font-bold">1 Bulan</div>
                  <div className="flex flex-col mx-4">
                    <div className="px-6 my-2 text-secondary-500 font-bold">
                      BCG
                    </div>
                  </div>
                  <div className="flex flex-col mx-4">
                    <div className="text-warning-500 bg-warning-100 px-6 my-2 rounded-full font-bold">
                      Belum
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Pertumbuhan" key="2">
            <div className="flex flex-col">
              <p className="text-2xl font-bold">Tabel Tumbuh Kembang Anak</p>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                rowClassName={(record, index) => "font-bold"}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>

      <div className="max-w-layout fixed flex flex-col bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 py-5 px-3">
        {/* {loading ? (
          <div className="py-2.5 text-center">
            <Spin />
          </div>
        ) : ( */}
        <button
          type="submit"
          className="bg-secondary-500 text-white font-bold block w-full text-center text-sm p-3 rounded-full"
        >
          Daftar Vaksin
        </button>
        {/* )} */}
      </div>
      <Footer />
      <Modal
        title="Basic Modal"
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Layout>
  );
}
