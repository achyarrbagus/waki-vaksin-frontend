import { useState, useContext } from "react";
import AppContext from "@/components/AppContext";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  setChatbotMessage = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };

  greet = (botMessage) => {
    const message = this.createChatBotMessage(botMessage);
    this.addMessageToState(message);
  };

  clientMessage = (clientMessage) => {
    const message = this.createClientMessage(clientMessage);
    this.addMessageToState(message);
  };

  // const message = this.createChatBotMessage("Hello,what do you want ?", {
  //   widget: "options",
  // });
  messageHandler = () => {
    const message = this.createChatBotMessage("Hello,what do you want ?");
    this.setChatbotMessage(message);
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage("Please try again");
    this.setChatbotMessage(message);
  };

  addMessageToState = (message) => {
    this.setState((prevstate) => ({
      ...prevstate,
      messages: [...prevstate.messages, message],
    }));
  };

  /*  const message = this.createClientMessage("#Ayah :");
   this.addMessageToState(message); */
  handleAyah = () => {
    var els = document.querySelector(
      'input[class="react-chatbot-kit-chat-input"]'
    );
    els.focus();
    els.value = "ayah: ";
  };

  handleBunda = () => {
    var els = document.querySelector(
      'input[class="react-chatbot-kit-chat-input"]'
    );
    els.focus();
    els.value = "bunda: ";
  };

  handleVaksinStatus = (props) => {
    const message = this.createChatBotMessage(
      `Apakah ${props} sudah pernah cek status vaksin anak Anda di Cepat Sehat?`,
      {
        widget: "StatusVaksin",
      }
    );
    this.addMessageToState(message);
  };

  handleSudahVaksin = (props) => {
    const message = this.createClientMessage("Sudah");
    this.addMessageToState(message);
    const message2 = this.createChatBotMessage(
      `Silahkan masukkan nomor handphone Bunda ${props} yang telah terdaftar.`,
      {
        widget: "No_hp",
      },
      {
        delay: 300,
      }
    );
    this.addMessageToState(message2);
  };

  handleBelumVaksin = (props) => {
    const message = this.createClientMessage("Belum");
    this.addMessageToState(message);
    const message2 = this.createChatBotMessage(
      `Baik, Vaksini membutuhkan data diri anak  ${props}. Silahkan masukkan data anak  ${props}:`,
      {
        widget: "Data_anak",
      },
      {
        delay: 300,
      }
    );
    this.addMessageToState(message2);
  };

  handleInputNamaAnak = () => {
    var els = document.querySelector(
      'input[class="react-chatbot-kit-chat-input"]'
    );
    els.focus();
    els.value = "Nama: ";
  };

  handleInputTglLahir = () => {
    var els = document.querySelector(
      'input[class="react-chatbot-kit-chat-input"]'
    );
    els.focus();
    els.setAttribute("type", "date");
  };

  handleInputJkL = () => {
    const message = this.createClientMessage(`Laki-Laki`);
    this.addMessageToState(message);
  };

  handleInputJkP = () => {
    const message = this.createClientMessage(`Perempuan`);
    this.addMessageToState(message);
  };

  handleInputNoHP = () => {
    var els = document.querySelector(
      'input[class="react-chatbot-kit-chat-input"]'
    );
    els.focus();
    // els.setAttribute("type", "number");
    els.value = "+62";
  };

  handleViewProfile = (props) => {
    const message2 = this.createChatBotMessage(
      `Silakan klik link berikut untuk melihat buku vaksin anak An. Nama_Anak.`,
      {
        widget: "Link_profile",
      },
      {
        delay: 300,
      }
    );
    this.addMessageToState(message2);
  };
}

export default ActionProvider;
