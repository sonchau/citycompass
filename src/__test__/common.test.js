import { makeInputData, replaceContent, makeHeading, replaceSqlContent, updateFiltersFromDropdownEvent, makeUrlQueryString,
    santaizeSql, getSelectedFilterValue, makeChartLabel, makeChartDataSets} from '../utils/common';

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

it('should replace content of sql', () => {
    const inputArray = [
        {area: "A1"},
        {year: 2020}
    ]
    const inputString = `SELECT area, year, fruit_index, foo1, foo2, foo3, bar1, bar2, bar3 FROM pagecontent_foobar
    WHERE area = '{{area}}'
    AND year = '{{year}}'
    ORDER BY area, year, fruit_index`

    const result = replaceSqlContent(inputArray, inputString)
    

    const output = `SELECT area, year, fruit_index, foo1, foo2, foo3, bar1, bar2, bar3 FROM pagecontent_foobar
    WHERE area = 'A1'
    AND year = '2020'
    ORDER BY area, year, fruit_index`

    expect(result).toEqual(output);
});

it('should replace content of sql when input array contain string', () => {
    const inputArray = [
        {area: "A1"},
        {year: "2020"}
    ]
    const inputString = `SELECT area, year, fruit_index, foo1, foo2, foo3, bar1, bar2, bar3 FROM pagecontent_foobar
    WHERE area = '{{area}}'
    AND year = '{{year}}'
    ORDER BY area, year, fruit_index`

    const result = replaceSqlContent(inputArray, inputString)
    const output = `SELECT area, year, fruit_index, foo1, foo2, foo3, bar1, bar2, bar3 FROM pagecontent_foobar
    WHERE area = 'A1'
    AND year = '2020'
    ORDER BY area, year, fruit_index`
    
    expect(result).toEqual(output);
});

  it('should split underscore and upper case first letter of string to make heading', () => {
    const input = 'to_become_upcase'
    const result = makeHeading(input)
    const output = 'To Become Upcase'

    expect(result).toEqual(output);
  });

it('should update and return new filters array when object has same keys', () => {
    const inputArray = [
        {area: "A1"},
        {year: 2020}
    ]
    const inputObject =  {key: "1", value: "A2", children: "A2", title: "area"}

    const result = updateFiltersFromDropdownEvent(inputArray, inputObject)
    const output =  [
        {area: "A2"},
        {year: 2020}
    ]

    expect(result).toEqual(output);
});

it('should create url string base on the array', () => {
    const inputArray = [
        {area: "A1"},
        {year: 2020}
    ]

    const result = makeUrlQueryString(inputArray)
    const output =  '?area=A1&year=2020'

    expect(result).toEqual(output);
});

it('should remove start and end braces', () => {
    const input = "{something}"
    const result = santaizeSql(input)
    const output =  'something'

    expect(result).toEqual(output);
});


it('should get selected filter value', () => {
    const filterItems = [
        {population: "Females"},
        {population: "Males"},
        {population: "Persons"}
    ]
    const selectedFilters = [
        {geo_name: "Berwick"},
        {category: "0 - 4 years old"},
        {population: "Females"}
    ]
    const result = getSelectedFilterValue(filterItems, selectedFilters)
    const output =  'Females'

    expect(result).toEqual(output);
});

it('should make chart label', () => {
    const input = [
        {category: "Infants / Pre-school (0 - 4)", population: "Females", year: 2006, value: 9293},
        {category: "Primary school (5- 11)", population: "Females", year: 2006, value: 12378},
        {category: "Infants / Pre-school (0 - 4)", population: "Females", year: 2016, value: 293},
        {category: "Primary school (5- 11)", population: "Females", year: 2016, value: 2378}
    ]
    const result = makeChartLabel(input, 'category')
    const output =  [
        "Infants / Pre-school (0 - 4)",
        "Primary school (5- 11)"
    ]

    expect(result).toEqual(output);
});

it('should make chart datasets', () => {
    const input = [
        {category: "Infants / Pre-school (0 - 4)", population: "Females", year: 2006, value: 9293},
        {category: "Primary school (5- 11)", population: "Females", year: 2006, value: 12378},
        {category: "Infants / Pre-school (0 - 4)", population: "Females", year: 2016, value: 293},
        {category: "Primary school (5- 11)", population: "Females", year: 2016, value: 2378}
    ]
    const datasets = "year"
    const valueInput = "value"
    const result = makeChartDataSets(input, datasets, valueInput)

    const output =  [
        {
            label: '2006',
            data: [9293, 12378],
            backgroundColor: 'rgba(233,130,68,1)',
            borderColor: 'rgba(233,130,68,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(233,130,68,1)',
            hoverBorderColor: 'rgba(233,130,68,1)',
        },
        {
            label: '2016',
            data: [293, 2378],
            backgroundColor: 'rgba(78,115,190,1)',
            borderColor: 'rgba(78,115,190,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(78,115,190,1)',
            hoverBorderColor: 'rgba(78,115,190,1)',
        }
    ]

    expect(result).toEqual(output);
});

