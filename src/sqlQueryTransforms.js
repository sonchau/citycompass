import remove from "./utils/removeKey";

export default {
  PAGE_DATA_QUERY: ({ rows, fields }) => {
    const row2nested = (
      memo,
      {
        // [{a: b[ c: [ d: []]], .... }]
        // [{
        // depth: 2
        // a: [{ level: "A1", title: "Area profile" },
        //     b: [ { }, {}, {}, c: [{}, d:] ] }] ]
        a_level,
        a_title,
        b_level,
        b_title,
        c_level,
        c_title,
        d_level,
        d_title,
        page_code,
      }
    ) => {
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

      //   [{A1, title}, {A2, title}]

      //   return trimByDepth({
      //     depth,
      //     page_code,
      //     a: {
      //       a_level,
      //       a_title,
      //       b: {
      //         b_level,
      //         b_title,
      //         c: {
      //           c_level,
      //           c_title,
      //           d: {
      //             d_level,
      //             d_title,
      //           },
      //         },
      //       },
      //     },
      //   });
    };

    let data = rows.reduce((memo, current) => {
      const found = memo.find((obj) => obj["a_level"] === current["a_level"]);

      if (!found) {
        memo.push({
          a_level: current["a_level"],
          a_title: current["a_title"],
        });
      }

      return memo;
    }, []);

    // get Bs for A1 (later do in loop for each A*)
    data.map(
      ({ a_level }, index) =>
        (data[index]["b"] = uniqueArray(
          rows
            .filter((r) => r["a_level"] === a_level)
            .map(({ b_level, b_title }) => ({
              b_level,
              b_title,
              // map over cs for this b
              c: uniqueArray(
                rows
                  .filter(
                    (r) => r["a_level"] === a_level && r["b_level"] === b_level
                  )
                  .map(({ c_level, c_title }) => ({
                    c_level,
                    c_title,
                    d: uniqueArray(
                      rows
                        .filter(
                          (r) =>
                            r["a_level"] === a_level &&
                            r["b_level"] === b_level &&
                            r["c_level"] === c_level
                        )
                        .map(({ d_level, d_title }) => ({ d_level, d_title }))
                    ),
                  }))
              ),
            }))
        ).log("bs"))
    );

    return data;
  },
};

const uniqueArray = (a) =>
  [...new Set(a.map((o) => JSON.stringify(o)))].map((s) => JSON.parse(s));
