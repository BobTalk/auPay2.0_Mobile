import { GetAssetsInfo, GetUSDTTickers } from "@/Api";
import styleScope from "./index.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { mergeClassName, thousands } from "@/utils/base";
import { useRMBConversion } from "@/Hooks/RMBConversion";

type PropertyComp = {
  onClick?: Function;
};
const PropertyComp = (props: PropertyComp) => {
  let [, setRMBConversion] = useRMBConversion();
  let [assets, setAssets] = useState<any>({});
  async function getAssetsInfo() {
    let assets = await GetAssetsInfo();
    setAssets(assets);
  }
  useEffect(() => {
    getAssetsInfo();
  }, []);
  // icon图标
  function cssIcon(id: number): string | undefined {
    let unit = "";
    if (id === 1) unit = "BTC";
    if (id === 2) unit = "ETH";
    if (id === 3) unit = "USDT";
    if (id === 4) unit = "TRX";
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
  let formatUnit = useCallback(
    (id: number, chain?: number): string | undefined => {
      let unit = "";
      if (id === 1) unit = "BTC";
      if (id === 2) unit = "ETH";
      if (id === 3) {
        if (chain === 1) unit = "USDT-OMNI";
        if (chain === 2) unit = "USDT-ERC20";
        if (chain === 3) unit = "USDT-TRC20";
      }
      if(id === 4){
        if(chain === 0) unit = "TRX"
      }
      return unit;
    },
    []
  );
  const rmbConvert = (id: number, money: number) => {
   return setRMBConversion(id, money)
  };
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
            onClick={(e) =>
              itemClickCb(e, {
                ...item,
                flag: formatUnit(item.currencyId, item.currencyChain),
                realM: thousands(item.availableBalance),
                rmbM: thousands(rmbConvert(item.currencyId, item.availableBalance)),
              })
            }
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
              <p>{thousands(item.availableBalance) ?? "--"} USDT</p>
              <span>
                {thousands(rmbConvert(item.currencyId, item.availableBalance))}
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
