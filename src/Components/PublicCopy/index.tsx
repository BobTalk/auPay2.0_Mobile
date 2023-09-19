import { Ellipsis } from "antd-mobile";
import styleScope from "./index.module.scss";
import { mergeClassName } from "@/utils/base";
import { useCallback } from "react";
type propsVali = {
  info: string;
  direction?: "start" | "end" | "middle";
  bgcolor?: string;
  rows?: number;
  iconSize?: string;
  iconColor?: string;
  textStyle?: Object;
  textClassName?: string;
  className?: string;
  style?: Object;
  click?: Function;
  children?: any;
  iconBox?: Object;
  iconBoxClassName: string;
};

const PublicCopy = (props: propsVali) => {
  const iconClick = useCallback((e: any) => {
    // 阻止冒泡
    e.stopPropagation();
    props?.click?.(e);
  }, []);
  return (
    <div
      className={mergeClassName(
        styleScope["copy-box"],
        "cursor-pointer grid items-center",
        `${props.className}`
      )}
      style={{ background: props.bgcolor, ...props.style }}
    >
      <Ellipsis
        className={props.textClassName}
        style={{ overflowWrap: "anywhere", ...props.textStyle }}
        direction={props.direction}
        rows={props.rows}
        content={props.info}
      />
      <div
        className={mergeClassName(
          styleScope["icon-box"],
          `${props.iconBoxClassName}`
        )}
        style={props.iconBox}
        onClick={iconClick}
      >
        {props.children ? (
          <>{props.children}</>
        ) : (
          <i
            className="iconfont icon-fuzhi"
            style={{ fontSize: props.iconSize, color: props.iconColor }}
          ></i>
        )}
      </div>
    </div>
  );
};
PublicCopy.defaultProps = {
  rows: 1,
  direction: "end",
  info: "",
  bgcolor: "#F6F6F6",
  iconSize: ".34rem",
  iconColor: "#919191",
  textStyle: {},
  textClassName: "",
  className: "",
  style: {},
  click: () => {},
  children: null,
  iconBox: {},
  iconBoxClassName: "w-[.57rem] h-[.57rem]",
};
export default PublicCopy;
