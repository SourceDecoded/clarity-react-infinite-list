const DEFAULT_BATCH_SIZE = 20;

class ListViewDataSource {
    constructor(batchSize) {
        this._dataBlob = [];
        this._batchedData = [];
        this._cachedRowCount = 0;
        this._cachedBatchCount = 0;
        this._batchSize = batchSize || DEFAULT_BATCH_SIZE;
    }

    _createBatchedData(newDataSource) {
        this._batchedData = newDataSource._dataBlob.reduce((acc, currentItem, currentIndex) => {
            if ( !(currentIndex % this._batchSize)) {
                acc.push(newDataSource._dataBlob.slice(currentIndex, currentIndex + this._batchSize))
            }
            return acc;
        }, []);

        this._cachedBatchCount = this._batchedData.length;
    }

    cloneWithRows(dataBlob) {
        let newDataSource = new ListViewDataSource(this._batchSize);
        newDataSource._dataBlob = this._dataBlob.concat(dataBlob);
        newDataSource._cachedRowCount = newDataSource._dataBlob.length;
        
        this._createBatchedData(newDataSource);

        newDataSource._batchedData = this._batchedData;
        newDataSource._cachedBatchCount = newDataSource._batchedData.length;

        return newDataSource;
    }

    getBatchCount() {
        return this._cachedBatchCount;
    }

    getBatchData(batchIndex) {
        return this._batchedData[batchIndex];
    }
};



export default ListViewDataSource;