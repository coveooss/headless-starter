import {useEffect} from 'react';
import './App.css';
import {SearchBox} from './components/search-box';
import {loadSearchAnalyticsActions, loadSearchActions} from '@coveo/headless';
import {headlessEngine} from './engine';
import {ResultList} from './components/result-list';
import {Facet} from './components/facet';
import {Pager} from './components/pager';
import {Sort} from './components/sort';
import {
  facet,
  pager,
  resultList,
  searchBox,
  sort,
  querySummary,
  resultsPerPage,
} from './controllers/controllers';
import {criteria} from './controllers/sort-criteria';
import {QuerySummary} from './components/query-summary';
import {ResultsPerPage} from './components/results-per-page';

function App() {
  useEffect(() => {
    const {logInterfaceLoad} = loadSearchAnalyticsActions(headlessEngine);
    const {executeSearch} = loadSearchActions(headlessEngine);
    headlessEngine.dispatch(executeSearch(logInterfaceLoad()));
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Coveo Headless Search Interface</h1>
      </header>
      <div className="App-body">
        <div className="search-section">
          <SearchBox controller={searchBox} />
        </div>

        <div className="main-section">
          <div className="facet-section column">
            <Facet controller={facet} title="Source" />
          </div>
          <div className="results-section column">
            <div className="query-section">
              <QuerySummary controller={querySummary} />
            </div>
            <Sort controller={sort} criteria={criteria} />
            <ResultList controller={resultList} />
            <Pager controller={pager} />
            <ResultsPerPage controller={resultsPerPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
