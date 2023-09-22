import { GetAssetsInfo, GetUSDTTickers } from "@/Api";
import styleScope from "./index.module.scss";
import { useCallback, useEffect, useState } from "react";
import { mergeClassName, thousands } from "@/utils/base";
type PropertyComp = {
  onClick?: Function;
};
const PropertyComp = (props: PropertyComp) => {
  let [assets, setAssets] = useState<any>({});
  let [ratio, setRatio] = useState<Array<object>>([]);
  async function getAssetsInfo() {
    let assets = await GetAssetsInfo();
    let ratio = await GetUSDTTickers();
    setRatio(ratio.value);
    setAssets(assets);
  }
  useEffect(() => {
    getAssetsInfo();
  }, []);
  // icon图标
  function cssIcon(id: number): string | undefined {
    let unit = "EOS";
    if (id === 1) unit = "BTC";
    if (id === 2) unit = "ETH";
    if (id === 3) unit = "USDT";
    return unit;
  }
  // icon图标
  function iconColor(id: number): string | undefined {
    let unit = "text-[#030133]";
    if (id === 1) unit = "text-[#f7931b]";
    if (id === 2) unit = "text-[#3e5bf2]";
    if (id === 3) unit = "text-[#17a37a]";
    return unit;
  }
  // 处理单位
  function formatUnit(id: number, chain?: number): string | undefined {
    let unit = "EOS";
    if (id === 1) unit = "BTC";
    if (id === 2) unit = "ETH";
    if (id === 3) {
      if (chain === 1) unit = "USDT-OMNI";
      if (chain === 2) unit = "USDT-ERC20";
      if (chain === 3) unit = "USDT-TRC20";
    }
    return unit;
  }
  function rmbConvert(id: number, money: number): number {
    let m = money;
    if (id === 1) {
      let o: any = ratio.find((item: any) => item.symbol === "btcusdt");
      m = Number(o?.["bid"]) * money;
    }
    if (id === 2) {
      let o: any = ratio.find((item: any) => item.symbol === "ethusdt");
      m = Number(o?.["bid"]) * money;
    }
    return m;
  }
  const itemClickCb = useCallback((e: any, crt: any) => {
    e.stopPropagation();
    props?.onClick?.(crt);
  }, []);
  return (
    <ul className={styleScope["currency_list"]}>
      {assets?.list?.map((item: any, index: number) => {
        return (
          <li
            key={item.userId + "_" + index}
            onClick={(e) => itemClickCb(e, item)}
          >
            <div className={styleScope["currency_icon"]}>
              <i
                className={mergeClassName(
                  "iconfont",
                  `icon-${cssIcon(item.currencyId)}`,
                  `${iconColor(item.currencyId)}`
                )}
              ></i>
              <p>{formatUnit(item.currencyId, item.currencyChain)}</p>
            </div>
            <div className={styleScope["currency_money"]}>
              <p>{thousands(item.feeBalance) ?? "--"} USDT</p>
              <span>
                ¥
                {thousands(rmbConvert(item.currencyId, item.feeBalance)) ?? "0"}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
PropertyComp.defaultProps = {
  onClick: () => {},
};
export default PropertyComp;
