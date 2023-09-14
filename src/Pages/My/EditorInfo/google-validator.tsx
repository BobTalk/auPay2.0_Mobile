import DepositBorder from "@/Assets/images/assets/depositBorder.png";
import QrImg from "@/Assets/images/test/qr.png";
import PublicCopy from "@/Components/PublicCopy";

const GoogleValidator = () => {
  const iconClick = (e: any) => {
    console.log(e, "----");
  };
  return (
    <div className="assets_deposit public_w">
      <p className="mt-[.4rem] text-[.28rem] text-[#333] text-center">
        扫描Google验证码进行绑定，或复制密钥进行绑定 妥善保存此二维码
      </p>
      <div className="assets_deposit_qr">
        <div className="assets_deposit_qr_info">
          <img className="assets_deposit_qr_info_img" src={QrImg} alt="" />
          <img
            className="assets_deposit_qr_info_border assets_deposit_qr_info_border1"
            src={DepositBorder}
            alt=""
          />
          <img
            className="assets_deposit_qr_info_border assets_deposit_qr_info_border2"
            src={DepositBorder}
            alt=""
          />
          <img
            className="assets_deposit_qr_info_border assets_deposit_qr_info_border3"
            src={DepositBorder}
            alt=""
          />
          <img
            className="assets_deposit_qr_info_border assets_deposit_qr_info_border4"
            src={DepositBorder}
            alt=""
          />
        </div>
      </div>
      <PublicCopy
        textStyle={{
          fontSize: ".28rem",
          color: "#333",
          letterSpacing: 0,
          textAlign: "justify",
          fontWeight: 400,
        }}
        rows={2}
        style={{ marginTop: ".5rem" }}
        info="TQCNPKq3sLCW6ffsFPd3ZqYyt6HFKNBUTbTQCNPKq3sLCW6ffsFPd3ZqYyFPd3ZqYyFPd3ZqYy"
        click={iconClick}
      />
    </div>
  );
};
export default GoogleValidator;
