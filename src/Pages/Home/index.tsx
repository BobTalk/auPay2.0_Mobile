import photoImg from "@/Assets/images/test/photo.png";
import styleScope from "./index.module.scss";
import { Link } from "react-router-dom";
import { Swiper } from "antd-mobile";
import PublicFoo from "@/Components/PublicFoo";
import { useEffect, useState } from "react";
import { mergeClassName, thousands } from "@/utils/base";
import {
  GetAssetsInfo,
  GetUSDTTickers,
  GetUserInfo,
  ViewAnnouncement,
} from "@/Api";

const Home = () => {
  let [hide, setHide] = useState(false);
  let [assets, setAssets] = useState<any>({});
  let [userInfo, setUserInfo] = useState<any>({});
  let [isLayz, setIsLayz] = useState(false);
  let [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  let [notice, setNotice] = useState<any>({});
  let [ratio, setRatio] = useState<Array<object>>([]);
  const hideMoney = () => {
    setHide(!hide);
  };
  async function initPageInfo() {
    let userInfo = await GetUserInfo();
    let notice = await ViewAnnouncement({ pageNo: 1, pageSize: 10 });
    let ratio = await GetUSDTTickers();
    setRatio(ratio.value);
    setNotice(notice);
    setUserInfo(userInfo);
  }
  async function getAssetsInfo() {
    let assets = await GetAssetsInfo();
    setAssets(assets);
  }
  useEffect(() => {
    initPageInfo();
  }, []);
  useEffect(() => {
    getAssetsInfo();
  }, [pagination]);
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
  return (
    <>
      <div className={styleScope["home_wrap"]}>
        <div
          className={mergeClassName(styleScope["home_banner"], "px-[.3rem]")}
        >
          <div className={styleScope["home_banner_info"]}>
            <img src={userInfo.headPortrait ?? photoImg} alt="" />
            <p>{userInfo?.nickname ?? userInfo?.username}</p>
          </div>
          <ul className={styleScope["home_banner_assets"]}>
            <li>
              <p>
                auPay资产(USDT)
                <i
                  onClick={hideMoney}
                  className={
                    !hide ? "iconfont icon-chakan" : "iconfont icon-biyan"
                  }
                ></i>
              </p>
              <span>{hide ? "-" : "187,823.00"}</span>
            </li>
            <li>
              <p>Oz资产(OZC)</p>
              <span>{hide ? "-" : "3,092.00"}</span>
            </li>
          </ul>
        </div>

        <div className="px-[.3rem]">
          <div className={styleScope["home_news"]}>
            <p>
              最近一笔交易记录：2020-09-17 09:29:08
              充币TRX最近一笔交易记录：2020-09-17 09:29:08 充币TR…
            </p>
            <i className="iconfont icon-xiangyou1 text-[#666]" />
          </div>

          <div className={styleScope["home_notice"]}>
            <div className={styleScope["home_notice_top"]}>
              <i
                className={mergeClassName(
                  styleScope["home_notice_top_i"],
                  styleScope["home_notice_top_i1"]
                )}
              />
              <i
                className={mergeClassName(
                  styleScope["home_notice_top_i"],
                  styleScope["home_notice_top_i2"]
                )}
              />
              <p>auPay Web3钱包</p>
              <span>实现快速、安全、便捷支付结算</span>
            </div>
            <div className={styleScope["home_notice_foo"]}>
              <p className={styleScope["home_notice_foo_tit"]}>
                公告 <i className="iconfont icon-gonggaopeizhi" />
              </p>
              <div className={styleScope["home_notice_swiper"]}>
                <Swiper
                  indicator={() => null}
                  loop
                  autoplay
                  direction="vertical"
                  style={{ "--height": ".33rem" }}
                >
                  {notice?.data?.map(
                    (item: { id: string; content: string }) => {
                      return (
                        <Swiper.Item key={item.id}>
                          <p
                            className={mergeClassName(
                              styleScope["home_notice_swiper_p"],
                              "text-[.24rem]"
                            )}
                          >
                            {item.content}
                          </p>
                        </Swiper.Item>
                      );
                    }
                  )}
                </Swiper>
              </div>
              <Link to="/notice">
                <i className="iconfont icon-xiangyou1 text-[.26rem] text-[#666]" />
              </Link>
            </div>
          </div>

          <ul className={styleScope["currency_list"]}>
            {assets?.list?.map((item: any, index: number) => {
              return (
                <li key={item.userId + "_" + index}>
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
                      {thousands(
                        rmbConvert(item.currencyId, item.feeBalance)
                      ) ?? "0"}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <PublicFoo />
    </>
  );
};

export default Home;
