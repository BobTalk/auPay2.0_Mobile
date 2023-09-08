import styleScope from "./index.module.scss";
import { mergeClassName } from "@/utils/base";
type propsVali = {
  iconname: string;
  title: string;
  summary: string[];
  iconStyle: Object;
  iconSize: string;
  titleStyle: Object;
  summaryStyle: Object;
  style: Object;
  className: string;
};

const PublicSummary = (props: propsVali) => {
  return (
    <div
      style={{
        gridTemplateColumns: `${props.iconSize} 1fr`,
        ...props.style,
      }}
      className={mergeClassName(
        styleScope["summary-box"],
        "grid",
        props.className
      )}
    >
      <i
        className={mergeClassName("iconfont", props.iconname)}
        style={{
          lineHeight: 1,
          fontSize: props.iconSize,
          ...props.iconStyle,
        }}
      ></i>
      <div>
        <p
          style={{
            lineHeight: props.iconSize,
            ...props.titleStyle,
          }}
        >
          {props.title}
        </p>
        {props.summary.map((item: any, index: number) => (
          <li
            style={props.summaryStyle}
            className={styleScope["summary-item"]}
            key={item}
          >
            {index + 1}.{item}
          </li>
        ))}
      </div>
    </div>
  );
};
PublicSummary.defaultProps = {
  iconname: "icon-gantanhao",
  title: "auPay充币说明",
  summary: [
    "转入是自动的，USDT-ERC20转账需要整个网络进行确认，达到6个区块确认后您的USDT-ERC20会自动充值到您的账户中",
    "此地址是您的唯一且独自使用的转入地址，您可以同时进行多次充值",
  ],
  iconSize: ".32rem",
  iconStyle: {},
  titleStyle: {},
  summaryStyle: {},
  style: {},
  className: "",
};
export default PublicSummary;
