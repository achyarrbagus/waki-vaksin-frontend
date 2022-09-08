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

  handleSudahVaksin = () => {
    const message = this.createClientMessage("Sudah");
    this.addMessageToState(message);
  };

  handleBelumVaksin = () => {
    const message = this.createClientMessage("Belum");
    this.addMessageToState(message);
  };
}

export default ActionProvider;
