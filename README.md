# clarity-react-infinite-list

![NPM version](https://img.shields.io/npm/v/clarity-react-infinite-list.svg?style=flat)
![NPM license](https://img.shields.io/npm/l/clarity-react-infinite-list.svg?style=flat)
![NPM total downloads](https://img.shields.io/npm/dt/clarity-react-infinite-list.svg?style=flat)
![NPM monthly downloads](https://img.shields.io/npm/dm/clarity-react-infinite-list.svg?style=flat)

A browser efficient infinite list for React apps that allows loading of items with differing heights and sizes.
The minimal API is to create a `ListViewDataSource` from `clarity-react-infinite-list`, populate it with an array of data, and add a `ListView` component
with that data source and a `renderRow` callback which takes an item from the data source and returns a renderable component.

## Install
```bash
npm install clarity-react-infinite-list
```

## Demos
[Github API Data](https://sourcedecoded.github.io/clarity-react-infinite-list/demos/build/index.html)

## Features
* Lazy load and fetch data from API requests in batches.
* Infinite number of items and batches
* Items can have dynamic heights and sizes, that do not have to be declared before hand.
* Add in a custom loading component.

## Dependencies
### Version 15.x.x
* `react`
* `react-dom`

## Minimal Example
```js
import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersBatch, setFetchingUsersStatus } from "../../actions";
import { ListView, ListViewDataSource } from "clarity-react-infinite-list";
import ListItem from "../layouts/ListItem";

const styles = {...};

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
                    onEndReachedThreshold={5000}
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
```

## Props
#### `dataSource` ListViewDataSource
* An instance of `ListViewDataSource`to use.

#### `renderRow` function(rowData, rowId) => renderableComponent
* Takes a data entry from the data source and its id and should return a renderable component to be rendered as the row.

#### `onEndReached` function()
* Called when the list has been scrolled to within the `onEndReachedThreshold` of the bottom.

#### `loadingComponent` function() => renderableComponent
* Should return a renderable component, to be displayed at bottom of list when loading new batches.

#### `onEndReachedThreshold` number
* Threshold in pixels for calling `onEndReached`

## Methods
#### `scrollTo(topPosition: number)`
* Scrolls to the given topPosition of the `ListView`.

#### `isScrollbarActive()`
* Returns a boolean of whether or not the `ListView` has enough content to have an active vertical scrollbar.

#### `digBatches()`
* Manually dig batches from the props.onEndReached function.