import Options from "@/components/chatbot/widget/Options";

const NamaOrtu = () => {
    const options = [
    {
      name: "Bunda",
      handler: '',
      id: 1
    },
    {
      name: "Ayah",
      handler: '',
      id: 2
    }
  ];
  return <Options options={options} title="" />;
}

export default NamaOrtu;