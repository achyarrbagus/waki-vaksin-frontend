import Chatbot from "react-chatbot-kit";
import config from "@/components/chatbot/config";
import MessageParser from "@/components/chatbot/MessageParser";
import ActionProvider from "@/components/chatbot/ActionProvider";
import Layout from "@/components/Layout";

const index = () => {
  return (
    <>
      <Layout title="Chat vaksini" back="/">
        <div className="bg-white">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      </Layout>
    </>
  );
};

export default index;
