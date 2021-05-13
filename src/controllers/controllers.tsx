import {
  buildSearchBox,
  buildResultList,
  buildFacet,
  buildPager,
  buildSort,
  buildDateFacet,
} from '@coveo/headless';
import {headlessEngine} from '../engine';
import {criteria} from './sort-criteria';

export const searchBox = buildSearchBox(headlessEngine, {
  options: {
    highlightOptions: {
      notMatchDelimiters: {
        open: '<strong>',
        close: '</strong>',
      },
      correctionDelimiters: {
        open: '<i>',
        close: '</i>',
      },
    },
  },
});

export const resultList = buildResultList(headlessEngine);

export const facet = buildFacet(headlessEngine, {options: {field: 'source'}});

export const dateFacet = buildDateFacet(headlessEngine, {
  options: {
    field: 'date',
    generateAutomaticRanges: true,
  },
});

export const pager = buildPager(headlessEngine, {options: {numberOfPages: 3}});

const initialCriterion = criteria[0][1];
export const sort = buildSort(headlessEngine, {
  initialState: {criterion: initialCriterion},
});
