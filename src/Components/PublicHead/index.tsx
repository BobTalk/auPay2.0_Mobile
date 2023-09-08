import "./index.scss";
import { useNavigate } from "react-router-dom";

interface propsTs {
  title?: String;
  back?: String; // 返回路径
  textColor?: String; // 颜色 目前只有默认和’white‘两种
  iconStyle?: Object;
  titleStyle?: Object;
}

const PublicHead = (props: propsTs) => {
  const navigate = useNavigate();
  const clickBack = () => {
    if (props.back === "goBack") return window.history.back();
    return navigate(String(props.back));
  };
  return (
    <div
      className={
        props.textColor === "white"
          ? "public_head public_head_white"
          : "public_head"
      }
    >
      {props.back && (
        <i
          onClick={clickBack}
          style={props.iconStyle}
          className="iconfont icon-icon-arrow-right2"
        />
      )}
      <p className="public_head_tit" style={props.titleStyle}>
        {props.title}
      </p>
    </div>
  );
};
PublicHead.defaultProps = {
  iconStyle: {},
  titleStyle: {},
};
export default PublicHead;
