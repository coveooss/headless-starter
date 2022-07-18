import {
  buildSearchBox,
  buildResultList,
  buildFacet,
  buildPager,
  buildSort,
  buildQuerySummary,
  buildResultsPerPage,
} from '@coveo/headless';
import {headlessEngine} from '../engine';
import {criteria} from './sort-criteria';

export const searchBox = buildSearchBox(headlessEngine);

export const resultList = buildResultList(headlessEngine);

export const facet = buildFacet(headlessEngine, {options: {field: 'source'}});

export const pager = buildPager(headlessEngine);

export const querySummary = buildQuerySummary(headlessEngine);

export const resultsPerPage = buildResultsPerPage(headlessEngine);

const initialCriterion = criteria[0][1];
export const sort = buildSort(headlessEngine, {
  initialState: {criterion: initialCriterion},
});
