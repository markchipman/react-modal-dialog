import React, {isValidElement, Component, PropTypes} from 'react';

class ModalContainer extends Component {
    render() {
        const {size, component: MyComponent, windowClass} = this.props;
        //const MyComponent = component;
        let classes = ['modal-container', `modal-${size}`];

        if(windowClass) {
            classes.push(windowClass);
        }

        return (
            <div className={classes.join(' ')} ref="container">
                {(!MyComponent || isValidElement(MyComponent)) ? MyComponent : <MyComponent {...this.props} />}
            </div>
        );
    }

    dismissHandler = ev => {
        const {container} = this.refs;
        if(container != ev.target && !container.contains(ev.target)) {
            this.props.dismiss();
        }
    }

    componentDidMount() {
        const {modalElements, backdrop} = this.props;
        if(backdrop != 'static') {
            modalElements[modalElements.length - 1]
                .addEventListener('click', this.dismissHandler, false);
        }
    }

    componentWillUnmount() {
        const {modalElements, backdrop} = this.props;
        if(backdrop != 'static') {
            modalElements[modalElements.length - 1]
                .removeEventListener('click', this.dismissHandler, false);
        }
    }

    static propTypes = {
        component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
        windowClass: PropTypes.string,
        windowTopClass: PropTypes.string,
        size: PropTypes.string.isRequired,
        backdrop: PropTypes.oneOf([true, false, 'static']),
        animation: PropTypes.oneOf(['fade', 'slide', 'zoom', false, true])
    }
}

export default ModalContainer;
