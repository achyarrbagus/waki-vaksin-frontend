import { Spin, message, DatePicker } from "antd";
import moment from "moment";
import { Input, Select, Option } from "@material-tailwind/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Data_anak = (props) => {
  const as = props.state.messages.message;
  const date = new Date(new Date().setFullYear(new Date().getFullYear() - 17));
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    gender: Yup.string().required("Required"),
    dateofbirth: Yup.string().required("Required"),
  });

  const onSubmitForm = async (values) => {
    // var phone = t("phone_code") + values.phone;
    // var dt = {
    //   name: values.name,
    //   phone: phone,
    //   dateofbirth: values.dateofbirth,
    // };
    // context.setdata_diri(dt);
    // setLoading(true);
    // const resData = await fetch(`/api/post_quest`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     data: {
    //       cont: context,
    //       name: values.name,
    //       phone: phone,
    //       local: locals,
    //       dateofbirth: values.dateofbirth,
    //       camp: datacamp,
    //     },
    //   }),
    // });
    // const res = await resData.json();
    // if (resData.status != 200) {
    //   message.error(res.message);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    //   message.success(`Success`);
    //   router.push(`/step/surat?phone=${values.phone}&uid=${res.uid}`);
    // }
  };
  return (
    <>
      <div className="options">
        <h1 className="options-header">Data Anak</h1>
        <div className="options-container">
          <div className="flex flex-col w-3/5">
            <Formik
              initialValues={{ name: "", dateofbirth: "", gender: "" }}
              validationSchema={RegisterSchema}
              onSubmit={onSubmitForm}
            >
              <Form>
                <div className="my-2">
                  <Field
                    name="email"
                    className="w-full py-2 px-3 rounded-full text-sm text-secondary-500 bg-white border border-secondary-500 overflow-hidden focus:outline-none focus:border-secondary-500 focus:ring-secondary-700 focus:ring-1"
                    type="email"
                    placeholder="Nama Anak"
                  />{" "}
                </div>
                <div className="my-2">
                  <DatePicker
                    format="YYYY-MM-DD"
                    name="dateofbirth"
                    placeholder="Tanggal Lahir Anak"
                    onChange={(date, dateString) =>
                      setFieldValue("dateofbirth", dateString)
                    }
                    className={`py-2 px-3 rounded-full text-lg text-secondary-500 bg-white border border-secondary-500 overflow-hidden focus:outline-none focus:border-secondary-500 focus:ring-secondary-700 focus:ring-1 w-full`}
                  />
                </div>
                <div className="my-2">
                  <Field
                    as="select"
                    name="gender"
                    placeholder="Jenis Kelamin Anak"
                    className={`py-2 px-3 rounded-full text-lg text-secondary-500 bg-white border border-secondary-500 overflow-hidden focus:outline-none focus:border-secondary-500 focus:ring-secondary-700 focus:ring-1 w-full`}
                  >
                    <option value="male">Laki - Laki</option>
                    <option value="female">Perempuan</option>
                  </Field>
                </div>
              </Form>
            </Formik>
            {/* <div
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
            </div> */}
            <div className="option-item font-bold" onClick={""} key="1">
              <p className="">Submit</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Data_anak;
