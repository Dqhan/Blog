export default class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musics: [
                "/musicSrc/1.mp3",
                "/musicSrc/2.mp3",
                "/musicSrc/3.mp3"
            ]
        }
    }

    render() {
        return <div className='player'>
            <audio loop="loop"
                // autoplay='autoplay'
                controls="controls">
                <source src="/musicSrc/1.mp3" type="audio/mpeg" />
                {/* <source src="/musicSrc/2.mp3" type="audio/mpeg" />
                <source src="/musicSrc/3.mp3" type="audio/mpeg" /> */}
            </audio>
        </div>
    }
}