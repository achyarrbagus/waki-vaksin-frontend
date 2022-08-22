import Layout from "@/components/Layout"
import { useContext } from "react"
import dynamic from "next/dynamic";
import AppContext from "@/components/AppContext"

const DynamicAppWithNoSSR = dynamic(() => import("@/components/ChatDoctor"), {
    ssr: false,
    loading: () => <p>...</p>
});


export default function ChatPage({ slug }) {
    const context = useContext(AppContext)
    context.setSlugs(slug)

    return (
        <Layout title={`Chat`} headerAction={`endchat`}>
            <DynamicAppWithNoSSR slug={slug} />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const slug = context.params.slug

    return {
        props: {
            slug
        }
    }
}