import PublicHead from "@/Components/PublicHead";
import { Avatar } from "antd-mobile";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InfoSecurity } from "../../Enum";
import { HeadConfig } from "@/Assets/config/head";
import { GetUserApplyApplication } from "@/Api";
import appLogo from "../../../Assets/images/app_logo.png";
import styleScope from "./index.module.scss";

const AppManager = (props: any) => {
  const HeaderEl = useRef();
  const Navigate = useNavigate();
  let [pageList, usePageList] = useState([]);
  let { state: urlParams }: any = useLocation();
  let headInfo = Object.assign(HeadConfig, {
    title: props.headTitle ?? urlParams?.headTitle,
    back: "goBack",
    className:
      "p-[.32rem_.3rem] h-[auto] border-b-[1px] border-b-[rgba(197,202,208,1)]",
  });
  function unBind(e: MouseEvent, crt: { applicaitonId: string }) {
    console.log("crt: ", crt);

    Navigate("/resetpwd", {
      state: {
        crt: {
          type: InfoSecurity["unbind"],
          id: crt.applicaitonId,
        },
        headTitle: "解除绑定",
      },
    });
  }
  function getPageInfo() {
    GetUserApplyApplication().then((res) => {
      usePageList(res.value);
    });
  }
  useEffect(() => {
    getPageInfo();
  }, []);
  return (
    <>
      <PublicHead {...headInfo} ref={HeaderEl} />
      <ul className="mx-[.3rem]">
        {pageList.length? pageList?.map((item: any) => (
          <li
            key={item.applicaitonId}
            className="flex py-[.3rem] justify-between border-b-[#DBDBDB] border-b-[1px]"
          >
            <div className="flex">
              <Avatar
                src={appLogo}
                style={{ "--size": ".8rem", "--border-radius": ".16rem" }}
                className={styleScope["aspect-square"] + " " + "mr-[.24rem]"}
              />
              <p className="flex flex-col justify-center">
                <span className="text-[.3rem] text-[#333] font-[700]">
                  {item.applicaitonName ?? "--"}
                </span>
                <span className="text-[.26rem] text-[#333]">
                  用户名：{item.applicationUsername}
                </span>
              </p>
            </div>
            <span
              onClick={(e) => unBind(e, item)}
              className="text-[.26rem] text-[#63717B] flex items-end"
            >
              解除绑定
            </span>
          </li>
        )):<p className="text-[.3rem] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">暂无数据</p> }
      </ul>
    </>
  );
};
export default AppManager;
