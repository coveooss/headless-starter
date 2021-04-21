import {
  SortCriterion,
  buildRelevanceSortCriterion,
  buildDateSortCriterion,
  SortOrder,
} from '@coveo/headless';

export const criteria: [string, SortCriterion][] = [
  ['Relevance', buildRelevanceSortCriterion()],
  ['Date (Ascending)', buildDateSortCriterion(SortOrder.Ascending)],
  ['Date (Descending)', buildDateSortCriterion(SortOrder.Descending)],
];
