import Layout from "@/components/Layout"
import dynamic from "next/dynamic";

const DynamicAppWithNoSSR = dynamic(() => import("@/components/ChatUser"), {
    ssr: false,
    loading: () => <p>...</p>
});


export default function ChatPage({ slug }) {
    return (
        <Layout title={`Chat`}>
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