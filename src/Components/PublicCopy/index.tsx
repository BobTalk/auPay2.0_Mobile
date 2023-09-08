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
  style?:Object
  click:Function
};

const PublicCopy = (props: propsVali) => {
  const iconClick = useCallback((e:any)=>{
    // 阻止冒泡
    e.stopPropagation();
    props?.click(e)
  },[])
  return (
    <div
      className={mergeClassName(
        styleScope["copy-box"],
        "cursor-pointer grid items-center"
      )}
      style={{ background: props.bgcolor, ...props.style }}
    >
      <Ellipsis
        style={{ overflowWrap: "anywhere",...props.textStyle }}
        direction={props.direction}
        rows={props.rows}
        content={props.info}
      />
      <div className={styleScope["icon-box"]} onClick={iconClick}>
        <i
          className="iconfont icon-fuzhi"
          style={{ fontSize: props.iconSize, color: props.iconColor }}
        ></i>
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
  textStyle:{},
  style:{},
  click:()=>{}
};
export default PublicCopy;
