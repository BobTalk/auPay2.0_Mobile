import PublicHead from "@/Components/PublicHead";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styleScope from "./index.module.scss";
import { HeadConfig } from "@/Assets/config/head";
import { TradeRecordDetail } from "@/Api";
import { timeFormate } from "@/utils/base";
const Info = () => {
  let headData = Object.assign(HeadConfig, {
    title: "交易记录详情",
    back: "goBack",
    className: "text-[#fff] py-[.32rem] h-[auto]",
  });
  let { state: urlParams } = useLocation();
  let [pageInfo, setPageInfo] = useState<any>({});
  async function getPageInfo(id: string) {
    return await TradeRecordDetail(id);
  }
  useEffect(() => {
    getPageInfo(urlParams.id).then((res) => {
      setPageInfo(() => res);
    });
  }, []);
  // 单位处理
  let formatUnit = (id: number, chain?: number): string | undefined => {
    let unit = "";
    if (id === 1) unit = "BTC";
    if (id === 2) unit = "ETH";
    if (id === 3) {
      if (chain === 1) unit = "USDT-OMNI";
      if (chain === 2) unit = "USDT-ERC20";
      if (chain === 3) unit = "USDT-TRC20";
    }
    if(id === 4){
      if(chain === 0)unit = "TRX"
    }
    return unit;
  };
  return (
    <div className={styleScope["assets_info"]}>
      <PublicHead {...headData} />
      <div className={styleScope["assets_info_form"]}>
        <div className={styleScope["assets_info_form_head"]}>
          <div className={styleScope["assets_info_form_head_status"]}>
            {pageInfo.state === 0 ? (
              <i className="iconfont icon-top text-[#1b64ff] text-[.9rem]" />
            ) : null}
            {pageInfo.state === 1 ? (
              <i className="iconfont icon-chenggong text-[#53c31b]  text-[.9rem]" />
            ) : null}
            {/* 此处根据传进来的数据判断用哪个icon  进行中、成功、失败 */}
            {/* <i className="iconfont icon-chenggong text-[#53c31b]  text-[.9rem]" /> */}
            {/* <i className="iconfont icon-top text-[#1b64ff] text-[.9rem]" /> */}
            {/* <i className="iconfont icon-shibai text-[#e84335]  text-[.9rem]" /> */}
          </div>
          <p>交易完成</p>
        </div>
        <div className="public_w">
          <ul className={styleScope["assets_info_form_ul"]}>
            <li>
              <p>订单号</p>
              <span>{pageInfo.applicationId}</span>
            </li>
            <li>
              <p>商户订单号</p>
              <span>{pageInfo.applicationOrderId}</span>
            </li>
            <li>
              <p>创建时间</p>
              <span>{pageInfo.createTime}</span>
            </li>
            <li>
              <p>完成时间</p>
              <span>{pageInfo.createTime}</span>
            </li>
          </ul>
          <ul className={styleScope["assets_info_form_ul"]}>
            <li>
              <p>应用</p>
              <span>{pageInfo.applicationName}</span>
            </li>
            <li>
              <p>商品说明</p>
              <span>{pageInfo.instruction ?? "--"}</span>
            </li>
            <li>
              <p>货币类型</p>
              <span>
                {formatUnit(pageInfo.currencyId, pageInfo.currencyChain)}
              </span>
            </li>
            <li>
              <p>数量</p>
              <span className={styleScope["assets_info_form_li_money"]}>
                {pageInfo.amount}
              </span>
            </li>
            <li>
              <p>状态</p>
              <span>{pageInfo.state === 0 ? "进行中" : "已完成"}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
