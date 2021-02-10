import React, { useEffect } from 'react';
import './App.css';
import { SearchBox } from './components/search-box';
import { AnalyticsActions, buildDateSortCriterion, buildFacet, buildFieldSortCriterion, buildPager, buildRelevanceSortCriterion, buildResultList, buildSearchBox, buildSort, SearchActions, SortCriterion, SortOrder } from '@coveo/headless';
import { headlessEngine } from './engine';
import { ResultList } from './components/result-list';
import { Facet } from './components/facet';
import { Pager } from './components/pager';
import { Sort } from './components/sort';

const searchBox = buildSearchBox(headlessEngine);

const resultList = buildResultList(headlessEngine);

const facet = buildFacet(headlessEngine, {options: {field: 'source'}});

const pager = buildPager(headlessEngine);

const criteria: [string, SortCriterion][] = [
  ['Relevance', buildRelevanceSortCriterion()],
  ['Date (Ascending)', buildDateSortCriterion(SortOrder.Ascending)],
  ['Date (Descending)', buildDateSortCriterion(SortOrder.Descending)],
  ['Size (Ascending)', buildFieldSortCriterion('size', SortOrder.Ascending)],
  ['Size (Descending)', buildFieldSortCriterion('size', SortOrder.Descending)],
];
const initialCriterion = criteria[0][1];
const sort = buildSort(headlessEngine, {
  initialState: {criterion: initialCriterion},
});

function App() {

  useEffect(() => {
    headlessEngine.dispatch(SearchActions.executeSearch(AnalyticsActions.logInterfaceLoad()));
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Coveo Headless Search Interface</h1>
      </header>
      <div className="App-body">
        <div className="search-section"><SearchBox controller={searchBox} /></div>
        <div className="main-section">
          <div className="facet-section column">
            <Facet controller={facet} title="Source"/>
          </div>
          <div className="results-section column">
            <Sort controller={sort} criteria={criteria} />
            <ResultList controller={resultList} />
            <Pager controller={pager} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
