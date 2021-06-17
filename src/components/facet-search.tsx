import {
  FacetSearch as HeadlessFacetSearch,
  FacetSearchState,
} from '@coveo/headless';
import {FunctionComponent} from 'react';

export interface FacetSearchProps {
  controller: HeadlessFacetSearch;
  facetSearchState: FacetSearchState;
}

export const FacetSearch: FunctionComponent<FacetSearchProps> = (props) => {
  const updateSearch = (text: string) => {
    props.controller.updateText(text);
    props.controller.search();
  };

  const searchResultsStyle = {
    listStyleType: 'none',
  };

  return (
    <div>
      <input
        value={props.facetSearchState.query}
        onInput={(e) => updateSearch(e.currentTarget.value)}
      />
      {props.facetSearchState.query !== '' && (
        <ul style={searchResultsStyle}>
          {props.facetSearchState.values.map((facetSearchValue) => (
            <li key={facetSearchValue.rawValue}>
              <button
                onClick={() => {
                  props.controller.select(facetSearchValue);
                }}
              >
                {facetSearchValue.displayValue} ({facetSearchValue.count})
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
