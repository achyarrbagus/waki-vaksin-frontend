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
}

export default ActionProvider;
