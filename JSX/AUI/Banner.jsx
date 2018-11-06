import React from 'react';
import ReactDOM from 'react-dom';

export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.banner0 = null;
        this.banner1 = null;
        this.banner2 = null;
    }

    componentDidMount() {
        this.initElement();
        this.timer = setInterval(this.bannerCarousel.bind(this), 12000);
    }

    initElement(){
        var elements = document.getElementsByClassName('banner-item');
        this.banner0 = elements[0];
        this.banner1 = elements[1];
        this.banner2 = elements[2];
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('transitionend', function (e) {
                e.target.style.display = 'none';
                if(this.banner0.style.display=='none'){
                    this.banner1.style.display = 'block';
                    this.banner2.style.display = 'none'
                }
            })
        }
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    bannerCarousel() {
        this.banner0.classList
    }

    render() {
        return <div className='banner'>
            <ol className='banner-indicators'>
                <li className='banner-indicators-item'></li>
                <li className='banner-indicators-item'></li>
                <li className='banner-indicators-item'></li>
            </ol>
            <div className='banner-inner'>
                <div className='banner-item' style={{ backgroundColor: 'rgb(15, 163, 163)' }}>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                </div>
                <div className='banner-item' style={{ backgroundColor: 'rgb(163, 15, 126)' }}>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                </div>
                <div className='banner-item' style={{ backgroundColor: 'rgb(202, 120, 12)' }}>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div >
    }
}