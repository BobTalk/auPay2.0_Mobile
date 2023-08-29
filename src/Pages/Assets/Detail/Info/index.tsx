import PublicHead from '@/Components/PublicHead'
import { useState } from 'react'
import { ProgressBar } from 'antd-mobile'
import './index.scss'

const Info = () => {
  // 根据传进来的数据判断是充币详情还是提币详情
  const [ headData, setHeadData ] = useState({ title: 'USDT充币详情', back: 'goBack', textColor: 'white' })

  return (
    <div className='assets_info'>
      <PublicHead { ...headData } />
      <div className='assets_info_form'>
        <div className="assets_info_form_head">
          <div className='assets_info_form_head_status'>
            {/* 此处根据传进来的数据判断用哪个icon  进行中、成功、失败 */}
            <i className="iconfont icon-top" />
            {/* <i className="iconfont icon-chenggong" /> */}
            {/* <i className="iconfont icon-shibai" /> */}
          </div>
          <p><i className='iconfont icon-USDT' style={{ 'color' :'#17a37a' }}></i>87,823.00 USDT</p>
          <span>¥123,302.09</span>
        </div>
        <div className='public_w'>
          <ul className="assets_info_form_ul">
            <li><p>创建时间</p><span>2023-06-30 18:17:47</span></li>
            <li><p>完成时间</p><span>2023-06-30 18:17:47</span></li>
            <li><p>货币类型</p><span>USDT-TRC20</span></li>
            <li><p>充币数量</p><span className='assets_info_form_li_money'>23</span></li>
          </ul>
          <ul className="assets_info_form_ul">
            <li><p>付款地址</p><span>0x885ce91cd2bf32983464f4</span></li>
            <li><p>交易ID</p><span>0x885ce91cd2bf32983464f4</span></li>
            <li><p>收款地址</p><span>0x885ce91cd2bf32983464f4</span></li>
            <li><p>交易确认数</p><span><i className="assets_info_form_li_number">5</i>/6</span></li>
            <li>
              <p>交易状态</p>
              <div className='assets_info_form_progress'>
                {/* 进度条样式还要优化 */}
                <ProgressBar percent={30} />
                <span>进行中</span>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
      <a className='goBrowser' href="" target='_blank'>到区块链浏览器查看交易详情</a>
    </div>
  )
}

export default Info