import DepositBorder from "@/Assets/images/assets/depositBorder.png";
import PublicCopy from "@/Components/PublicCopy";
import styleScope from "./index.module.scss";
import { mergeClassName } from "@/utils/base";
import { useEffect, useLayoutEffect, useState } from "react";
import { BindGoogleAuth } from "@/Api";

const GoogleValidator = () => {
  const iconClick = (e: any) => {
    console.log(e, "----");
  };
  let [QrImg, setQrImg] = useState('')
  useLayoutEffect(()=>{
    BindGoogleAuth().then(res=>{
      setQrImg(res.value)
    })
  },[])
  return (
    <div className={mergeClassName(styleScope["assets_deposit"], "public_w")}>
      <p className="mt-[.4rem] text-[.28rem] text-[#333] text-center">
        扫描Google验证码进行绑定，或复制密钥进行绑定 妥善保存此二维码
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
      {/* <PublicCopy
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
      /> */}
    </div>
  );
};
export default GoogleValidator;
