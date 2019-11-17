/**
 * preload
 */

function lazyWithPreload(factory) {
    const Component = React.lazy(factory);
    Component.preload = factory;
    return Component;
}
const StockChart = lazyWithPreload(() => import("./StockChart"));



import React from "react";
import StockTable from "./StockTable";
// import StockChart from "./StockChart";

const StockChart = React.lazy(() => {
    import('./StockChart');
})

class App extends React.Component {
    state = {
        selectedStock: null
    };
    render() {
        const { stocks } = this.props;
        const { selectedStock } = this.state;
        // return (
        //     <React.Fragment>
        //         <StockTable
        //             stocks={stocks}
        //             onSelect={selectedStock => this.setState({ selectedStock })}
        //         />
        //         {selectedStock && (
        //             <StockChart
        //                 stock={selectedStock}
        //                 onClose={() => this.setState({ selectedStock: false })}
        //             />
        //         )}
        //     </React.Fragment>
        // );
        return (
            <React.Suspense fallback={<div>loading</div>}>
                <StockTable
                    stocks={stocks}
                    onSelect={selectedStock => this.setState({ selectedStock })}
                />
                {/* {selectedStock && (
                    <StockChart
                        stock={selectedStock}
                        onClose={() => this.setState({ selectedStock: false })}
                    />
                )} */}
                {/*  preload <StockChart /> */}
                <React.Suspense fallback={null}>
                    <div hidden={true}>
                        <StockChart stock={stocks[0]} />
                    </div>
                </React.Suspense>
            </React.Suspense>
        );
    }
}
export default App;

