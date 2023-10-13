import { useEffect } from "react";
import {
  Html5QrcodeScanner,
  Html5Qrcode,
  Html5QrcodeScannerState,
} from "html5-qrcode";
interface QrAttr {
  width: number;
  height: number;
}
const BarcodeScanner = () => {
  const startScan = () => {};
  const qrboxFunction = function <T extends QrAttr>(obj: T): QrAttr {
    let minEdgePercentage = 0.64; // 64%
    let minEdgeSize: number = Math.min(obj.width, obj.height);
    let qrboxSize: number = Math.floor(minEdgeSize * minEdgePercentage);
    console.log('qrboxSize>>>>: ', qrboxSize);
    return {
      width: qrboxSize,
      height: qrboxSize,
    };
  };
  const qrCodeSuccessCb = (decodedText: string, decodedResult?: any) => {
    stopScan(decodedText);
  };
  const qrCodeErrorCb = (errorMessage: string, error: any) => {
    console.log("errorMessage: ", errorMessage);
  };
  function stopScan(text: string) {
    console.log("text: ", text);
  }
  const start = (qrInstance: any) => {
    console.log('qrInstance: ', qrInstance);
    qrInstance
      .start(
        {
          facingMode: { exact: "development" },
        },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        qrCodeSuccessCb,
        qrCodeErrorCb
      )
      .catch((err:any) => {
        console.log("err: ", err);
        var errMsg = "";
        if (err.indexOf("NotAllowedError") != -1) {
          errMsg = "ERROR: 您需要授予相机访问权限";
        } else if (err.indexOf("NotFoundError") != -1) {
          errMsg = "ERROR: 这个设备上没有摄像头";
        } else if (err.indexOf("NotSupportedError") != -1) {
          errMsg = "ERROR: 所需的安全上下文(HTTPS、本地主机)";
        } else if (err.indexOf("NotReadableError") != -1) {
          errMsg = "ERROR: 相机被占用";
        } else if (err.indexOf("OverconstrainedError") != -1) {
          errMsg = "ERROR: 安装摄像头不合适";
        } else if (err.indexOf("StreamApiNotSupportedError") != -1) {
          errMsg = "ERROR: 此浏览器不支持流API";
        } else {
          errMsg = err;
        }
      });
  };
  useEffect(() => {
    Html5Qrcode.getCameras()
          .then((devices) => {
            if (devices && devices.length) {
              start(new Html5Qrcode("reader"))
            }
          })
          .catch((err:any) => {
            console.log('err>>>>>: ', err);
            // handle err
            // html5QrCode = new Html5Qrcode("reader")
            // this.$toast('您需要授予相机访问权限')
          })
  }, []);

  return <div id="reader"></div>;
};
export default BarcodeScanner;
