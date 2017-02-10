import React, { Component } from "react";
import ListView from "../custom/ListView";
import ListViewDataSource from "../custom/ListViewDataSource";

const styles = {
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    rowContainer: {
        textAlign: "center",
        height: "100px",
        width: "100%",
        color: "#757575",
        backgroundColor: "#fff",
        borderBottom: "1px solid #e9e9e9",
        overflow: "hidden"
    },
    listView: {
        height: "100%",
        width: "100%",
        overflowY: "scroll"
    }
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListViewDataSource()
        };

        window.main = this;

        this._renderRow = this._renderRow.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._loadingComponent = this._loadingComponent.bind(this);
    }

    _renderRow(rowData, rowId) {
        return (
            <div style={Object.assign({}, styles.rowContainer, { height: rowData.height })} key={rowId}>
                <div>{`Item ${rowId}`}</div>
                <div>{rowData.onEndReach}</div>
            </div>
        );
    }

    _onEndReached() {
        let data = [];

        for (let i = 0; i < 20; i++) {
            const randNum = Math.floor(Math.random() * 1000) + 1;
            data.push({ height: randNum, onEndReach: "DUG" });
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        });
    }

    _loadingComponent() {
        return (
            <div>Loading...</div>
        );
    }

    componentWillMount() {
        let data = [];

        for (let i = 0; i < 20; i++) {
            const randNum = Math.floor(Math.random() * 1000) + 1;
            data.push({ height: randNum });
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        });
    }

    render() {
        return (
            <div style={styles.container}>
                <ListView style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    onEndReached={this._onEndReached}
                    loadingComponent={this._loadingComponent}
                    ref={listView => this.listView = listView} />
            </div>
        );
    }
}

export default Main;