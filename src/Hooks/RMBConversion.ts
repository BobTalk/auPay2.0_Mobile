import { GetUSDTTickers } from "@/Api";
import { useLayoutEffect } from "react";
export const useRMBConversion = (): Array<any> => {
  let ratio: [];
  let m = 1;
  const getRatio = async () => {
    let rs = await GetUSDTTickers()
    ratio = rs.value
  }
  function format(id: number, money: number) {
    console.log('id', id)
    console.log('money', money)
    m = money;
    if (id === 1) {
      let o: any = ratio?.find((item: any) => item.symbol === "btcusdt");
      if (!o) {
        m = 0;
        console.log(`currencyId为： --> ${id} 未匹配到symbol为btcusdt的汇率数据`)
      } else {
        m = +(o?.["bid"]) * m;
      }
    }
    if (id === 2) {
      let o: any = ratio?.find((item: any) => item.symbol === "ethusdt");
      if (!o) {
        m = 0;
        console.log(`currencyId为： --> ${id} 未匹配到symbol为ethusdt的汇率数据`)
      } else {
        m = +(o?.["bid"]) * m;
      }
    }
    console.log(m)
    return m * 1;
  }
  useLayoutEffect(() => {
    getRatio()
  }, [])
  return [m, format]
}