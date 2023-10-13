import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = () => {
  useEffect(() => {
    if (Html5QrcodeScanner) {
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
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
