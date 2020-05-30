const pageCodeToObjectPath = (page_code = "A1B5C1D4") => {
  const re = /([A-Z]\d+)|([A-Z])/g;
  let matches = page_code.match(re);
  if (!matches) return;

  return matches.reduce((path, current, idx) => {
    if (idx === 0) {
      // A Level path is different
      // "A1".match(/\d+/) => ["1", index: 1, input: "A1", groups: undefined]
      let aIndex = current.match(/\d+/);
      if (aIndex) {
        aIndex = parseInt(aIndex[0]) - 1;
        path = `${path}[${aIndex}]`;
        return path;
      }
    } else {
      let levelLetter = current.match(/([A-Z])/)[0].toLowerCase();
      path = `${path}.${levelLetter}`;
      let levelIndex = current.match(/(\d+)/);
      if (levelIndex) {
        let _levelIndex = parseInt(levelIndex[0]) - 1;
        path = `${path}[${_levelIndex}]`;
      }
      return path;
    }
  }, "");
};

export const pageDepth = (page_code) => {
  const re = /([A-Z]\d+)|([A-Z])/g;
  let m = page_code.match(re);
  return m ? m.length : m;
};

export default pageCodeToObjectPath;
