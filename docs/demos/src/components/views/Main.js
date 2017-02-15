import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersBatch, setFetchingUsersStatus } from "../../actions";
import { ListView, ListViewDataSource } from "clarity-react-infinite-list";
import ListItem from "../layouts/ListItem";

const styles = {
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    header: {
        boxShadow: "0 1px 8px rgba(0,0,0,.3)",
        fontSize: "18px",
        textAlign: "center",
        height: "80px",
        lineHeight: "80px",
        color: "#f2f2f2",
        backgroundColor: "#1e88e5",
        position: "relative",
        zIndex: "2"
    },
    listView: {
        paddingTop: "16px",
        position: "absolute",
        top: "80px",
        bottom: "0",
        left: "0",
        right: "0",
        overflowY: "scroll"
    },
    loading: {
        textAlign: "center",
        paddingBottom: "16px"
    }
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListViewDataSource(30),
            lastUserId: 0
        };

        this._renderRow = this._renderRow.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._loadingComponent = this._loadingComponent.bind(this);
    }

    _renderRow(rowData, rowId) {
        return (
            <ListItem key={rowId} rowData={rowData} rowId={rowId} />
        );
    }

    _onEndReached() {
        if (!this.props.isFetchingUsers) {
            this.props.setFetchingUsersStatus(true);
            this.props.getUsersBatch(this.state.lastUserId);
        }
    }

    _loadingComponent() {
        return (
            <div style={styles.loading}>Loading...</div>
        );
    }

    componentWillMount() {
        this.props.setFetchingUsersStatus(true);
        this.props.getUsersBatch(this.state.lastUserId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users[nextProps.users.length - 1] && this.state.lastUserId !== nextProps.users[nextProps.users.length - 1].id) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.users),
                lastUserId: nextProps.users[nextProps.users.length - 1].id,
            });
        }
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    Clarity React Infinite Scroll Example
                </div>
                <ListView style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    onEndReached={this._onEndReached}
                    loadingComponent={this._loadingComponent}
                    buffer={5000}
                    ref={listView => this.listView = listView} />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users,
        isFetchingUsers: state.isFetchingUsers
    };
};

const mapDispatchToProps = {
    getUsersBatch,
    setFetchingUsersStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);