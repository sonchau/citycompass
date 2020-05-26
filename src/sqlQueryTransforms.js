import remove from "./utils/removeKey";

export default {
  PAGE_DATA_QUERY: ({ rows, fields }) => {
    const row2nested = ({
      a_level,
      a_title,
      b_level,
      b_title,
      c_level,
      c_title,
      d_level,
      d_title,
      page_code,
    }) => {
      const countDepth = (str) => {
        const re = /([A-D]\d+)/g;
        return ((str || "").match(re) || []).length;
      };

      const depth = countDepth(page_code).log("depth " + page_code);

      const trimByDepth = (_json, _depth) => {
        if (_depth == 4) return _json;
        const depth2key = { 1: "a", 2: "b", 3: "c", 4: "d" };
        remove(_json, depth2key[depth + 1]);
        return _json;
      };

      return trimByDepth({
        depth,
        page_code,
        a: {
          a_level,
          a_title,
          b: {
            b_level,
            b_title,
            c: {
              c_level,
              c_title,
              d: {
                d_level,
                d_title,
              },
            },
          },
        },
      });
    };

    return rows.reduce((memo, current) => {
      memo.push(row2nested(current));
      return memo;
    }, []);
  },
};
