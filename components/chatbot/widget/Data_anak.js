import { Spin, message, DatePicker } from "antd";
import moment from "moment";

const Data_anak = (props) => {
  const as = props.state.messages.message;
    const date = new Date(
      new Date().setFullYear(new Date().getFullYear() - 17)
    );

  return (
    <>
      <div className="options">
        <h1 className="options-header">Data Anak</h1>
        <div className="options-container">
          <div className="flex flex-col w-3/5">
            <div
              className="option-item font-bold"
              onClick={props.actionProvider.handleInputNamaAnak}
              key="1"
            >
              <p className="">Nama Anak :</p>
            </div>
            <div
              className="option-item font-bold"
              onClick={props.actionProvider.handleInputTglLahir}
              key="1"
            >
              <p className="">Tanggal Lahir Anak :</p>
            </div>
            <div className="flex flex-row w-full">
              <div
                className="option-item font-bold w-1/2"
                onClick={props.actionProvider.handleInputJkL}
                key="1"
              >
                <p className="">Laki - Laki </p>
              </div>
              <div
                className="option-item font-bold w-1/2"
                onClick={props.actionProvider.handleInputJkP}
                key="1"
              >
                <p className="">Perempuan </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Data_anak;
