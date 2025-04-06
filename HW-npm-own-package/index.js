const arrayUtils = {
    sum: arr => arr.reduce((acc, val) => acc + val, 0),
  
    average: arr => arr.length ? arrayUtils.sum(arr) / arr.length : 0,
  
    unique: arr => [...new Set(arr)],
  
    flatten: arr => arr.reduce((flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? arrayUtils.flatten(toFlatten) : toFlatten), []
    ),
  
    chunk: (arr, size) => {
      const result = [];
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    },
  
    compact: arr => arr.filter(Boolean),
  
    groupBy: (arr, fn) => arr.reduce((acc, val) => {
      const key = typeof fn === 'function' ? fn(val) : val[fn];
      (acc[key] = acc[key] || []).push(val);
      return acc;
    }, {}),
  
    countBy: (arr, fn) => arr.reduce((acc, val) => {
      const key = typeof fn === 'function' ? fn(val) : val[fn];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {}),
  
    sortBy: (arr, fn) => [...arr].sort((a, b) => fn(a) - fn(b)),
  
    zip: (arr1, arr2) => arr1.map((val, i) => [val, arr2[i]])
  };
  
  module.exports = arrayUtils;
  