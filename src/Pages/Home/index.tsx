import photoImg from "@/Assets/images/test/photo.png";
import styleScope from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Swiper } from "antd-mobile";
import PublicFoo from "@/Components/PublicFoo";
import { useEffect, useState } from "react";
import {
  encrypt,
  formatUnit,
  mergeClassName,
  setSession,
  timeFormate,
} from "@/utils/base";
import { GetAssetsInfo, GetUserInfo, ViewAnnouncement } from "@/Api";
import PropertyComp from "../Property";
import PublicScroll from "@/Components/PublicScroll";
import { useRMBConversion } from "@/Hooks/RMBConversion";
import { EyeFill, EyeInvisibleFill } from "antd-mobile-icons";

const Home = () => {
  let [hide, setHide] = useState(false);
  let navigate = useNavigate();
  let [m, format] = useRMBConversion();
  let [assets, setAssets] = useState<any>({});
  let [userInfo, setUserInfo] = useState<any>({});
  let [isLayz, setIsLayz] = useState(false);
  let [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  let [notice, setNotice] = useState<any>({});

  const hideMoney = () => {
    setHide(!hide);
  };
  async function initPageInfo() {
    let userInfo = await GetUserInfo();
    let notice = await ViewAnnouncement({ pageNo: 1, pageSize: 10 });
    setSession("userInfo", userInfo);
    setNotice(notice);
    setUserInfo(userInfo);
  }
  async function getAssetsInfo() {
    let {
      ozBalance = 0,
      list = [],
      recentAupayUserTraderRecord,
    } = await GetAssetsInfo();
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
    initPageInfo();
    getAssetsInfo();
  }, []);
  // 最近
  function jumpDetail() {
    console.log(assets);
    navigate("/assets/detail/record/info", {
      state: {
        id: assets.id,
        state: assets.state,
      },
    });
  }
  return (
    <PublicScroll>
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
              <div className="flex items-center">
                <label className="mr-[.1rem] !text-[.24rem] text-[#333]">
                  auPay资产(USDT)
                </label>
                {!hide ? (
                  <EyeInvisibleFill
                    onClick={hideMoney}
                    className="text-[.28rem]"
                  />
                ) : (
                  <EyeFill className="text-[.28rem]" onClick={hideMoney} />
                )}
              </div>
              <span>{hide ? "***" : assets.total}</span>
            </li>
            <li>
              <p>Oz资产(OZC)</p>
              <span>{hide ? "***" : assets.ozBalance}</span>
            </li>
          </ul>
        </div>

        <div className="p-[0_.3rem_.3rem]">
          {assets.tradeName ? (
            <div className={styleScope["home_news"]}>
              <p>
                最近一笔交易记录：{assets.tradeTime}
                {assets.tradeName}
                {assets.type}
              </p>
              <i
                className="iconfont icon-xiangyou1 text-[#666]"
                onClick={jumpDetail}
              />
            </div>
          ) : null}

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
                          <div
                            className={mergeClassName(
                              styleScope["home_notice_swiper_p"],
                              "text-[.24rem]"
                            )}
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          ></div>
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
          <PropertyComp />
        </div>
      </div>
      <PublicFoo />
    </PublicScroll>
  );
};

export default Home;
