import PublicHead from "@/Components/PublicHead";
import "./index.scss";
import DepositBorder from "@/Assets/images/assets/depositBorder.png";
import QrImg from "@/Assets/images/test/qr.png";
import PublicCopy from "@/Components/PublicCopy";
import PublicSummary from "@/Components/PublicSummary";

const Deposit = () => {
  const headData = { title: "充币USDT-ERC20", back: "goBack" };
  const iconClick = (e: any) => {
    console.log(e, "----");
  };
  return (
    <div className="assets_deposit public_w">
      <PublicHead {...headData} />
      <p className="assets_deposit_tit">
        这是您的USDT-ERC20钱包地址
        <br />
        请将您的USDT-ERC20转入此地址
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
        info="TQCNPKq3sLCW6ffsFPd3ZqYyt6HFKNBUTbTQCNPKq3sLCW6ffsFPd3ZqYy"
        click={iconClick}
      />
      <PublicSummary
        iconStyle={{
          color: "#2563f5",
        }}
        titleStyle={{
          fontSize: ".32rem",
          color: "#333",
          letterSpacing: 0,
          fontWeight: 500,
        }}
        summaryStyle={{
          fontSize: ".28rem",
          color: "#999",
          letterSpacing: 0,
          textAlign: "justify",
          lineHeight: ".38rem",
          fontWeight: 400,
        }}
        style={{ marginTop: ".7rem" }}
      />
    </div>
  );
};
export default Deposit;
