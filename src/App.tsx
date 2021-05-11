import {useEffect} from 'react';
import './App.css';
import {SearchBox} from './components/search-box';
import {AnalyticsActions, SearchActions, buildDateFacet} from '@coveo/headless';
import {headlessEngine} from './engine';
import {ResultList} from './components/result-list';
import {Facet} from './components/facet';
import {DateFacet} from './components/date-facet';
import {Pager} from './components/pager';
import {Sort} from './components/sort';
import {
  facet,
  pager,
  resultList,
  searchBox,
  sort,
} from './controllers/controllers';
import {criteria} from './controllers/sort-criteria';
import {resultTemplatesManager} from './controllers/result-templates-manager';

function App() {
  useEffect(() => {
    headlessEngine.dispatch(
      SearchActions.executeSearch(AnalyticsActions.logInterfaceLoad())
    );
  });

  const controller = buildDateFacet(headlessEngine, {
    options: {
      field: 'date',
      generateAutomaticRanges: true,
    },
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
            <DateFacet controller={controller} title="Date" />;
          </div>
          <div className="results-section column">
            <Sort controller={sort} criteria={criteria} />
            <ResultList
              controller={resultList}
              resultTemplatesManager={resultTemplatesManager}
            />
            <Pager controller={pager} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
