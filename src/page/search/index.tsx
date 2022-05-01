import { useState } from 'react';
import SearchInput from '../../component/input/index';
import LoadIcon from '../../component/loadIcon/loadIcon';
import axios from 'axios';
import './index.css';
export default function SearchPage(props: any) {
    let [user, setUser] = useState({
        name: "",
        qlogo: "",
        qq: ""
    })
    let [errTxt, setErrTxt] = useState("")
    let [load,setLoad] = useState(false)
    let timer: any = null
    function inputChange(e: any): void {
        let { value } = e.target
        // 输入小于最低长度，不做处理
        if (value.length < 4) return
        // 当用户停止输入的时候查询，防止无节制发送请求
        clearTimeout(timer)
        timer = setTimeout(() => {
            fetchSearchApi(value)
        }, 500);

    }
    function fetchSearchApi(value: string) {
        const reg = /[1-9][0-9]{4,}/
        if (reg.test(value)) {
            if (errTxt !== "") setErrTxt("")
            if(!load) setLoad(true)
            axios.get('https://api.uomg.com/api/qq.info', {
                params: {
                    qq: value
                }
            }).then(response => {
                if (response.data) {
                    let res = response.data
                    if (res.code === 1) {
                        setUser({
                            name: res.name,
                            qlogo: res.qlogo,
                            qq: res.qq
                        })
                    } else {
                        alert("查询失败")
                    }
                }
                setLoad(false)
            }).catch(_ => {
                setLoad(false)
                alert("查询失败")
            })
        } else {
            setErrTxt("请输入正确的qq号")
        }
    }
    return (
        <div className='page_main'>
            <div className='title'>
                <h3 >QQ号查询</h3>
                <SearchInput
                    label="QQ"
                    input={inputChange}
                    errTxt={errTxt}
                />
                {/* 如果存在qq号则展示qq的相关信息 */}
                <div className='contentMain'>
                    {(user.qq && !load) && (<div className='content'>
                        <div className='img'>
                            <img src={user.qlogo} />
                        </div>
                        <div className='info'>
                            <div className="name">{user.name ? user.name : "无"}</div>
                            <div className='qq_number'>{user.qq}</div>
                        </div>
                    </div>)}
                     {load && (<LoadIcon />)}
                </div>

            </div>
        </div>
    )
}