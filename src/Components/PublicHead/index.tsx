import { forwardRef } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { dataType } from "@/utils/base";

interface propsTs {
  title?: String;
  back?: any;
  textColor?: String; // 颜色 目前只有默认和’white‘两种
  iconStyle?: Object;
  titleStyle?: Object;
  style?: Object;
}

const PublicHead = (props: propsTs, ref: any) => {
  let defaultProps = {
    iconStyle: {},
    titleStyle: {},
    style: {},
    title: "",
    back: "",
    textColor: "",
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
      className={
        props.textColor === "white"
          ? "public_head public_head_white items-center"
          : "public_head items-center"
      }
    >
      {props.back ? (
        <i
          onClick={clickBack}
          style={props.iconStyle}
          className="iconfont icon-icon-arrow-right2 ml-[.3rem]"
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
