import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import styleScode from "./scan_qr.module.scss";
import { Toast } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";

interface QrAttr {
  width: number;
  height: number;
}
const BarcodeScanner = () => {
  let [cameraId, setCameraId] = useState<any>("");
  let [devices, setDevices] = useState<any>();
  let { state } = useLocation();
  let navigate = useNavigate();
  // 获取设备
  function getCameras() {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices?.length) {
          console.log("devices: ", devices);
          // 如果有2个摄像头，1为前置的
          setCameraId(devices[devices.length - 1].id);
          setDevices(devices);
          start();
        }
      })
      .catch((err) => {
        console.error(err); // 获取设备信息失败
      });
  }
  // 开始
  function start() {
    const html5QrCode = new Html5Qrcode("reader", { verbose: true });
    if (!cameraId) return;
    html5QrCode
      .start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        // 成功
        (decodedText, decodedResult) => {
          console.log(decodedText);
          console.log(decodedResult);
          stop();
          clear();
          navigate("/draw", { state: { ...state, result: decodedResult } });
        },
        // 失败
        (errorMessage) => {
          console.error(errorMessage);
          console.log(state);
          stop();
          clear();
          navigate("/draw", { state });
        }
      )
      .catch((err) => {
        console.error("err>>>: ", err);
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
        Toast.show({
          content: errMsg,
        });
      });
  }
  // 停止
  function stop() {
    const qrInstance = new Html5Qrcode("reader");
    console.log("------------");
    // qrInstance.clear();
    qrInstance
      .stop()
      .then(() => {
        console.log("QR Code scanning stopped.");
      })
      .catch((err: any) => {
        console.log("Unable to stop scanning.");
      });
  }
  function clear() {
    console.log("---------leave");
    new Html5Qrcode("reader").clear();
  }
  useEffect(() => {
    console.log('----cameraId------')
    console.log('change');
    getCameras();
    return () => clear();
  }, [cameraId]);

  return <div id="reader" className={styleScode["scan--box"]}></div>;
};

export default BarcodeScanner;
