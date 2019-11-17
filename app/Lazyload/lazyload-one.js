
/**
 * webpack + import  通过this.props.children 传递component
 */

export default class Lazyload extends React.Component {
    constructor(props) {
        super(props);
        this.load(props);
        this.state = {
            Component: null
        }
    };

    load() {
        this.props.load()
            .then((res) => {
                this.setState({
                    Component: res.default ? Com.default : null
                })

            })
    }

    render() {
        if (!this.state.Component) return null;
        else this.props.children(this.state.Component);
    }
}

// let demo = function () {
//     return <Load load={() => import('../Component')}>
//         {
//             (Component) => <Component />
//         }
//     </Load>
// }
