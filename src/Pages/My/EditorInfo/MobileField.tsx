import { Space, Input, Picker } from "antd-mobile";
import { PickerValue } from "antd-mobile/es/components/picker-view";
import { FC, useState } from "react";
import { DownOutline } from "antd-mobile-icons";
interface MobileValue {
  preValue: string | number;
  realValue: string;
}
const columns = [["86", "01", "02", "03"]];

const  MobileField: FC = (props: any) => {
  let { value = { preValue: "86", realValue: "" }, onChange } = props;
  const [visible, setVisible] = useState(false);

  const triggerValue = (changedValue: Partial<MobileValue>) => {
    onChange?.({ ...value, ...changedValue });
  };

  const onRealValueChange = (value: string) => {
    triggerValue({ realValue: value });
  };

  const onPreValueChange = (value: PickerValue[]) => {
    const v = value[0];
    if (v === null) return;
    triggerValue({ preValue: v });
  };
  return (
    <>
      <Space align="center">
        <Space align="center" onClick={() => setVisible(true)}>
          <div>+{value.preValue}</div>
          <DownOutline />
        </Space>
        <Input
          placeholder="请输入手机号"
          value={value.realValue}
          onChange={onRealValueChange}
        />
      </Space>
      <Picker
        columns={columns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={[value.preValue]}
        onConfirm={onPreValueChange}
      />
    </>
  );
};
export default  MobileField