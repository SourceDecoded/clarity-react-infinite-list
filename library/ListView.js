import React, { Component } from "react";

const DEFAULT_BUFFER = 2000;

/** Infinite List View */
class ListView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstBatchIndex: 0,
            lastBatchIndex: 0,
            isLoading: false
        };

        this.childrenHeightCache = [];
        this.cachedScrollContainerRect = null;

        this._onScroll = this._onScroll.bind(this);

        window.listView = this;
    }

    _setRenderableBatches() {
        var children = Array.from(this.batchedComponentsContainer.children);
        var first = null;
        var last = 0;

        this.cachedScrollContainerRect = this.scrollableContainer.getBoundingClientRect();

        children.forEach((child, index) => {
            if (this._isElementInViewport(child, index)) {
                if (first == null) {
                    first = index;
                }

                last = index;
            } else {
                child.style.height = this.childrenHeightCache[index] + "px";
            }
        });

        first = first == null ? 0 : first;

        this.setState((prevState) => {
            if (prevState.firstBatchIndex !== first || prevState.lastBatchIndex !== last) {
                return {
                    firstBatchIndex: first,
                    lastBatchIndex: last
                };
            }
        });
    }

    _getRenderableBatches() {
        let {firstBatchIndex, lastBatchIndex} = this.state;
        let {dataSource, renderRow} = this.props;
        let numberOfBatches = dataSource.getBatchCount();
        let batches = [];

        for (let i = 0; i < numberOfBatches; i++) {
            if (i >= firstBatchIndex && i <= lastBatchIndex) {
                let batchIndex = i;
                let batch = dataSource.getBatchData(batchIndex);
                let batchContainerElement = (
                    <div ref={div => this["batchContainer" + batchIndex] = div} key={batchIndex}>
                        {batch.map((item, itemIndex) => {
                            return renderRow(item, batchIndex + "_" + itemIndex)
                        })}
                    </div>
                );

                batches.push(batchContainerElement);
            } else {
                let emptyBatchContainer = this["batchContainer" + i] || null;

                if (emptyBatchContainer) {
                    let emptyContainerHeight = this["batchContainer" + i].style.height;
                    let emptyBatchContainerElement = (
                        <div style={{ height: emptyContainerHeight }} ref={div => this["batchContainer" + i] = div} key={i}></div>
                    );

                    batches.push(emptyBatchContainerElement);
                }
            }
        }

        return batches;
    }

    _isElementInViewport(element, index) {
        var elementRect = element.getBoundingClientRect();
        this.childrenHeightCache[index] = elementRect.height;

        var scrollContainerRect = this.cachedScrollContainerRect;

        var scrollTop = scrollContainerRect.top - DEFAULT_BUFFER;
        var scrollBottom = scrollContainerRect.bottom + DEFAULT_BUFFER;

        var top = Math.max(elementRect.top, scrollTop);
        var bottom = Math.min(elementRect.bottom, scrollBottom);

        return top < bottom;
    }

    _isWithInBottomBuffer() {
        var scrollContainerRect = this.scrollableContainer.getBoundingClientRect();
        var bottom = scrollContainerRect.height + this.scrollableContainer.scrollTop;

        return this.scrollableContainer.scrollHeight - bottom <= DEFAULT_BUFFER;
    }

    _checkForDig() {
        if (this._isWithInBottomBuffer()) {
            let batchCount = this.props.dataSource.getBatchCount();

            if ((batchCount - 1) > this.state.lastBatchIndex) {
                this.setState((prevState, props) => {
                    return { lastBatchIndex: (prevState.lastBatchIndex + 1)};
                });
            } else {
                this._digBatches();
            }
        }
    }

    _digBatches() {
        this.props.onEndReached(this.state.lastBatchIndex);

        let batchCount = this.props.dataSource.getBatchCount();

        this.setState((prevState, props) => {
            return {
                lastBatchIndex: (batchCount - 1),
                isLoading: true
            };
        });
    }

    _checkForActiveScrollBar() {
        if (this.scrollableContainer.clientHeight === this.scrollableContainer.scrollHeight) {
            this._digBatches()
        }
    }

    _update() {
        this._setRenderableBatches();
        this._checkForDig();
    }

    _onScroll() {
        this._update();
    }

    /**
     * Changes the scrollTop to the position provided.
     * @param {number} position - The desired scroll top position.
     */
    scrollTo(position) {
        this.scrollableContainer.scrollTop = position;
    }

    componentDidMount() {
        this._setRenderableBatches();
        this._checkForActiveScrollBar();
    }

    render() {
        let batchedComponents = this._getRenderableBatches();
        let loadingComponent = this.state.isLoading ? this.props.loadingComponent() : null;

        return (
            <div style={this.props.style} ref={div => this.scrollableContainer = div} onScroll={this._onScroll}>
                <div ref={div => this.batchedComponentsContainer = div}>
                    {batchedComponents}
                </div>
                {loadingComponent}
            </div>
        );
    }
}

export default ListView;