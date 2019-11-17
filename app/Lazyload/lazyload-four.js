/**
 * webpack common.js的require.ensure
 */

export default function (loading) {
    return class extends React.Component {
        constructor() {

        }

        conponentWillMount() {
            new Promise((resolve, reject) => {
                require.ensure([], function () {  //[]依赖项
                    var c = loading().default;
                    resolve(c);
                })
            })
                .then(res => {
                    this.setState({
                        Component: res
                    })
                })
        }

        render() {
            let Component = this.state.Component;
            return Component ? <Component /> : null
        }
    }
}

// let Demo2 = Load(() => import('../components/demo2'));