import React from 'react';
import ReactDOM from 'react-dom';

export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
        this.timer = null;
        this.banner0 = null;
        this.banner1 = null;
        this.banner2 = null;
        this.bannerContent = null;
        this.elmentDuration = 1 / 3 * 100;
        this.indicatorsClick = this.indicatorsClick.bind(this);
    }

    componentDidMount() {
        this.initElement();
        this.timer = setInterval(this.bannerCarousel.bind(this), 6000);
    }

    initElement() {
        var self = this,
            elements = document.getElementsByClassName('banner-item');
        this.banner0 = elements[0];
        this.banner1 = elements[1];
        this.banner2 = elements[2];
        this.bannerContent = document.getElementsByClassName('banner-content')[0];
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    bannerCarousel() {
        if (this.banner0.classList.contains('active')) this.state.currentIndex = 1;
        if (this.banner1.classList.contains('active')) this.state.currentIndex = 2;
        if (this.banner2.classList.contains('active')) this.state.currentIndex = 0;
        this.renderBannerByCurrentIndex();
        this.setState(this.state);
    }

    renderBannerByCurrentIndex() {
        switch (this.state.currentIndex) {
            case 0:
                this.banner2.classList.remove('active');
                this.banner0.classList.add('active');
                this.bannerContent.style.transform = `translate3d(${-this.elmentDuration * 2}%,0,0)`;
                break;
            case 1:
                this.banner0.classList.remove('active');
                this.banner1.classList.add('active');
                this.bannerContent.style.transform = `translate3d(${-this.elmentDuration * 1}%,0,0)`;
                break;
            case 2:
                this.banner1.classList.remove('active');
                this.banner2.classList.add('active');
                this.bannerContent.style.transform = `translate3d(${-this.elmentDuration * 0}%,0,0)`;
                break;
        }
    }

    indicatorsClick(target) {
        this.state.currentIndex = target;
        this.setState(this.state);
        this.renderBannerByCurrentIndex(target);
        window.clearInterval(this.timer);
        this.timer = setInterval(this.bannerCarousel.bind(this), 6000);
    }

    render() {
        return <div className='banner'>
            <ol className='banner-indicators'>
                <li className={this.state.currentIndex == 0 ? 'banner-indicators-item active' : 'banner-indicators-item'} href='javascript:void(0);' onClick={() => { this.indicatorsClick(0) }}></li>
                <li className={this.state.currentIndex == 1 ? 'banner-indicators-item active' : 'banner-indicators-item'} href='javascript:void(0);' onClick={() => { this.indicatorsClick(1) }}></li>
                <li className={this.state.currentIndex == 2 ? 'banner-indicators-item active' : 'banner-indicators-item'} href='javascript:void(0);' onClick={() => { this.indicatorsClick(2) }}></li>
            </ol>
            <div className='banner-inner'>
                <div className='banner-content'>
                    <div className='banner-item active' data-banneritem='0' style={{ backgroundColor: 'rgb(15, 163, 163)' }}>
                        <div>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                    <div className='banner-item' data-banneritem='1' style={{ backgroundColor: 'rgb(163, 15, 126)' }}>
                        <div>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                    <div className='banner-item' data-banneritem='2' style={{ backgroundColor: 'rgb(202, 120, 12)' }}>
                        <div>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    }
}