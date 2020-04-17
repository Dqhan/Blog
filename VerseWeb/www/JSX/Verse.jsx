import MusicPlayer from './MusicPlayer';

export default class Verse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [
                { desc: '无乱于心，不困于情，不畏将来，不念过往，如此安好！', autor: '丰子恺' },
                { desc: '放弃不难，但是坚持下去一定很酷。', autor: '解忧渣货店' },
                { desc: '无论现在多么不开心，你要相信，明天会比今天更好。', autor: '解忧渣货店' },
                { desc: '梦见你哭了，我心里难过，就行了。', autor: '巴金' },
                { desc: '那一世，我转山转水转佛塔，不维修来世，只为途中与你相见', autor: '仓英嘉措' },
                { desc: '那一世，我转山转水转佛塔，不维修来世，只为途中与你相见', autor: '仓英嘉措' },
                { desc: '那一世，我转山转水转佛塔，不维修来世，只为途中与你相见', autor: '仓英嘉措' },
                { desc: '那一世，我转山转水转佛塔，不维修来世，只为途中与你相见', autor: '仓英嘉措' },
                { desc: '那一世，我转山转水转佛塔，不维修来世，只为途中与你相见', autor: '仓英嘉措' },
            ]
        }
    }

    componentDidMount() {
        this.initEvent();
    }

    initEvent() {
        function lazyload() {
            let sections = $('.verse-section');
            // for (var section of sections) {
            //     if (isShow($(section))) loadSection(section);
            // }

            for (var i = 0; i < sections.length; i++) {
                var section = sections[i];
                if (isShow($(section))) loadSection(i, section);
            }
        }

        function isShow($node) {
            return $node.offset().top <= $(window).height() + $(window).scrollTop();
        }

        function loadSection(index, section) {
            setTimeout(function () {
                section.classList.add('active');
            }, 50 * index)
        }
        lazyload();
        window.onscroll = CommonUtil.throttle(lazyload, this, 300, 600);
    }

    renderContent() {
        return this.state.content.map((c, index) => {
            return <section className='verse-section' key={index}>
                <div className='verse-section-desc'>{c.desc}</div>
                <div className='verse-section-autor'>{c.autor}</div>
            </section>
        })
    }

    render() {
        return <React.Fragment>
            <R.Layout
                history={this.props.history}
                logo="很多事情，不是看到希望采取坚持，而是坚持到了最后才会看到希望。"
            >
                <div className='verse'>
                    {
                        this.renderContent()
                    }
                </div>
            </R.Layout>
            <MusicPlayer />
        </React.Fragment>
    }
}
