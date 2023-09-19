import photoImg from "@/Assets/images/test/photo.png";
import styleScope from "./index.module.scss";
import { Link } from "react-router-dom";
import { Swiper } from "antd-mobile";
import PublicFoo from "@/Components/PublicFoo";
import { useState } from "react";
import { mergeClassName } from "@/utils/base";

const Home = () => {
  const [hide, setHide] = useState(false);
  const hideMoney = () => {
    setHide(!hide);
  };
  return (
    <>
      <div className={styleScope["home_wrap"]}>
        <div
          className={mergeClassName(styleScope["home_banner"], "px-[.3rem]")}
        >
          <div className={styleScope["home_banner_info"]}>
            <img src={photoImg} alt="" />
            <p>西尾猫的世界</p>
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
                  <Swiper.Item>
                    <p
                      className={mergeClassName(
                        styleScope["home_notice_swiper_p"],
                        "text-[.24rem]"
                      )}
                    >
                      公告一公告一公告一公告一公告一公告一公告一公告一公告一公告一公告一
                    </p>
                  </Swiper.Item>
                  <Swiper.Item>
                    <p
                      className={mergeClassName(
                        styleScope["home_notice_swiper_p"],
                        "text-[.24rem]"
                      )}
                    >
                      公告2公告2公告2公告2公告2公告2公告2公告2公告2公告2公告2
                    </p>
                  </Swiper.Item>
                  <Swiper.Item>
                    <p
                      className={mergeClassName(
                        styleScope["home_notice_swiper_p"],
                        "text-[.24rem]"
                      )}
                    >
                      公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3
                    </p>
                  </Swiper.Item>
                </Swiper>
              </div>
              <Link to="/notice">
                <i className="iconfont icon-xiangyou1 text-[.26rem] text-[#666]" />
              </Link>
            </div>
          </div>

          <ul className={styleScope["currency_list"]}>
            <li>
              <div className={styleScope["currency_icon"]}>
                <i className="iconfont icon-BTC"></i>
                {/* <img src="" alt="" /> */}
                <p>BTC</p>
              </div>
              <div className={styleScope["currency_money"]}>
                <p>10,781,57 USDT</p>
                <span>¥76,901.35</span>
              </div>
            </li>
            <li>
              <div className={styleScope["currency_icon"]}>
                <i className="iconfont icon-ETH"></i>
                {/* <img src="" alt="" /> */}
                <p>BTC</p>
              </div>
              <div className={styleScope["currency_money"]}>
                <p>10,781,57 USDT</p>
                <span>¥76,901.35</span>
              </div>
            </li>
            <li>
              <div className={styleScope["currency_icon"]}>
                <i className="iconfont icon-USDT"></i>
                {/* <img src="" alt="" /> */}
                <p>BTC</p>
              </div>
              <div className={styleScope["currency_money"]}>
                <p>10,781,57 USDT</p>
                <span>¥76,901.35</span>
              </div>
            </li>
            <li>
              <div className={styleScope["currency_icon"]}>
                <i className="iconfont icon-ETH"></i>
                {/* <img src="" alt="" /> */}
                <p>BTC</p>
              </div>
              <div className={styleScope["currency_money"]}>
                <p>10,781,57 USDT</p>
                <span>¥76,901.35</span>
              </div>
            </li>
            <li>
              <div className={styleScope["currency_icon"]}>
                <i className="iconfont icon-USDT"></i>
                {/* <img src="" alt="" /> */}
                <p>BTC</p>
              </div>
              <div className={styleScope["currency_money"]}>
                <p>10,781,57 USDT</p>
                <span>¥76,901.35</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <PublicFoo />
    </>
  );
};

export default Home;
