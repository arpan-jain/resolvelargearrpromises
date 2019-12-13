# resolvelargearrpromises



A nodejs functionality to resolve large array of promises in a series of parallel batches,  without hitting the call stack size.


## Installation
To install this package, clone this git repository and include it in your project's node_modules or simply:

```
npm install resolvelargearrpromises
```

Require resolvelargearrpromises in your script and give it a variable name:

In commonJs:

```js
const processLargeArrAsync = require('resolvelargearrpromises');
```

In ESM:

```js
import {processLargeArrAsync} from 'resolvelargearrpromises';
```


## Example
You will be able to use the functionality like :
```
const f1 = async f1(){
  const promises = [];
  const paralleLimit = 4 // number of parallel batch
  promises.push(some task)
  await processLargeArrAsync(promises, paralleLimit);
  return {result}
}

```

<hr>

## Contributions
If you want to contribute, feel free to open issues and send pull request
