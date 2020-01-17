
class RowTempate extends R.DataGridRow {
    constructor(props) {
        super(props);
    }


    render() {
        var data = this.props.rowDate;
        return (
            <div role="table-body-row" data-part="row">
                <div data-part="cell">{data.text0}</div>
                <div data-part="cell">{data.text1}</div>
                <div data-part="cell">{data.text2}</div>
                <div data-part="cell">{data.text3}</div>
            </div>
        );
    }
}

export default RowTempate;