require('./Mark.less');
import Layout from '../../../Layouts/Layout';

var err = [

];

export default class Mark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pics: [
                {
                    src: 'https://www.dqhanblog.cn:4335/2020年第一顿.jpg',
                    name: '2020年第一顿'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/长白山小团队.jpg',
                    name: '长白山小分队'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/sa1.jpg',
                    name: 'sa1'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/sa2.jpg',
                    name: 'sa2'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/sa3.jpg',
                    name: 'sa3'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/sa4.jpg',
                    name: 'sa4'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/sa5.jpg',
                    name: 'sa5'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/sa6.jpg',
                    name: 'sa6'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/sa7.jpg',
                    name: 'sa7'
                },
                {
                    src: 'https://www.dqhanblog.cn:4335/sa8.jpg',
                    name: 'sa8'
                }               
            ],
            status: false,
            pictureName: '2020年第一顿',
            pictureSrc: 'https://www.dqhanblog.cn:4335/2020年第一顿.jpg',
            currentIndex: 0
        };
        err.forEach(e => {
            this[e] = this[e].bind(this);
        })
    }

    componentDidMount() {
        this.initEvent();
    }
    initEvent() {
        function lazyload() {
            let imgs = $('.mark-content-item-pic');
            for (var img of imgs) {
                loadImg(img);
            }
        }

        function loadImg(img) {
            img.src = img.getAttribute('data-src');
            img.onload = function () {
                console.log(`load finished.`);
            }
        }

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
            <Layout
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
            </Layout>
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