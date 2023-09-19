import PublicHead from "@/Components/PublicHead";
import PublicFoo from "@/Components/PublicFoo";
import styleScope from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { HeadConfig } from "@/Assets/config/head";
import { mergeClassName } from "@/utils/base";
const Assets = () => {
  let headData = Object.assign(HeadConfig, { title: "资产", back: "" });
  const navigate = useNavigate();
  const toDetail = () => {
    // navigate('/assets/detail?id=123')
    navigate("/assets/detail/123");
  };
  return (
    <>
      <div className={mergeClassName(styleScope["assets_w"], "p-[0_.3rem_.3rem]")}>
        <PublicHead {...headData} />
        <div className={styleScope["assets_banner"]}>
          <p className={styleScope["assets_banner_tit"]}>auPay资产余额(USDT)</p>
          <div className={styleScope["assets_banner_money"]}>
            <p>87,823.00</p>
            <i className="text-[.32rem]">¥123,302.09</i>
          </div>
          <i className={styleScope["assets_banner_line"]}></i>
          <span className={styleScope["assets_banner_record"]}>
            最近交易：2020-09-17 09:29:08 充币13USDT-TRC20
          </span>
        </div>
        <ul className={mergeClassName(styleScope["currency_list"], 'grid gap-y-[.2rem]')}>
          <li
            className="flex h-[1.35rem] justify-between p-[.3rem_.24rem] bg-white rounded-[.18rem]"
            onClick={toDetail}
          >
            <div className="flex items-center">
              <i className="iconfont icon-BTC text-[.75rem] text-[#f7931a]"></i>
              {/* <img src="" alt="" /> */}
              <p className="text-[.3rem] ml-[.2rem] text-[#333]">BTC</p>
            </div>
            <div className="flex items-end flex-col justify-between">
              <p className="text-[.32rem] text-[#333] font-[700]">
                10,781,57 USDT
              </p>
              <span className="text-[.24rem] text-[#999] font-[700]">
                ¥76,901.35
              </span>
            </div>
          </li>

          <li
            className="flex h-[1.35rem] justify-between p-[.3rem_.24rem] bg-white rounded-[.18rem]"
            onClick={toDetail}
          >
            <div className="flex items-center">
              <i className="iconfont icon-ETH text-[.75rem] text-[#3e5bf2]"></i>
              {/* <img src="" alt="" /> */}
              <p className="text-[.3rem] ml-[.2rem] text-[#333]">ETH</p>
            </div>
            <div className="flex items-end flex-col justify-between">
              <p className="text-[.32rem] text-[#333] font-[700]">
                10,781,57 USDT
              </p>
              <span className="text-[.24rem] text-[#999] font-[700]">
                ¥76,901.35
              </span>
            </div>
          </li>

          <li
            className="flex h-[1.35rem] justify-between p-[.3rem_.24rem] bg-white rounded-[.18rem]"
            onClick={toDetail}
          >
            <div className="flex items-center">
              <i className="iconfont icon-USDT text-[.75rem] text-[#17a37a]"></i>
              {/* <img src="" alt="" /> */}
              <p className="text-[.3rem] ml-[.2rem] text-[#333]">USDT</p>
            </div>
            <div className="flex items-end flex-col justify-between">
              <p className="text-[.32rem] text-[#333] font-[700]">
                10,781,57 USDT
              </p>
              <span className="text-[.24rem] text-[#999] font-[700]">
                ¥76,901.35
              </span>
            </div>
          </li>
          <li
            className="flex h-[1.35rem] justify-between p-[.3rem_.24rem] bg-white rounded-[.18rem]"
            onClick={toDetail}
          >
            <div className="flex items-center">
              <i className="iconfont icon-ETH text-[.75rem] text-[#030133]"></i>
              {/* <img src="" alt="" /> */}
              <p className="text-[.3rem] ml-[.2rem] text-[#333]">EOS</p>
            </div>
            <div className="flex items-end flex-col justify-between">
              <p className="text-[.32rem] text-[#333] font-[700]">
                10,781,57 USDT
              </p>
              <span className="text-[.24rem] text-[#999] font-[700]">
                ¥76,901.35
              </span>
            </div>
          </li>
          <li
            className="flex h-[1.35rem] justify-between p-[.3rem_.24rem] bg-white rounded-[.18rem]"
            onClick={toDetail}
          >
            <div className="flex items-center">
              <i className="iconfont icon-USDT text-[.75rem] text-[#17a37a]"></i>
              {/* <img src="" alt="" /> */}
              <p className="text-[.3rem] ml-[.2rem] text-[#333]">USDT</p>
            </div>
            <div className="flex items-end flex-col justify-between">
              <p className="text-[.32rem] text-[#333] font-[700]">
                10,781,57 USDT
              </p>
              <span className="text-[.24rem] text-[#999] font-[700]">
                ¥76,901.35
              </span>
            </div>
          </li>
        </ul>
      </div>
      <PublicFoo />
    </>
  );
};

export default Assets;
