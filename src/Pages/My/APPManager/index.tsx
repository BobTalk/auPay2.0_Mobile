import PublicHead from "@/Components/PublicHead";
import { Avatar } from "antd-mobile";
import { MouseEvent, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InfoSecurity } from "../../Enum";

const AppManager = (props: any) => {
  const HeaderEl = useRef();
  const Navigate = useNavigate();
  let { state: urlParams }: any = useLocation();
  let headInfo = {
    title: props.headTitle ?? urlParams?.headTitle,
    back: "goBack",
    titleStyle: { fontSize: ".34rem", color: "#333" },
    iconStyle: { fontSize: ".34rem", left: ".15rem" },
    style: {
      padding: ".32rem .3rem",
      borderBottom: "1px solid rgba(197,202,208,1)",
      height: "auto",
    },
  };
  function unBind(e: MouseEvent, crt: object) {
    Navigate("/resetpwd", { state: {crt:{
      type: InfoSecurity['unbind']
    },headTitle:'解除绑定'} });
  }

  return (
    <>
      <PublicHead {...headInfo} ref={HeaderEl} />
      <ul className="mx-[.3rem]">
        <li className="flex py-[.3rem] justify-between border-b-[#DBDBDB] border-b-[1px]">
          <div className="flex">
            <Avatar
              src=""
              style={{ "--size": ".8rem", "--border-radius": ".16rem" }}
              className="aspect-square mr-[.24rem]"
            />
            <p className="flex flex-col justify-center">
              <span className="text-[.3rem] text-[#333] font-[700]">Ozbet</span>
              <span className="text-[.26rem] text-[#333]">
                用户名：嘻嘻的嘻嘻
              </span>
            </p>
          </div>
          <span
            onClick={(e) => unBind(e, {})}
            className="text-[.26rem] text-[#63717B] flex items-end"
          >
            解除绑定
          </span>
        </li>
      </ul>
    </>
  );
};
export default AppManager;
