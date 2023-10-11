import PublicHead from "@/Components/PublicHead";
import styleScope from "./index.module.scss";
import DepositBorder from "@/Assets/images/assets/depositBorder.png";
import QrImg from "@/Assets/images/test/qr.png";
import PublicCopy from "@/Components/PublicCopy";
import PublicSummary from "@/Components/PublicSummary";
import { HeadConfig } from "@/Assets/config/head";
import { mergeClassName } from "@/utils/base";
import { useLocation } from "react-router-dom";

const Deposit = () => {
  let {state:urlParams} = useLocation()
  let headData = Object.assign(HeadConfig, {
    title: `充币${urlParams.title}`,
    back: "goBack",
    className: "text-[#333] py-[.32rem]",
  });
  const iconClick = (e: any) => {
    console.log(e, "----");
  };
  return (
    <div className={styleScope["assets_deposit"]}>
      <PublicHead {...headData} />
      <p className={styleScope["assets_deposit_tit"]}>
        这是您的USDT-ERC20钱包地址
        <br />
        请将您的USDT-ERC20转入此地址
      </p>
      <div className={styleScope["assets_deposit_qr"]}>
        <div className={styleScope["assets_deposit_qr_info"]}>
          <img
            className={styleScope["assets_deposit_qr_info_img"]}
            src={QrImg}
            alt=""
          />
          <img
            className={mergeClassName(
              styleScope["assets_deposit_qr_info_border"],
              styleScope["assets_deposit_qr_info_border1"]
            )}
            src={DepositBorder}
            alt=""
          />
          <img
            className={mergeClassName(
              styleScope["assets_deposit_qr_info_border"],
              styleScope["assets_deposit_qr_info_border2"]
            )}
            src={DepositBorder}
            alt=""
          />
          <img
            className={mergeClassName(
              styleScope["assets_deposit_qr_info_border"],
              styleScope["assets_deposit_qr_info_border3"]
            )}
            src={DepositBorder}
            alt=""
          />
          <img
            className={mergeClassName(
              styleScope["assets_deposit_qr_info_border"],
              styleScope["assets_deposit_qr_info_border4"]
            )}
            src={DepositBorder}
            alt=""
          />
        </div>
      </div>
      <PublicCopy
        textStyle={{
          fontSize: ".28rem",
          color: "#333",
          letterSpacing: 0,
          textAlign: "justify",
          fontWeight: 400,
        }}
        rows={2}
        style={{ marginTop: ".5rem" }}
        info="TQCNPKq3sLCW6ffsFPd3ZqYyt6HFKNBUTbTQCNPKq3sLCW6ffsFPd3ZqYyFPd3ZqYyFPd3ZqYy"
        click={iconClick}
      />
      <PublicSummary
        iconStyle={{
          color: "#2563f5",
        }}
        titleStyle={{
          fontSize: ".32rem",
          color: "#333",
          letterSpacing: 0,
          fontWeight: 500,
        }}
        summaryStyle={{
          fontSize: ".28rem",
          color: "#999",
          letterSpacing: 0,
          textAlign: "justify",
          lineHeight: ".38rem",
          fontWeight: 400,
        }}
        style={{ marginTop: ".7rem" }}
      />
    </div>
  );
};
export default Deposit;
