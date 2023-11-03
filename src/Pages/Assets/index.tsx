import PublicHead from "@/Components/PublicHead";
import PublicFoo from "@/Components/PublicFoo";
import styleScope from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { HeadConfig } from "@/Assets/config/head";
import { formatUnit, mergeClassName, timeFormate } from "@/utils/base";
import PropertyComp from "../Property";
import PublicScroll from "@/Components/PublicScroll";
import { GetAssetsInfo } from "@/Api";
import { useEffect, useState } from "react";
import { useRMBConversion } from "@/Hooks/RMBConversion";
import { EyeFill, EyeInvisibleFill } from "antd-mobile-icons";
const Assets = () => {
  let [assets, setAssets] = useState<any>({});
  let [showDetail, setShowDetail] = useState(false);
  let [m, format] = useRMBConversion();
  let headData = Object.assign(HeadConfig, {
    title: "资产",
    back: "",
    className: "text-[#333] p-[.32rem_.3rem]",
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
  async function getAssetsInfo() {
    let { ozBalance, list=[], recentAupayUserTraderRecord } =
      await GetAssetsInfo();
      recentAupayUserTraderRecord = recentAupayUserTraderRecord ?? {};
    let total = list?.map((item: any) => {
      return format(item.currencyId, item.availableBalance);
    });
    setAssets({
      ozBalance,
      total: total.reduce(
        (prv: number, next: number) => ((prv += next), prv),
        0
      ),
      tradeTime: timeFormate(recentAupayUserTraderRecord.finishTime),
      type: formatUnit(
        recentAupayUserTraderRecord.currencyId,
        recentAupayUserTraderRecord.currencyChain
      ).unit,
      state: recentAupayUserTraderRecord.state,
      id: recentAupayUserTraderRecord.id,
      currencyId: recentAupayUserTraderRecord.currencyId,
      currencyChain: recentAupayUserTraderRecord.currencyChain,
      tradeType: recentAupayUserTraderRecord.tradeType,
      tradeName: recentAupayUserTraderRecord.tradeType === 1 ? "充币" : "提币",
    });
  }
  useEffect(() => {
    getAssetsInfo();
  }, []);
  return (
    <PublicScroll>
      <div
        className={mergeClassName(styleScope["assets_w"], "p-[0_.3rem_.3rem]")}
      >
        <PublicHead {...headData} />
        <div className={styleScope["assets_banner"]}>
          <p className={styleScope["assets_banner_tit"]}>
            auPay资产余额(USDT)
            {showDetail ? (
              <EyeFill
                onClick={() => setShowDetail(!showDetail)}
                className="ml-[.1rem] text-[.28rem]"
              />
            ) : (
              <EyeInvisibleFill
                onClick={() => setShowDetail(!showDetail)}
                className="ml-[.1rem] text-[.28rem]"
              />
            )}
          </p>
          <div className={styleScope["assets_banner_money"]}>
            <p>{!showDetail ? "*****" : assets.total ?? 0}</p>
            <i className="text-[.32rem] flex items-center">
              {!showDetail ? "*****" : assets.ozBalance ?? 0}
            </i>
          </div>
          <i className={styleScope["assets_banner_line"]}></i>
          <span className={styleScope["assets_banner_record"]}>
            最近交易：{assets.tradeTime} {assets.tradeName} {assets.type}
          </span>
        </div>
        <PropertyComp onClick={(crt: any) => toDetail(crt)} />
      </div>
      <PublicFoo />
    </PublicScroll>
  );
};

export default Assets;
