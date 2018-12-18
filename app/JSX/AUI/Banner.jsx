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
        this.bannerCarousel = this.bannerCarousel.bind(this);
    }

    componentDidMount() {
        this.initElement();
        var self = this;
        setTimeout(function () { self.banner2.children[0].classList.add('active') }, 300);
        this.timer = setInterval(this.bannerCarousel, 6000);
    }

    initElement() {
        var self = this,
            elements = document.getElementsByClassName('banner-item');
        this.banner0 = elements[0];
        this.banner1 = elements[1];
        this.banner2 = elements[2];
        this.bannerContent = document.getElementsByClassName('banner-content')[0];
        this.bannerContent.addEventListener('transitionend', this.transitionEnd.bind(this));
    }

    transitionEnd() {
        switch (this.state.currentIndex) {
            case 0:
                this.banner2.children[0].classList.add('active');
                break;
            case 1:
                this.banner1.children[0].classList.add('active');
                break;
            case 2:
                this.banner0.children[0].classList.add('active');
                break;
        }
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    bannerCarousel() {
        this.state.currentIndex++;
        if (this.state.currentIndex > 2) this.state.currentIndex = 0;
        this.renderBannerByCurrentIndex();
        this.setState(Object.assign(this.state, { currentIndex: this.state.currentIndex }))
    }

    renderBannerByCurrentIndex() {
        this.banner2.children[0].classList.remove('active');
        this.banner0.children[0].classList.remove('active');
        this.banner1.children[0].classList.remove('active');
        switch (this.state.currentIndex) {
            case 0:
                this.bannerContent.style.transform = `translate3d(${-this.elmentDuration * 2}%,0,0)`;
                break;
            case 1:
                this.bannerContent.style.transform = `translate3d(${-this.elmentDuration * 1}%,0,0)`;
                break;
            case 2:
                this.bannerContent.style.transform = `translate3d(${-this.elmentDuration * 0}%,0,0)`;
                break;
        }
    }

    indicatorsClick(targetIndex) {
        var self = this;
        self.setState(Object.assign(self.state, { currentIndex: targetIndex }), () => {
            self.renderBannerByCurrentIndex();
            window.clearInterval(self.timer);
            self.timer = setInterval(self.bannerCarousel, 6000);
        });
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
                    <div className='banner-item'>
                        <div className='banner-item-inner'>
                            <p className='title'>成熟的人</p>
                            <p className='description'>谦虚、低调、柔和</p>
                        </div>
                    </div>
                    <div className='banner-item'>
                        <div className='banner-item-inner'>
                            <p className='title'>为人处世</p>
                            <p className='description'>真诚、善良、正直</p>
                        </div>
                    </div>
                    <div className='banner-item'>
                        <div className='banner-item-inner'>
                            <p className='title'>不忘初心</p>
                            <p className='description'>方得始终</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    }
}