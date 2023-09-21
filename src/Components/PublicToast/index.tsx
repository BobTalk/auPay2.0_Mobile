import { Toast } from "antd-mobile";
import { ReactNode } from "react";

type PublicToastType = {
  message: ReactNode | string;
  icon?: ReactNode;
};
const PublicToast = (props: PublicToastType) => {
  return Toast.show({
    content: props.message,
    icon: props.icon,
  });
};
PublicToast.defaultProps = {
  message: "",
  icon: undefined
};
export default PublicToast;
