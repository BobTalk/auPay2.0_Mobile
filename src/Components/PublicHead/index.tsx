import { forwardRef } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { dataType, mergeClassName } from "@/utils/base";

interface propsTs {
  title?: string;
  back?: any;
  textColor?: string; // 颜色 目前只有默认和’white‘两种
  iconStyle?: Object;
  titleStyle?: Object;
  style?: Object;
  className?: string;
  arrowClassName?: string | undefined;
}

const PublicHead = (props: propsTs, ref: any) => {
  let defaultProps = {
    iconStyle: {},
    titleStyle: {},
    style: {},
    className: "",
    title: "",
    back: "",
    textColor: "",
    arrowClassName: "",
  };
  props = Object.assign({}, defaultProps, props);
  const navigate = useNavigate();
  const clickBack = () => {
    if (props.back === "goBack") return window.history.back();
    if (dataType(props.back) === "function") return props?.back?.();
    return navigate(String(props.back));
  };
  return (
    <div
      ref={ref}
      style={props.style}
      className={mergeClassName(
        props.textColor === "white"
          ? "public_head public_head_white items-center"
          : "public_head items-center",
        `${props.className}`
      )}
    >
      {props.back ? (
        <i
          onClick={clickBack}
          style={props.iconStyle}
          className={mergeClassName(
            "iconfont icon-icon-arrow-right2",
            `${props.arrowClassName}`
          )}
        />
      ) : null}
      <p className="public_head_tit flex-1" style={props.titleStyle}>
        {props.title}
      </p>
    </div>
  );
};
// PublicHead.defaultProps = {
//   iconStyle: {},
//   titleStyle: {},
//   style: {},
//   title: "",
//   back: "",
//   textColor: "",
// };
export default forwardRef(PublicHead);
