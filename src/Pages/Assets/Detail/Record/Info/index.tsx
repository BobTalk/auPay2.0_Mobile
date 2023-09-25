import PublicHead from "@/Components/PublicHead";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styleScope from "./index.module.scss";
const Info = () => {
  // 根据传进来的数据判断是充币详情还是提币详情
  let headData = {
    title: "交易记录详情",
    back: "goBack",
    titleStyle: { fontSize: ".34rem", color: "#FFF" },
    iconStyle: { fontSize: ".34rem", left: ".15rem" },
    style: {
      padding: ".32rem 0",
      height: "auto",
      color: "#FFF",
    },
  };

  const params = useParams();
  const [id, setId] = useState("");
  useEffect(() => {
    setId(String(params.id)); // 用这个id获取数据
  }, []);
  return (
    <div className={styleScope["assets_info"]}>
      <PublicHead {...headData} />
      <div className={styleScope["assets_info_form"]}>
        <div className={styleScope["assets_info_form_head"]}>
          <div className={styleScope["assets_info_form_head_status"]}>
            {/* 此处根据传进来的数据判断用哪个icon  进行中、成功、失败 */}
            <i className="iconfont icon-chenggong" />
            {/* <i className="iconfont icon-top" /> */}
            {/* <i className="iconfont icon-shibai" /> */}
          </div>
          <p>交易完成</p>
        </div>
        <div className="public_w">
          <ul className={styleScope["assets_info_form_ul"]}>
            <li>
              <p>订单号</p>
              <span>payment20210422195000001</span>
            </li>
            <li>
              <p>商户订单号</p>
              <span>payment20210422195000001</span>
            </li>
            <li>
              <p>创建时间</p>
              <span>2023-06-30 18:17:47</span>
            </li>
            <li>
              <p>完成时间</p>
              <span>2023-06-30 18:17:47</span>
            </li>
          </ul>
          <ul className={styleScope["assets_info_form_ul"]}>
            <li>
              <p>应用</p>
              <span>Ozbet</span>
            </li>
            <li>
              <p>商品说明</p>
              <span>Ozbet充值</span>
            </li>
            <li>
              <p>货币类型</p>
              <span>USDT-TRC20</span>
            </li>
            <li>
              <p>数量</p>
              <span className={styleScope["assets_info_form_li_money"]}>23</span>
            </li>
            <li>
              <p>状态</p>
              <span>已完成</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
