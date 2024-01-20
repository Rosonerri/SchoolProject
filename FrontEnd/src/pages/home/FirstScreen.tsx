import { useEffect, useState } from "react";
import Input from "../../components/reUse/Input";
import Button from "../../components/reUse/Button";
import {
  changeSchoolName,
  changeSchoolRef,
  changeSchoolStarted,
} from "../../api/schoolAPIs";
import { useSchoolCookie } from "../../hook/useSchoolAuth";

const FirstScreen = () => {
  const [schoolName, setSchoolName] = useState<string>("");

  const [dataInfo2, setDataInfo2]: any = useState([
    { val: "Nur.", state: false, id: 1 },
    { val: "Pri.", state: true, id: 2 },
    { val: "Sec.", state: false, id: 3 },
    { val: "Ter.", state: false, id: 4 },
    { val: "KG.", state: false, id: 5 },
  ]);

  const { dataID } = useSchoolCookie();

  const [dataInfo, setDataInfo] = useState([]);

  useEffect(() => {
    setDataInfo(JSON.parse(localStorage.getItem("dataInfo")!));
  }, []);

  let newVal = dataInfo.filter((el: any) => el.state === true);

  return (
    <div className="flex text-blue-950 flex-col w-full h-screen items-center justify-center">
      <div className="mt-60" />
      <div className="mb-10 bg-blue-950 text-white p-4 ">
        Please enter school Infos
      </div>

      <div className="w-[90%] md:w-[600px]">
        <Input
          placeholder="Enter school Name"
          className="w-full"
          value={schoolName}
          onChange={(e: any) => {
            setSchoolName(e.target.value);
          }}
        />

        <div className="flex justify-center">
          {dataInfo?.map((props: any) => (
            <div
              className={`border rounded-md p-4 m-2 cursor-pointer ${
                props.state && "bg-blue-950 text-white"
              } `}
              style={{
                backgroundColor: `${props.state ? "#172554" : "white"}`,
                color: `${props.state ? "white" : "#172554"}`,
              }}
              onClick={() => {
                console.log(props.val);
                let data: any = dataInfo.find((el: any) => {
                  return el.id === props.id;
                });
                data.state = !data.state;

                localStorage.setItem("dataInfo", JSON.stringify([...dataInfo]));

                // setDataInfo2([...dataInfo]);
                console.log(dataInfo);
              }}
            >
              {props.val}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center mt-20">
          <Button
            name="Submit"
            className="bg-blue-950 w-[80%] py-4"
            onClick={() => {
              changeSchoolName(dataID, { schoolName });
              changeSchoolRef(dataID, { refValue: newVal });
              changeSchoolStarted(dataID);
            }}
          />
        </div>
      </div>

      <div className="flex-1" />
      <div className="w-full flex flex-col items-center">
        <div className="border-b w-[40%]  " />

        <div className="text-[13px] mt-2">This project is Built </div>
        <p className="font-medium text-[14px] mt-1">With you in Mind </p>
      </div>
    </div>
  );
};

export default FirstScreen;
