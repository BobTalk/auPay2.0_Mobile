import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.scss";
import { Input } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { useState } from "react";
const PublicPwd = (props: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styleScope.password}>
      <Input
        className={mergeClassName(
          `${styleScope.input},${props.inputClassName}`
        )}
        style={props.inputStyle}
        autoComplete="new-password"
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        minLength={props.minLength}
        defaultValue={props["value"]}
        disabled={props.disabled}
        type={visible ? "text" : "password"}
      />
      {!visible ? (
        <EyeInvisibleOutline onClick={() => setVisible(true)} />
      ) : (
        <EyeOutline onClick={() => setVisible(false)} />
      )}
    </div>
  );
};

export default PublicPwd;
