import React, {FC} from 'react';
import './button.scss'

interface ButtonProps {
    width?: number
    onClick?: (e ?: React.FormEvent<EventTarget>)  => void
}

const Button: FC<ButtonProps> = ({children, width, onClick}) => {
    return (
        <div className="buttons" style={{width: width + 'px'}}>
            <button type="submit" className={'blob-btn '} onClick={onClick}>
                {children}
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
            </button>
            <br/>
            <svg style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix"
                                       values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                                       result="goo"></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default Button;
