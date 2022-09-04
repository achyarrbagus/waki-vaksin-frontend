import { Input,Select, Option } from "@material-tailwind/react";

const SelectOption = (props) => {
  return (
    <>
      <div className="w-full">
        <Select label="Gender" success>
          <Option>Ibu</Option>
          <Option>Ayah</Option>
        </Select>
      </div>
    </>
  );
};

export default SelectOption;
