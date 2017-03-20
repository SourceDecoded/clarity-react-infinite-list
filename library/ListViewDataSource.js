const DEFAULT_BATCH_SIZE = 20;

class ListViewDataSource {
    constructor(batchSize, dataBlob) {
        this._dataBlob = dataBlob || [];
        this._batchedData = [];
        this._batchSize = batchSize || DEFAULT_BATCH_SIZE;
        this._createBatchedData();
    }

    _createBatchedData() {
        this._batchedData = this._dataBlob.reduce((acc, currentItem, currentIndex) => {
            if (!(currentIndex % this._batchSize)) {
                acc.push(this._dataBlob.slice(currentIndex, currentIndex + this._batchSize))
            }
            return acc;
        }, []);
    }

    appendRows(dataBlob) {
        this.cloneWithRows(dataBlob);
    }

    prependRows(dataBlob) {
        let newDataSource = new ListViewDataSource(this._batchSize, this._dataBlob.unshift(dataBlob));
        return newDataSource;
    }

    cloneWithRows(dataBlob) {
        let newDataSource = new ListViewDataSource(this._batchSize, this._dataBlob.concat(dataBlob));
        return newDataSource;
    }

    getBatchCount() {
        return this._batchedData.length;
    }

    getBatchData(batchIndex) {
        return this._batchedData[batchIndex];
    }
};

export default ListViewDataSource;