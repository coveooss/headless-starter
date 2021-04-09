import {FacetSearch as HeadlessFacetSearch, FacetSearchState} from '@coveo/headless';
import {FunctionComponent, useState} from 'react';

export interface FacetSearchProps {
  controller: HeadlessFacetSearch;
  facetSearchState: FacetSearchState;
}

export const FacetSearch: FunctionComponent<FacetSearchProps> = (props) => {
  const [searchBoxValue, setSearchBoxValue] = useState('');
  const updateSearch = (text: string) => {
    setSearchBoxValue(text);
    props.controller.updateText(text);
    props.controller.search();
  };

  const searchResultsStyle = {
    listStyleType: 'none',
  };

  return (
    <div>
      <input
        value={searchBoxValue}
        onInput={(e) => updateSearch(e.currentTarget.value)}
      />
      {searchBoxValue !== '' && <ul style={searchResultsStyle}>
        {props.facetSearchState.values.map((facetSearchValue) => (
          <li key={facetSearchValue.rawValue}>
            <button
              onClick={() => {
                props.controller.select(facetSearchValue);
                updateSearch('');
              }}
            >
              {facetSearchValue.displayValue} ({facetSearchValue.count})
            </button>
          </li>
        ))}
      </ul>}
    </div>
  );
}
