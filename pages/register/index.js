import Link from 'next/link'
import Layout from '/components/Layout'
import Footer from '/components/Footer'
import Image from 'next/image'
import { AiOutlineArrowRight } from 'react-icons/ai'
import SliderUpdatedArticle from '/components/mobiles/SliderUpdatedArticle'

function register() {
    return (
        <Layout title='Register' back="/">
            <div className='w-full px-4 my-4'>
                <label htmlFor='promo' className="block text-lg font-bold text-gray-700">Kode Promo</label>
                <div className="mt-1 flex items-center">
                    <input
                        type="text"
                        name="promo"
                        id="promo"
                        placeholder="Masukan Kode Promo"
                        className="mt-1 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md p-2"
                    />
                    <button
                        type="button"
                        className="ml-3 bg-white py-2 px-3 border-2 border-secondary-500 rounded-full shadow-sm text-md font-medium text-secondary-500 hover:bg-gray-50"
                    >
                        Pakai
                    </button>
                </div>
            </div>
            <Footer />
        </Layout>
    );
}

export default register;