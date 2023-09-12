import { Input } from "antd-mobile";
import { Outlet } from "react-router-dom";
import styleScope from "./index.module.scss";
import { mergeClassName } from "@/utils/base";
import { debounce } from "lodash";
import styleComp from "styled-components";
type propsVolit = {
  top?: any;
  bottom?: any;
  children?: any;
  style?: Object;
  placeholder?: string | undefined;
  value: string | undefined;
  disabled?: boolean;
  inputStyle?: Object;
  input?: Function;
  className: string;
  isSelect: boolean;
  clearable: boolean;
  inputBoxStyle?: Object;
  inputBoxClassName?: string;
  clearStyle: Object;
  inputClassName?: string;
  click?: Function;
};
const InputComp = styleComp.span`
  width:100%;
  .adm-input-clear{
    svg{
      width:${(props:any)=>props.clearStyle.width};
      height:${(props:any)=>props.clearStyle.height};
    }
  }
`;
const PublicInput = (props: propsVolit) => {
  const valChange = debounce((val) => {
    props.input?.(val);
  }, 1000);
  const selectChange = (e: any) => {
    e.stopPropagation();
    props.click?.(e);
  };
  return (
    <div
      className={mergeClassName(styleScope["input-module"], props.className)}
      style={props.style}
    >
      {props.top}
      <div
        className={mergeClassName(
          styleScope["input-box"],
          "flex items-center whitespace-nowrap",
          `${props.inputBoxClassName}`
        )}
        style={props.inputBoxStyle}
      >
        {!props.isSelect ? (
          <InputComp {...props}>
            <Input
              className={mergeClassName("mr-[8px]", `${props.inputClassName}`)}
              style={props.inputStyle}
              placeholder={props.placeholder}
              clearable={props.clearable}
              defaultValue={props.value}
              onChange={valChange}
              disabled={props.disabled}
            />
          </InputComp>
        ) : (
          <div className="flex-1 mr-[8px]" onClick={(e) => selectChange(e)}>
            {props.value ? (
              <span
                style={props.inputStyle}
                className={mergeClassName(
                  "text-[#333]",
                  `${props.inputClassName}`
                )}
              >
                {props.value}
              </span>
            ) : (
              <span
                style={props.inputStyle}
                className={mergeClassName(
                  "text-[#ccc]",
                  `${props.inputClassName}`
                )}
              >
                {props.placeholder}
              </span>
            )}
          </div>
        )}
        {props.children}
      </div>
      {props.bottom}
    </div>
  );
};
PublicInput.defaultProps = {
  top: <Outlet />,
  bottom: <Outlet />,
  children: <Outlet />,
  style: {},
  placeholder: "请输入",
  value: undefined,
  disabled: false,
  inputStyle: {},
  input: () => {},
  className: "",
  isSelect: false,
  inputBoxStyle: {},
  click: () => {},
  inputBoxClassName: "",
  inputClassName: "",
  clearable: false,
  clearStyle: {
    width: "1em",
    height: "1em",
  },
};
export default PublicInput;
