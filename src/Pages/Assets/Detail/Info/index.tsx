import PublicHead from "@/Components/PublicHead";
import { useEffect, useState } from "react";
import { ProgressBar } from "antd-mobile";
import styleScope from "./index.module.scss";
import { useLocation, useParams } from "react-router-dom";
import { decrypt, formatUnit, timeFormate } from "@/utils/base";
import { HeadConfig } from "@/Assets/config/head";
import { useRMBConversion } from "@/Hooks/RMBConversion";

const Info = () => {
  // 根据传进来的数据判断是充币详情还是提币详情
  let { state } = useLocation();
  console.log('state: ', state);
  let { module, currency } = state ?? {};
  let [formatInfo] = useState<{ unit: string; num: number }>(
    formatUnit(state.currencyId, state.currencyChain)
  );
  let [, setRMB] = useRMBConversion();
  const moduleFlag = decrypt(module);
  const currencyFlag = decrypt(currency);
  const [headData] = useState(
    Object.assign(HeadConfig, {
      title: `${currencyFlag}${moduleFlag == 1 ? "充币" : "提币"}详情`,
      back: "goBack",
      className: "text-[#fff] py-[.32rem] h-[auto]",
    })
  );
  // icon图标
  function cssIconAndColor(id: number) {
    let unit = "";
    let color = "";
    if (id === 1) {
      unit = "BTC";
      color = "text-[#f7931b]";
    } else if (id === 2) {
      unit = "ETH";
      color = "text-[#3e5bf2]";
    } else if (id === 3) {
      unit = "USDT";
      color = "text-[#17a37a]";
    } else if (id === 4) {
      unit = "TRX";
      color = "text-[#030133]";
    }
    return { unit, color };
  }
  return (
    <div className={styleScope["assets_info"]}>
      <PublicHead {...headData} />
      <div className={styleScope["assets_info_form"]}>
        <div className={styleScope["assets_info_form_head"]}>
          <div className={styleScope["assets_info_form_head_status"]}>
            {/* 此处根据传进来的数据判断用哪个icon  进行中、成功、失败 */}
            {state.state === 0 ? (
              <i className="iconfont icon-top text-[#1b64ff] text-[.9rem]" />
            ) : null}
            {state.state === 1 ? (
              <i className="iconfont icon-chenggong text-[#53c31b] text-[.9rem]" />
            ) : null}
            {/* <i className="iconfont icon-shibai text-[#e84335]  text-[.9rem]" /> */}
          </div>
          <p>
            <i
              className={`iconfont icon-${
                cssIconAndColor(state.currencyId).unit
              } ${
                cssIconAndColor(state.currencyId).color
              } text-[.43rem] mr-[.16rem]`}
            ></i>
            {state.amount} {currencyFlag}
          </p>
          <span>≈ ¥{setRMB(state.currencyId, state.amount)}</span>
        </div>
        <div className="public_w">
          <ul className={styleScope["assets_info_form_ul"]}>
            <li>
              <p>创建时间</p>
              <span>
                {timeFormate(state.createTime, "YYYY-MM-DD HH:mm:ss")}
              </span>
            </li>
            <li>
              <p>完成时间</p>
              <span>
                {timeFormate(state.finishTime, "YYYY-MM-DD HH:mm:ss")}
              </span>
            </li>
            <li>
              <p>货币类型</p>
              <span>{formatInfo?.unit}</span>
            </li>
            <li>
              <p>{moduleFlag == 1 ? "充币" : "提币"}数量</p>
              <span className={styleScope["assets_info_form_li_money"]}>
                {state.amount}
              </span>
            </li>
          </ul>
          <ul className={styleScope["assets_info_form_ul"]}>
            <li>
              <p>付款地址</p>
              <span>{state.fromAddress}</span>
            </li>
            <li>
              <p>交易ID</p>
              <span>{state.chainTxId}</span>
            </li>
            <li>
              <p>收款地址</p>
              <span>{state.toAddress}</span>
            </li>
            <li>
              <p>交易确认数</p>
              <span>
                <i className={styleScope["assets_info_form_li_number"]}>
                  {state.blockNum ?? 0}
                </i>
                /{formatInfo?.num}
              </span>
            </li>
            <li>
              <p>交易状态</p>
              <div className={styleScope["assets_info_form_progress"]}>
                {/* 进度条样式还要优化 */}
                {/* <ProgressBar percent={30} /> */}
                <span>{state.state === 1 ? "已完成" : "处理中"}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <a className={styleScope["goBrowser"]} href="" target="_blank">
        到区块链浏览器查看交易详情
      </a>
    </div>
  );
};

export default Info;
