import { Fragment, useRef, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import AppContext from "@/components/AppContext"

export default function ChatLeave() {

    const [open, setOpen] = useState(false)
    const router = useRouter();
    const { query } = useRouter();
    const id = query.id
    const cancelButtonRef = useRef(null)
    const context = useContext(AppContext)

    const handleClick = () => {
        setOpen(true)
    }

    const handleSubmit = async () => {
        setOpen(false)

        const resData = await fetch(`/api/chat-leave`, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                idp: context.state.slugs
            })
        })

        const data = await resData.json()

        if (resData.ok) {
            setTimeout(() => {
                router.replace(`/`)
            }, [100])
        }
        return data
    }

    return (
        <>
            <button onClick={handleClick} className="bg-secondary-500 h-full hover:bg-grey-300 text-grey-300 font-bold py-2 px-3 inline-flex items-center">
                <span className='text-white font-bold text-sm'>END</span>
            </button>
            {open &&
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                        <div className="items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-secondary-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationIcon className="h-6 w-6 text-secondary-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                    {router.locale == 'id' ? 'Akhiri Percakapan' : 'End Chat'}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {router.locale == 'id' ? 'Apakah kamu yakin ingin mengakhiri percakapan ini?' : 'Are you sure you want to end chat? This action cannot be undone.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary-500 text-base font-medium text-white hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={(e) => handleSubmit(e)}
                                        >
                                            {router.locale == 'id' ? 'Ya' : 'Yes'}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            {router.locale == 'id' ? 'Batal' : 'Cancel'}
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            }

        </>
    )
}