import { ReactElement, JSXElementConstructor, ReactFragment } from 'react';
import './loadIcon.css';
export default function LoadIcon(props: any) {
    const iconArr = [1,2,3,4,5]
    let iconDom: any[]  = []
    iconArr.forEach(item => {
        let ele:any = (
            <div className={"ele" + item} key={item}></div>
        )
        iconDom.push(ele)
    })
    return (<div className='loading'>
        {iconDom}
    </div>)
}