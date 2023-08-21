import './index.scss'

const PublicHead = (props: any) => {
  const clickBack = () => {
    console.log('点击了我呀')
  }
  return (
    <div className='public_head'>
      <i onClick={ clickBack } className="iconfont icon-icon-arrow-right2"></i>
      <p className='public_head_tit'>{ props.title }</p>
    </div>
  )
}

export default PublicHead