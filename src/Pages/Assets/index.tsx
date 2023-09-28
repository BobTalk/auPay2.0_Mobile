import PublicHead from "@/Components/PublicHead";
import PublicFoo from "@/Components/PublicFoo";
import styleScope from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { HeadConfig } from "@/Assets/config/head";
import { mergeClassName } from "@/utils/base";
import PropertyComp from "../Property";
const Assets = () => {
  let headData = Object.assign(HeadConfig, {
    title: "资产",
    back: "",
    className: "text-[#333]",
  });
  const navigate = useNavigate();
  const toDetail = (crt: any) => {
    let {
      currencyChain,
      currencyId,
      flag: title,
      realM,
      rmbM,
      userId,
    } = crt ?? {};
    navigate("/assets/detail", {
      state: { currencyChain, currencyId, title, realM, rmbM, userId },
    });
  };
  return (
    <>
      <div
        className={mergeClassName(styleScope["assets_w"], "p-[0_.3rem_.3rem]")}
      >
        <PublicHead {...headData} />
        <div className={styleScope["assets_banner"]}>
          <p className={styleScope["assets_banner_tit"]}>auPay资产余额(USDT)</p>
          <div className={styleScope["assets_banner_money"]}>
            <p>87,823.00</p>
            <i className="text-[.32rem]">¥123,302.09</i>
          </div>
          <i className={styleScope["assets_banner_line"]}></i>
          <span className={styleScope["assets_banner_record"]}>
            最近交易：2020-09-17  充币 13USDT-TRC20
          </span>
        </div>
        <PropertyComp onClick={(crt: any) => toDetail(crt)} />
      </div>
      <PublicFoo />
    </>
  );
};

export default Assets;
