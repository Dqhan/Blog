
export default class Mark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pics: [
                {
                    src: 'https://www.dqhanblog.cn:4335/content/2020年第一顿.jpg',
                    name: '2020年第一顿'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/sa1.jpg',
                    name: 'sa1'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/sa2.jpg',
                    name: 'sa2'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/sa3.jpg',
                    name: 'sa3'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/sa4.jpg',
                    name: 'sa4'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/sa5.jpg',
                    name: 'sa5'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/sa6.jpg',
                    name: 'sa6'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/sa7.jpg',
                    name: 'sa7'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/sa8.jpg',
                    name: 'sa8'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/CBS1.jpg',
                    name: 'CBS1'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/CBS2.jpg',
                    name: 'CBS2'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/CBS3.jpg',
                    name: 'CBS3'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/CBS4.jpg',
                    name: 'CBS4'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/CBS5.jpg',
                    name: 'CBS5'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/CBS6.jpg',
                    name: 'CBS6'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/CBS7.jpg',
                    name: 'CBS7'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/CBS8.jpg',
                    name: 'CBS8'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/CBS9.jpg',
                    name: 'CBS9'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/JD1.jpg',
                    name: 'JD1'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/JD2.jpg',
                    name: 'JD2'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/JD3.jpg',
                    name: 'JD3'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/JD4.jpg',
                    name: 'JD4'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/JD5.jpg',
                    name: 'JD5'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/出差1.jpg',
                    name: '出差1'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/梦工厂1.jpg',
                    name: '梦工厂1'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/梦工厂2.jpg',
                    name: '梦工厂2'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/烤全羊1.jpg',
                    name: '烤全羊1'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/烤全羊2.jpg',
                    name: '烤全羊2'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/烤全羊3.jpg',
                    name: '烤全羊3'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/烤全羊4.jpg',
                    name: '烤全羊4'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/烤全羊5.jpg',
                    name: '烤全羊5'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/烤全羊6.jpg',
                    name: '烤全羊6'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/烤全羊7.jpg',
                    name: '烤全羊7'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/烤全羊8.jpg',
                    name: '烤全羊8'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/content/烤全羊9.jpg',
                    name: '烤全羊9'
                }
            ],
            status: false,
            pictureName: '2020年第一顿',
            pictureSrc: 'https://www.dqhanblog.cn:4335/content/2020年第一顿.jpg',
            currentIndex: 0
        };
    }

    componentDidMount() {
        this.initEvent();
    }
    initEvent() {
        var self = this;
        function lazyload() {
            let imgs = $('.mark-content-item-pic');
            for (var img of imgs) {
                if (isShow($(img))) loadImg(img);
            }
        }

        function isShow($node) {
            return $node.offset().top <= $(window).height() + $(window).scrollTop();
        }

        function loadImg(img) {
            img.src = img.getAttribute('data-src');
            img.loaded = false;
            if (img.loaded === false) {
                img.onload = function (e) {
                    img.loaded = true;
                    var index = self.getCurrentIndex(e.target.dataset.name);
                    if (index % 2 === 0) {
                        img.classList.add('active');
                    } else {
                        img.classList.add('active');
                    }
                }
            }
        }
        lazyload();
        window.onscroll = CommonUtil.throttle(lazyload, this, 300, 600);
    }

    renderContent() {
        return this.state.pics.map(pic => {
            return <div className='mark-content-item'>
                <img data-name={pic.name} onClick={this.handleImgClick.bind(this)} className='mark-content-item-pic' data-src={pic.src} />
            </div>
        })
    }

    handleImgClick(e) {
        let pictureName = e.currentTarget.dataset['name'],
            pictureSrc = e.currentTarget.src,
            currentIndex = this.getCurrentIndex(pictureName);
        this.setState({
            pictureName,
            pictureSrc,
            status: true,
            currentIndex
        })
    }

    getCurrentIndex(name) {
        for (var i = 0; i < this.state.pics.length; i++) {
            if (this.state.pics[i].name === name) return i;
            else continue;
        }
    }

    handleCloseBtn() {
        this.setState({
            status: false
        })
    }

    handleLeftBtn() {
        if (this.state.currentIndex > 0)
            this.state.currentIndex--;
        let
            pictureName = this.state.pics[this.state.currentIndex].name,
            pictureSrc = this.state.pics[this.state.currentIndex].src;
        this.setState({
            pictureName,
            pictureSrc
        })
    }

    handleRightBtn() {
        if (this.state.currentIndex < this.state.pics.length - 1)
            this.state.currentIndex++;
        let
            pictureName = this.state.pics[this.state.currentIndex].name,
            pictureSrc = this.state.pics[this.state.currentIndex].src;
        this.setState({
            pictureName,
            pictureSrc
        })
    }

    render() {
        return <React.Fragment>
            <R.Layout
                history={this.props.history}
                logo="AvePoint DL_NewDA_DEV1"
            >
                <div className='mark'>
                    <div className='mark-title'>不负好时光</div>
                    <div className='mark-content'>
                        {
                            this.renderContent()
                        }
                    </div>
                </div>
            </R.Layout>
            <R.Picture
                id='picture'
                title='Pictrue Show'
                width="1200"
                height="600"
                status={this.state.status}
                pictureName={this.state.pictureName}
                pictureSrc={this.state.pictureSrc}
                handleCloseBtn={this.handleCloseBtn.bind(this)}
                handleLeftBtn={this.handleLeftBtn.bind(this)}
                handleRightBtn={this.handleRightBtn.bind(this)}
            />
        </React.Fragment>
    }
}