import { Ellipsis } from "antd-mobile";
import styleScope from "./index.module.scss";
import { mergeClassName } from "@/utils/base";
type propsVali = {
  info: string
  direction?: "start" | "end" | "middle"
  bgcolor?:string
  rows?: number
  [key: string]: any
};
const PublicCopy = (props: propsVali) => {
  return (
    <div className={mergeClassName(styleScope['copy-box'], 'flex justify-between items-center')} style={{"background":props?.bgcolor??"#F6F6F6"}}>
      <Ellipsis
        direction={props.direction ?? "end"}
        rows={props.rows ?? 1}
        content={props.info??''}
      />
     <div className={styleScope['icon-box']}>
      <i className="iconfont icon-fuzhi"></i>
     </div>
    </div>
  );
};
export default PublicCopy;
