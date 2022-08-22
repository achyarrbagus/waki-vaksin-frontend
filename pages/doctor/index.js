import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import Layout from '/components/Layout'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image"

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    }
  }
}

export default function DetailDoctor() {
  const { query } = useRouter();
  const id = query.id
  const { t } = useTranslation();

  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    fetchDoctor()
  }, [])

  const fetchDoctor = async () => {
    await fetch(`/api/doctor?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        setDoctor(json)
      })
  }

  return (
    <Layout title={t('dd-dokter')} back={"/"}>
      <div className='bg-white h-full shadow-md'>
        {doctor ?
          <div className='flex flex-col justify-between h-full pb-6'>
            <div className='flex-1'>
              <div className='w-full bg-primary-700'>
                <div className='flex flex-col'>
                  <div className='flex items-center justify-center my-3'>
                    <div className='relative flex justify-center items-center'>
                      <div className="rounded-full ring-2 ring-white object-cover w-40 h-40 mt-8">
                        <Image
                          src={`https://api.sehatcepat.com/images/doctor/${doctor.photo}`}
                          alt="suratsakit"
                          width={160}
                          height={160}
                          className="rounded-full ring-2 ring-white object-cover w-40 h-40"
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-center mb-3'>
                    <h3 className='font-bold text-3xl text-white'>{doctor.name}</h3>
                    <h4 className='font-normal text-lg text-white'>{t("dd-nomor")} - <span className='font-bold'>{doctor.number}</span></h4>
                  </div>
                </div>
              </div>
              <div className='px-4 mb-4'>
                <div className='flex-1'>
                  <div className='flex items-center'>
                    <div className='px-4'>
                      <Image
                        src='/images/icons/ic_work.png'
                        alt="suratsakit"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className='border-b flex-auto py-3'>
                      <div className='text-gray-400 text-lg'>{t("dd-pengalaman")}</div>
                      <div className='text-gray-600 font-bold text-xl'>{doctor.experience} {t("dd-pengalaman")}</div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='px-4'>
                      <Image
                        src='/images/icons/ic_calendar.png'
                        alt="suratsakit"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className='border-b flex-auto py-3'>
                      <div className='text-gray-400 text-lg'>{t("dd-jadwal")}</div>
                      <div className='text-gray-600 font-bold text-xl'>{doctor.consultation_schedule}</div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='px-4'>
                      <Image
                        src='/images/icons/ic_location.png'
                        alt="suratsakit"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className='border-b flex-auto py-3'>
                      <div className='text-gray-400 text-lg'>{t("dd-tempat")}</div>
                      <div className='text-gray-600 font-bold text-xl'>{doctor.place_practice}</div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='px-4'>
                      <Image
                        src='/images/icons/ic_document.png'
                        alt="suratsakit"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className='border-b flex-auto py-3'>
                      <div className='text-gray-400 text-lg'>{t("dd-lulusan")}</div>
                      <div className='text-gray-600 font-bold text-xl'>{doctor.graduated_from}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : <div className='p-4'><Skeleton count={20} /></div>
        }
      </div>
    </Layout>
  )
}

