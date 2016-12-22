import React from 'react';
import {render as reactRender, unmountComponentAtNode} from 'react-dom';
import ModalContainer from './container';
import makeAnimation from './makeAnimation';

import './style.scss';

const arrayFrom = Array.from || (collection => [].slice.call(collection));

const createElementFromString = string => {
    let container = document.createElement('div');
    let elements;

    container.innerHTML = string;

    elements = arrayFrom(container.children);

    elements.forEach(element => document.body.appendChild(element));

    container = null;

    return elements;
}

const defaultSettings = {
    windowClass: null,
    windowTopClass: null,
    component: null,
    size: 'lg', //lg md sm dialog,
    backdrop: true,
    animation: false,
    animationDuration: 500
}

let zIndex = 1340;

let modalInstances = [];

export const open = (settings = {}) => {
    settings = {...defaultSettings, ...settings};
    zIndex++;

    let elements = createElementFromString((settings.backdrop ? `<div class="modal-backdrop" style="z-index:${zIndex};"></div>` : '') +
                                             `<div style="z-index:${zIndex};" class="modal${settings.windowTopClass ? ' ' + settings.windowTopClass : ''}"></div>`);
    let modalElement = elements[elements.length - 1];

    let bodyStyle = document.body.style;
    let original_overflow = bodyStyle.overflow;

    let withResolve, withReject, instance, destroying;

    //绑定进入时动画
    makeAnimation(elements, 'enter', settings.animation, settings.animationDuration);

    //销毁组件
    const destroy = () => {
        if(destroying) {
            return;
        }

        destroying = true;

        //绑定离开时动画
        makeAnimation(elements, 'leave', settings.animation, settings.animationDuration)
            .then(() => {
                unmountComponentAtNode(modalElement);

                elements.forEach(element => document.body.removeChild(element));

                bodyStyle.overflow = original_overflow;

                let i = 0,
                    len = modalInstances.length;
                for (; i < len; i++) {
                    if (modalInstances[i] === instance) {
                        modalInstances.splice(i, 1);
                        break;
                    }
                }

                modalElement = elements = instance = null;
            });
    }

    const close = data => {
        withResolve(data);
        destroy();
    }
    const dismiss = err => {
        withReject(err);
        destroy();
    }

    bodyStyle.overflow = 'hidden';

    function render(component) {
        if(component){
            settings.component = component;
        }

        //unmountComponentAtNode(modalElement);

        reactRender(<ModalContainer
                    modalElements={elements}
                    {...settings}
                    close={close}
                    dismiss={dismiss} />, modalElement);
    }

    instance = {
        close, dismiss, render,
        result: new Promise((resolve, reject) => {
            withResolve = resolve;
            withReject = reject;

            render();
        })
    }

    modalInstances.push(instance);

    return instance;
}

export const closeAll = () => modalInstances.forEach(instance => instance.dismiss());

export const count = () => modalInstances.length;

export default {open, count, closeAll};
