import {makeInputData, replaceContent} from '../utils/common';

it('should take input data and return array ob object with correct orders', () => {
    const input = [
        {
            bar1: "Mango",
            cartodb_id: 1,
            foo1: "Apple",
            fruit_index: 0,
            the_geom: null,
            the_geom_webmercator: null,
        }, {
            bar1: "Peach",
            cartodb_id: 2,
            foo1: "Pear",
            fruit_index: 1,
            the_geom: null,
            the_geom_webmercator: null
        }
    ]
    const result = makeInputData(input)
    const output = [
        {"{{data.0.bar1}}": "Mango"},
        {"{{data.0.cartodb_id}}": 1},
        {"{{data.0.foo1}}": "Apple"},
        {"{{data.0.fruit_index}}": 0},
        {"{{data.1.bar1}}": "Peach"},
        {"{{data.1.cartodb_id}}": 2},
        {"{{data.1.foo1}}": "Pear"},
        {"{{data.1.fruit_index}}": 1},

    ]
    expect(result).toEqual(output);
  });

it('should replace content of string', () => {
    const inputArray = [
        {"{{data.0.bar1}}": "Mango"},
        {"{{data.0.cartodb_id}}": 1},
        {"{{data.0.foo1}}": "Apple"},
        {"{{data.0.fruit_index}}": 0},
        {"{{data.1.bar1}}": "Peach"},
        {"{{data.1.cartodb_id}}": 2},
        {"{{data.1.foo1}}": "Pear"},
        {"{{data.1.fruit_index}}": 1},

    ]
    const inputString = `Test block 1 has three lines including this one:
    This line contains a template for this first value {{data.0.bar1}}
    This line contains a template for this second value {{data.1.foo1}}`

    const result = replaceContent(inputArray, inputString)
    const output = `Test block 1 has three lines including this one:
    This line contains a template for this first value Mango
    This line contains a template for this second value Pear`

    expect(result).toEqual(output);
  });  
  