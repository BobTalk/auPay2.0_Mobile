import { useEffect } from "react"

const PublicScroll = (props:any)=>{
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return <>{props.children}</>
}
export default PublicScroll