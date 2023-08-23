import photoImg from '@/Assets/images/test/photo.png'
import './index.scss'

const Home = () => {
  return (
    <div className='home_wrap'>

      <div className="home_banner public_w">
        <div className='home_banner_info'>
          <img src={ photoImg } alt="" />
          <p>西尾猫的世界</p>
        </div>
        <ul className='home_banner_assets'>
          <li>
            <p>
              auPay资产(USDT)
              {/* <i className='iconfont icon-biyan'></i> */}
              <i className='iconfont icon-chakan'></i>
            </p>
            <span>187,823.00</span>
          </li>
          <li>
            <p>Oz资产(OZC)</p>
            <span>3,092.00</span>
          </li>
        </ul>
      </div>

      <div>
        最近一笔交易
      </div>
    </div>
  )
}

export default Home