# react-modal-dialog
React component: modal and Dialog  
弹窗组件`modal`和基础的对话框`Dialog`组件。  
js使用 es6 编写，css基于scss，所以项目开发环境必须基于 es6 + sass 环境。  
支持浏览器：已测试 ie9+、chrome45+、ios safari 8.0+  

Demo online: [点此查看](http://u.boy.im/reacrt-modal-dialog/#/dialog)  

具体使用可以查看项目中 demo.jsx 文件

### 如何使用

##### modal
```javascript
import modal from './modal'; //导入组件

modal.open({
    windowClass: null, //弹窗主容器的classname
    windowTopClass: null, //顶层容器的classname
    component: null, //可以是react组件或者react-element
    size: 'lg', //容器尺寸，可选lg md sm dialog, 或者任意取值，通过自定义css设定
    backdrop: true, //暗色背景 true false 'static'
    animation: false, //动画，'fade' 'slide' 'zoom' false
    animationDuration: 600 //动画执行时间，该值应该去动画执行时间一致，非特殊情况不要设置
});

modal.closeAll(); //关闭页面上所有弹窗
modal.count(); //返回页面上弹窗数量
```

##### Dialog
```javascript
import Dialog from './Dialog'; //导入组件

//Dialog基于modal组件
Dialog(content, {
    btns: [{
            text: '按钮名称',
            click: function(){}, //按钮点击事件, 内部可以调用 this.close()、this.dismiss()。
            className: '按钮classname'
        },
        ...
    ],
    title:"弹窗标题",
    backdrop: 'static', //同modal设置
    animation: 'slide' //同modal设置
});
Dialog.alert(content, settings); //setting同上，一般只用title
Dialog.confirm(content, settings); //setting同上，一般只用title
```
