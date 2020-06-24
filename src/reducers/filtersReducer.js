import {updateFiltersFromDropdownEvent} from '../utils/common';

const filtersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INIT_FILTERS':
            return action.payload
        case 'UPDATE_FILTERS':
            const newFilters = updateFiltersFromDropdownEvent(state, action.payload);
            return newFilters

        default:
            return state
    }
}

export default filtersReducer