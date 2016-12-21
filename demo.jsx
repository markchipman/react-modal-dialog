import React from 'react';
import Dialog, {alert, confirm} from './Dialog';
import {open as modalOpen} from './modal';

const DialogContainer = () => {
    const myDialog = content => {
        return Dialog(content, {
            btns: ['ok', {
                text: '自定义按钮',
                click: function(){
                    window.alert('已点击');
                    this.close();
                }
            }]
        })
    }

    const myModal = (content) => {
        let time = 1000;
        const getElement = time => <div style={{background:'blue', padding:'10px', color: '#fff'}}>自定义modal弹窗：{content} <button onClick={close}>close{time}</button></div>;
        let panel = modalOpen({
            size: 'md',
            animation: 'fade',
            component: getElement(time++)
        });

        let timer = setInterval(() => {
            panel.render(getElement(time++));
        }, 1000);

        panel.result.catch(()=>0).then(()=>{
            clearInterval(timer);
        });

        function close(){
            panel.close();
        }
    }

    return (
        <div className="list-group">
            <a className="list-item" onClick={alert.bind(null, '警告一条信息！')}>alert<i className="arrow"></i></a>
            <a className="list-item" onClick={confirm.bind(null, '警告一条信息！')}>confirm<i className="arrow"></i></a>
            <a className="list-item" onClick={alert.bind(null, '警告一条信息！', {title: '这里是标题'})}>alert带标题栏<i className="arrow"></i></a>
            <a className="list-item" onClick={alert.bind(null, '警告一条信息！', {title: 'zoom效果警告框', animation: 'zoom'})}>alert动画效果zoom<i className="arrow"></i></a>
            <a className="list-item" onClick={myDialog.bind(null, '自定义显示信息！')}>自定义dialog组件<i className="arrow"></i></a>
            <a className="list-item" onClick={myModal.bind(null, '自定义显示信息！')}>直接调用modal.open<i className="arrow"></i></a>
        </div>
    );
}

export default DialogContainer;
