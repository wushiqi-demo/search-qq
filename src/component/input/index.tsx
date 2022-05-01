import React, {useRef} from 'react';
import './index.css';
export default function SearchInput(props:any) {
    const inputChang = props.input
    function onchange(e:any):void {
        inputChang && inputChang(e)
    }
    return (
        <div className='input_qq'>
            <span className='label'>{props.label}</span>
            &nbsp;
            <input onInput={(e) => onchange(e)}></input>
            <div className='err'>{props.errTxt}</div>
        </div>
    )
}