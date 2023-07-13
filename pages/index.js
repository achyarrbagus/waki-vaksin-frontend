import Link from "next/link"
import Layout from "@/components/Layout"
import Footer from "@/components/Footer"
import Image from "next/image"
import { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from "react-icons/ai"
import SliderUpdatedArticle from "@/components/mobiles/SliderUpdatedArticle"
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Skeleton from 'react-loading-skeleton'
import Script from "next/script";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState(null);
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    onInit();
  }, [i18n.language]);

  const onInit = async () => {
    Promise.all([fetchArticles(), fetchDoctors()])
      .then(([articles, doctors]) => {
        setArticles(articles);
        setDoctors(doctors);
      })
      .catch((err) => {
        setArticles(null);
        setDoctors(null);
      });
  };

  const fetchArticles = async () => {
    const resData = await fetch(`/api/articles?locale=${i18n.language}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    return await resData.json();
  };
  const fetchDoctors = async () => {
    const resData = await fetch(`/api/doctors?locale=${i18n.language}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    return await resData.json();
  };

  return (
    <Layout title="Home">
      <div className="bg-primary-700 pb-4 flex-col">
        {/* header text */}
        <div className="text-left text-white px-6 py-3">
          <div>
            <Image src="/images/LOGO.png" alt="suratsakit" width={40} height={40} />
          </div>
          <p className="text-lg sm:text-md font-normal mt-2 ">{t("header-1")}</p>
          <h1 className="text-3xl sm:text-2xl font-bold text-white w-64 mt-3">{t("header-2")}</h1>
          <p className="text-lg sm:text-md font-normal mt-3">{t("header-3")}</p>
        </div>
        {/* header menu */}
        <Link href="/chat">
          <a className="h-full flex-1 text-center">
            <div className="bg-secondary-500 rounded-full shadow-lg px-4 py-3 mx-6 mb-5 mt-5">
              <p className="text-white font-bold text-lg">{t("btn-header-1")}</p>
            </div>
          </a>
        </Link>
        <Link href="/">
          <a className="h-full flex-1 text-center">
            <div className="bg-white rounded-full shadow-lg px-4 py-3 mx-6 mb-5 mt-2">
              <p className="text-secondary-500 font-bold text-lg">{t("btn-header-2")}</p>
            </div>
          </a>
        </Link>
        <div className="p-5">{articles ? <SliderUpdatedArticle data={articles} /> : <Skeleton count={8} />}</div>
      </div>
      {/* ddialog flow messenger embededd */}
      <div className="bg-black">
        <df-messenger
          className="df-messenger"
          chat-icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFFElEQVR4Aa2XA5A0SRCFZ8+2bdu2bdu2bdv2XeBsrG3btu3N+17H9kb/HnVEDrqqEi9fZlX5/HrMInz//rup77//LkQ+RlJ9kZFtfE8g40gb4ynO2N9/X+j7669NnDUhP088sRQKd0P5R0grBmYQW4JoTgvzP/RFRe0mHcEZ/+eftVDyPMp6EQtSeqUDR9YOzDhRszjNn4j9RCQV2cMv23h8EJPrEAuz1Ev3kmDfXRPnXxyB7JycbEdmZtrmCQmhOFEHeXdduPHff19HUC1s4fJRURbT3W2j09P2Vn19qEikiV8LsJ2BF5Sv+SNfPSbGifydhgYbnJy0BysqbP+0NFsJp0LgxAuyOT/0fYitFB1tj1RW2qEZGfYY33UjI1Y9PGzJvb1Ww+/Uvj5rGB21osFBu7q4OChH4EKfbM41GfLyoTuoiLMHBmxoasq6JybsjrIyWy8uzpaLjLRTcnJsGb43gwdn5+bahfn5+h0cEuotsq2upcbhDmyTmGiVRPxJU5PtkZpq2yUlzS1aCsGBcFVFi2Nb7dXNvcj2R0eH/dzebiuTCu+Cg9LTLbKry9JIwdl5eXZ1UZGl8zupp8dJ1ftwROkRWcWZ1Vj/E3qeqKqyFdH7G3oz+/udNfeWl5tsqm3LgU9cIycDcfv4uL1WV2fLeiJdg7SUDQ3Z7aTjHhY/X1Njn4JQLqm6j/+7p6Q44y/wPhWuaPxKHBRXonFoBRw4l3S1jo3Z4zg0h6psk/8U19BXzc32MYq9xiW7YaADx3akFxwAEvtQBXFEnkVEnzF/L1LVT4WUQMx43h8GgQv4/UFjo5Xj2NqxsbYDRjtndbh6sZ2qzteuP6sAWSGLgHeBfK0PCcULRVPMnOOys62Z6LJxQOm6gWpQtWwNf5TG60tKrIL5SkEvjqmJnQS6TazBjld3u1IwgdhG8fGCTKwXZAs4oQ54XFaWbYERISTY9yRyfW+Ag4psac/cTdC3NPOEnvi0FijsxByI7EVgQilwHNgQJYriOqJZbiFMV3U8VV1tD0O4dVB2Hjl9gPxL9saRW0pLbVtgFvwak6FjcdjVdzyoufN551YTDgADIqY6pLqooGAB41IgdovJ37S02NEoViMSxE9BqqP43wfUMqx3H5L7dXFSKW2BeJuCxlWQUmnMx4ZQFjpO+tWbXUMfsfC71lZbE9ZHeBzQZFVGPSlSGR0IEWVQTnwOcU8kumEal/Ku/UKVcjuI/IIzzTiwH6SVvkQq5FEQ9KQgxVuGdhj1q+73DhuO8uyF/4e2Nnu5ttY6Gb8Bkon1bzNP0CuiQiLbnhSojC8vLJQzTlUM4tgFIEMpqyJUjh50sa1m4DYiGf0aiGOBW6Xj3Q1vw9B7NJvTaMG7QqwngV7w38p7IXApRtfCiDarYwjkFpxcDx1qWOKFUFXPEDnR6WlEtMPZ85651ZABzL+T7+PJLSz27o76Dmsrdk+8H81fcn93dtoAMD8D81ViKqPLiFKRiPV3AfsDRAvswW5GH8r23HasLdI7Qdus4FO3a4NIpeRP+VXLVVf8FwdpLsFuTp7t2D2QREUtcCBx86/erdxfQImqnpVH+BLGA4men35aGxTSA1AULPRpzvFvoY8OjOE/EXulXpcVf47l9eE3TmDS7dfDJSLMF5M057IT0MN1KmxXM47hQV9OIYxK9EM1Dr8vp2ps6i2KWjpCfmgY6lpEchGKP8VIMoSVkfHZ80S7Nhb+f6I5gVzP/wd4r+sX4X5xfwAAAABJRU5ErkJggg=="
          intent="WELCOME"
          chat-title="CepatSehat"
          agent-id="26572ce9-723f-453d-bda3-0e977db2c9a5"
          language-code="id"
        ></df-messenger>
        <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></Script>
      </div>

      <div className="bg-white flex flex-col px-6 pt-6">
        <p className="text-secondary-500 font-bold text-lg mb-3">{t("text-h-1")}</p>
        <p className="font-bold text-3xl">{t("text-h-2")}</p>
        <p className="text-lg">{t("text-h-3")}</p>
        <div className="flex my-2">
          <div className="flex flex-row w-full">
            <div className="text-5xl font-bold basis-1/5">1</div>
            <div className="text-2xl font-bold basis-4/5">{t("manfaat-1")}</div>
          </div>
        </div>
        <div className="flex my-2">
          <div className="flex flex-row w-full">
            <div className="text-5xl font-bold basis-1/5">2</div>
            <div className="text-2xl font-bold basis-4/5">{t("manfaat-2")}</div>
          </div>
        </div>
        <div className="flex my-2">
          <div className="flex flex-row w-full">
            <div className="text-5xl font-bold basis-1/5">3</div>
            <div className="text-2xl font-bold basis-4/5">{t("manfaat-3")}</div>
          </div>
        </div>
        <Link href="/">
          <a className="h-full flex-1 text-center">
            <div className="bg-white rounded-full border border-secondary-500  shadow-lg px-4 py-3 mb-5 mt-2">
              <p className="text-secondary-500 font-bold text-lg">{t("btn-header-1")}</p>
            </div>
          </a>
        </Link>
        <p className="text-secondary-500 font-bold text-lg mt-6 mb-3">{t("text-h-4")}</p>
        <p className="font-bold text-3xl">{t("text-h-5")}</p>
        <div className="mt-8">
          <div className="flex flex-wrap border-x border-y border-secondary-500 py-6 px-2">
            <div className="flex flex-row justify-items-center w-full m-auto">
              <div className="justify-items-center px-2">
                <Image src={"/images/icons/jenis-1.png"} alt={"jenis"} height="70" width="70" />
              </div>
              <div className="item-center">
                <p className="text-3xl font-bold py-4 px-6">Hepatitis B</p>
              </div>
            </div>
            <div>
              <p className="text-lg">{t("jenis-1")}</p>
            </div>
          </div>
          <div className="flex flex-wrap border-x border-b border-secondary-500 py-6 px-2">
            <div className="flex flex-row justify-items-center w-full m-auto">
              <div className="justify-items-center px-2">
                <Image src={"/images/icons/jenis-2.png"} alt={"jenis"} height="70" width="70" />
              </div>
              <div className="item-center">
                <p className="text-3xl font-bold py-4 px-6">Vaksin Polio</p>
              </div>
            </div>
            <div>
              <p className="text-lg">{t("jenis-2")}</p>
            </div>
          </div>
          <div className="flex flex-wrap border-x border-b border-secondary-500 py-6 px-2">
            <div className="flex flex-row justify-items-center w-full m-auto">
              <div className="justify-items-center px-2">
                <Image src={"/images/icons/jenis-3.png"} alt={"jenis"} height="70" width="70" />
              </div>
              <div className="item-center">
                <p className="text-3xl font-bold py-4 px-6">Vaskin BCG</p>
              </div>
            </div>
            <div>
              <p className="text-lg">{t("jenis-3")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="ml-12 relative top-[75px]">
          <Image src={"/images/icons/virus.png"} alt={"jenis"} height="170" width="170" />
        </div>
        <div className="flex flex-col bg-secondary-100 mx-6 rounded-lg">
          <div className="flex flex-col">
            <div className="mx-6 mt-16">
              <p className="text-2xl text-secondary-500">{t("jadwal-vaksin")}</p>
            </div>
            <div className="mx-6 mt-5">
              <p className="text-3xl text-gray">{t("cek-jadwal")}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap">
              <Image src={"/images/icons/blok.png"} alt={"jenis"} height="300" width="420" />
            </div>
            <Link href="/">
              <a className="h-full flex-1 text-center -top-6">
                <div className="bg-secondary-500 rounded-full shadow-lg px-4 py-3 mx-6 mb-5">
                  <p className="text-white font-bold text-lg">{t("cek-sekarang")}</p>
                </div>
              </a>
            </Link>
            <div className="mx-auto pl-6">
              <Image src={"/images/icons/bidan.png"} alt={"jenis"} height="475" width="290" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
