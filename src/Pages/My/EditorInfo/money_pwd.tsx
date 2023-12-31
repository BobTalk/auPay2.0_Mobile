import { UpdateAssetsPassword, VerifyAssetsPassword } from "@/Api";
import PublicForm from "@/Components/PublicForm";
import PublicInput from "@/Components/PublicInput";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { Button, Toast } from "antd-mobile";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MoneyPwd = (props: any, ref: any) => {
  const Navigate = useNavigate();
  const formEl = useRef();
  const AssetsToken = useRef();
  const [formInitVal, setFormInitVal] = useState({
    newPwd: "",
    confirmPwd: "",
  });
  let {
    crt: { flag: flagScope },
  } = props ?? {};
  let [showUpdatePwdEl, setShowUpdatePwdEl] = useState(
    flagScope === 1 ? false : true
  );
  // 暴露给父级
  useImperativeHandle(
    ref,
    () => ({
      newPwd: "",
      confirmPwd: "",
    }),
    [formInitVal]
  );
  function nextStep(val: string) {
    VerifyAssetsPassword({ assetsPwd: val, operationId: 491 }).then((res) => {
      if (res.status) {
        AssetsToken.current = res.value;
        setShowUpdatePwdEl(() => true);
      }
    });
  }
  const WarnMessage: any = {
    newPwd: "6～20位大/小写字母及数字",
    confirmPwd: "两次密码输入不一致",
  };
  // 密码修改 确认
  function submitCb({ values }: any) {
    console.log("values: ", values);
    UpdateAssetsPassword({
      newPassword: values.confirmPwd,
      assetsToken: AssetsToken.current,
    }).then((res) => {
      Toast.show({
        content: res.message,
      });
      Navigate('/my/security-info')
    });
  }
  let checkPwd = ({ field }: any, val: any) => {
    console.log("field: ", field);
    if (!val) {
      return Promise.reject(new Error(WarnMessage[field]));
    } else {
      if (field == "newPwd") {
        let reg = /^[a-zA-Z0-9]{6,20}$/g;
        if (!reg.test(val)) {
          return Promise.reject(new Error(WarnMessage[field]));
        } else {
          setFormInitVal((formInitVal) => ({ ...formInitVal, [field]: val }));
          return Promise.resolve();
        }
      } else {
        if (formInitVal.newPwd != val) {
          return Promise.reject(new Error(WarnMessage[field]));
        } else {
          setFormInitVal((formInitVal) => ({
            ...formInitVal,
            confirmPwd: val,
          }));
          return Promise.resolve();
        }
      }
    }
    return Promise.resolve();
  };
  return (
    <>
      {!showUpdatePwdEl ? (
        <OldPwdValid
          navigate={Navigate}
          crt={props}
          onClick={(val: string) => nextStep(val)}
        />
      ) : null}
      {showUpdatePwdEl ? (
        <>
          <PublicForm
            ref={formEl}
            style={{
              margin: "0 .3rem",
            }}
            finish={submitCb}
            initialValues={formInitVal}
            footer={
              <Button
                type="submit"
                block
                color="primary"
                className="before:bg-transparent text-[.3rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
              >
                确定
              </Button>
            }
          >
            <PublicInput
              formRef={formEl}
              rules={[
                {
                  required: true,
                  message: "",
                  min: 1,
                  max: 6,
                },
                { validator: checkPwd },
              ]}
              value={formInitVal.newPwd}
              placeholder="新密码"
              maxLength={6}
              type="password"
              name="newPwd"
              inputBoxStyle={{
                backgroundColor: "#fff",
                margin: "0 .3rem",
                paddingRight: 0,
                paddingLeft: 0,
                borderBottom: "1px solid #E6E6E6",
                borderRadius: 0,
              }}
              clearStyle={{
                fontSize: ".34rem",
                color: "#E6E6E6",
              }}
              clearable={false}
              inputClassName="text-[.3rem] text-[#222]"
            />
            <PublicInput
              formRef={formEl}
              rules={[
                {
                  required: true,
                  message: "",
                  min: 1,
                  max: 6,
                },
                { validator: checkPwd },
              ]}
              placeholder="确认密码"
              name="confirmPwd"
              value={formInitVal.confirmPwd}
              type="password"
              maxLength={6}
              inputBoxStyle={{
                backgroundColor: "#fff",
                margin: "0 .3rem",
                paddingRight: 0,
                paddingLeft: 0,
                borderBottom: "1px solid #E6E6E6",
                borderRadius: 0,
              }}
              clearStyle={{
                fontSize: ".34rem",
                color: "#E6E6E6",
              }}
              clearable={false}
              inputClassName="text-[.3rem] text-[#222]"
            />
          </PublicForm>
        </>
      ) : null}
    </>
  );
};
const OldPwdValid = (props: any) => {
  let [stop] = useStopPropagation();
  let payPwd = useRef<any>();
  function nextStep(e: any): void {
    stop(e, () => {
      if (!payPwd.current.nativeElement.value) {
        // 应该校验原始密码是否正确
        Toast.show({
          content: "原始密码不能为空",
        });
        return;
      }
      props.onClick?.(payPwd.current.nativeElement.value);
    });
  }

  function ResetPwd(e: any) {
    e.stopPropagation();
    props.navigate?.("/resetpwd", {
      state: { ...props.crt, headTitle: "重置资金密码" },
    });
  }

  return (
    <>
      <PublicInput
        ref={payPwd}
        placeholder="原始密码"
        maxLength={6}
        type="password"
        inputBoxStyle={{
          backgroundColor: "#fff",
          margin: "0 .3rem",
          paddingRight: 0,
          paddingLeft: 0,
          borderBottom: "1px solid #E6E6E6",
          borderRadius: 0,
        }}
        clearStyle={{
          fontSize: ".34rem",
          color: "#E6E6E6",
        }}
        inputClassName="text-[.3rem] text-[#222]"
      />
      <div className="px-[.3rem]">
        <Button
          onClick={(e) => nextStep(e)}
          block
          color="primary"
          className="before:bg-transparent text-[.3rem] text-[#FFF] bg-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
        >
          下一步
        </Button>
        <Button
          block
          onClick={(e) => ResetPwd(e)}
          fill="outline"
          color="primary"
          className="before:bg-transparent text-[.3rem] text-[#1C63FF] h-[.92rem] rounded-[.16rem] mt-[.5rem]"
        >
          忘记密码
        </Button>
      </div>
    </>
  );
};
export default forwardRef(MoneyPwd);
