import { createChatBotMessage } from "react-chatbot-kit";
import Header from "@/components/chatbot/widget/Header";
import Botavatar from "@/components/chatbot/widget/Botavatar";
import NamaOrtu from "@/components/chatbot/widget/NamaOrtu";
import SelectOption from "@/components/chatbot/widget/SelectOption";
// import Contact from "./widgets/Contact";
// import MedicineDelivery from "./widgets/MedicineDelivery";
// import CoBotAvatar from "./CoBotAvatar";

const config = {
  lang: "id",
  botName: "Vaksini",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#E8F4F7",
    },
    chatButton: {
      backgroundColor: "#ffffff",
    },
  },
  initialMessages: [
    createChatBotMessage(`Halo selamat datang!`, {
      delay: 100,
    }),
    createChatBotMessage(
      `Saya Vaksini siap membantu Anda untuk cek status vaksin anak Anda.`,
      {
        delay: 200,
      }
    ),
    createChatBotMessage("Sebelumnya, Vaksini berbicara dengan siapa?", {
      withAvatar: false,
      delay: 300,
      widget: "NamaOrtu",
    }),
  ],
  customComponents: {
    // Replaces the default header
    header: () => <Header />,
    botAvatar: (props) => <Botavatar {...props} />,
  },
  // state: {},
  widgets: [
    {
      widgetName: "NamaOrtu",
      widgetFunc: (props) => <NamaOrtu {...props} />,
      mapStateToProps: ["messages"],
    },
  ],

  //     {
  //       widgetName: "globalStatistics",
  //       widgetFunc: (props) => <GlobalStatistics />
  //     },
  //     {
  //       widgetName: "localStatistics",
  //       widgetFunc: (props) => <LocalStatistics />
  //     },
  //     {
  //       widgetName: "emergencyContact",
  //       widgetFunc: (props) => <Contact />
  //     },
  //     {
  //       widgetName: "medicineDelivery",
  //       widgetFunc: (props) => <MedicineDelivery />
  //     }
};

export default config;
