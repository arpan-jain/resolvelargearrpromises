import bluebird from 'bluebird';

const processNextTickAsync = async function processNextTickAsync() {
  try {
    return new Promise((resolve) => process.nextTick(() => {
      return resolve();
    }));
  } catch (ex) {
    throw ex;
  }
};

/**
 * Function to resolve a large array of promises which will be resolved in series of batches (batches will be resolved in parallel)
 * @param largeArr : array of promises
 * @param parallelLimit : determines the batch size
 * @returns {Promise<*>}
 */
export const processLargeArrAsync = async function processLargeArrAsync(largeArr, parallelLimit) {
  try {
    const outerArr = [],
      l = largeArr.length;
    for (let i = 0; i < l; i += parallelLimit) {
      const currentChunk = largeArr.slice(i, i + parallelLimit);
      // console.log('currentChunk: ',currentChunk.toString());
      outerArr.push(async () => await bluebird.all(currentChunk.map(async (element) => await element())));
    }

    return await bluebird.reduce(outerArr, async (memo, element) => {
      // console.log('element : ',element.toString());
      memo.push(await element());
      await processNextTickAsync();
      return memo;
    }, []);

  } catch (ex) {
    throw ex;
  }
};
