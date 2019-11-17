
/**
 * webpack + es6 import async
 */
export default function (loading) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                Component: null
            }
        }

        async componentWillMount() {
            let Component = await loading();
            this.setState({
                Component: Component.default ? Component.default : null
            })
        }

        render() {
            let Component = this.state.Component;
            return Component ? <Component /> : null
        }
    }
}

let Demo = Load(() => import('../component'))
