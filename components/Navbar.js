import { useRouter } from 'next/router'
import Link from 'next/link'

import {
    IconHome
} from '/components/svg/Icon'


function Navbar() {
    const router = useRouter()

    const navigations = [
        {
            label: 'Home',
            url: '/',
            component: IconHome,
        },
        {
            label: 'Dokter',
            url: '/dokter',
            component: IconHome,
        },
        {
            label: 'Pembayaran',
            url: '/payment',
            component: IconHome,
        },
        {
            label: 'Artikel',
            url: '/artikel',
            component: IconHome,
        },
    ]

    //=============================================================//
    //=================== COMPONENT - LISTENER ====================//
    //=============================================================//
    function isActive(url) {
        return String(router.pathname).toLowerCase().startsWith(url)
    }

    return (
        <nav
            className="fixed flex w-full bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 max-w-layout"
        >
            {navigations.map(({ component: Component, label, url }) => {
                return (
                    <Link href={url} key={url}>
                        <a className="h-full flex-1">
                            <div className="h-12 pt-1 flex items-center justify-center">
                                <Component isActive={isActive(url)} />
                            </div>
                            <div
                                className="text-center font-semibold pb-2"
                                style={{
                                    color: isActive(url) ? '#D46600' : '#656D86',
                                    fontSize: '12px',
                                }}
                            >
                                {label}
                            </div>
                        </a>
                    </Link>
                )
            })}
        </nav>
    )
}

export default Navbar;