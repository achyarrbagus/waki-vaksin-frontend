import Options from "@/components/chatbot/widget/Options";

const StatusVaksin = (props) => {
  const options = [
    {
      name: "Sudah",
      handler: props.actionProvider.handleSudahVaksin,
      id: 1,
    },
    {
      name: "Belum",
      handler: props.actionProvider.handleBelumVaksin,
      id: 2,
    },
  ];
  return <Options options={options} title="" />;
};

export default StatusVaksin;
