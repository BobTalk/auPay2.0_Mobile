import photoImg from "@/Assets/images/test/photo.png";
import styleScope from "./index.module.scss";
import { Link } from "react-router-dom";
import { Swiper } from "antd-mobile";
import PublicFoo from "@/Components/PublicFoo";
import { useEffect, useState } from "react";
import { mergeClassName, setSession, thousands } from "@/utils/base";
import {
  GetAssetsInfo,
  GetUSDTTickers,
  GetUserInfo,
  ViewAnnouncement,
} from "@/Api";
import PropertyComp from "../Property";
import PublicScroll from "@/Components/PublicScroll";

const Home = () => {
  let [hide, setHide] = useState(false);

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

  useEffect(() => {
    initPageInfo();
  }, []);

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

        <div className="p-[0_.3rem_.3rem]">
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
          <PropertyComp />
        </div>
      </div>
      <PublicFoo />
    </PublicScroll>
  );
};

export default Home;
