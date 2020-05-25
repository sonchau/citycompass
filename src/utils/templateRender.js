const templateRender = (template, data) => {
  const paramsRex = /\{\{(.*?)\}\}/g;
  return template
    .replace(paramsRex, (expression) =>
      expression.slice(2, -2).chain((name) => {
        let value = data[name] !== undefined ? data[name] : expression;
        // return typeof value == "number" ? value.toLocaleString() : value;
        return value;
      })
    )
    .replace(/\s\s+/g, " ");
};

export default templateRender;
