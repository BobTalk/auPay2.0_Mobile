import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QrAttr {
  width: number;
  height: number;
}
const BarcodeScanner = () => {
  const qrboxFunction = function <T extends QrAttr>(obj: T): QrAttr {
    let minEdgePercentage = 0.8; // 64%
    let minEdgeSize: number = Math.min(obj.width, obj.height);
    let qrboxSize: number = Math.floor(minEdgeSize * minEdgePercentage);
    console.log('qrboxSize>>>>: ', qrboxSize);
    return {
      width: qrboxSize,
      height: qrboxSize,
    };
  };
  useEffect(() => {
    if (Html5QrcodeScanner) {
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: qrboxFunction({
            width: 250,
            height: 250,
          }),
        },
        false
      );
     
      html5QrcodeScanner.render(
        (data: any) => console.log("success ->", data),
        (err: any) => {
          console.log('err: ', err);
          // html5QrcodeScanner.clear()
          html5QrcodeScanner.pause()
          // history.back()
        }
      );
    }
  }, [Html5QrcodeScanner]);

  return <div id="reader"></div>;
};
export default BarcodeScanner;
