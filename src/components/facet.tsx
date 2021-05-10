import {Facet as HeadlessFacet, FacetSortCriterion} from '@coveo/headless';
import {FunctionComponent, useEffect, useState} from 'react';
import {FacetSearch} from './facet-search';

interface FacetProps {
  controller: HeadlessFacet;
  title: string;
}

export const Facet: FunctionComponent<FacetProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), [
    controller,
  ]);

  const sortBy = (sortCriterion: FacetSortCriterion) => {
    controller.sortBy(sortCriterion);
  };

  if (!state.values.length) {
    return (
      <div className="facet">
        <h3>{props.title}</h3>
        <div>No facet values</div>
      </div>
    );
  }

  return (
    <div className="facet">
      <h3>{props.title}</h3>
      <FacetSearch
        controller={controller.facetSearch}
        facetSearchState={state.facetSearch}
      />
      <ul>
        {state.values.map((value) => (
          <li key={value.value}>
            <input
              type="checkbox"
              checked={controller.isValueSelected(value)}
              onChange={() => controller.toggleSelect(value)}
              disabled={state.isLoading}
            />
            {value.value} ({value.numberOfResults})
          </li>
        ))}
      </ul>
      {state.canShowMoreValues && (
        <button onClick={() => controller.showMoreValues()}>Show More</button>
      )}
      {state.canShowLessValues && (
        <button onClick={() => controller.showLessValues()}>Show Less</button>
      )}
      <p>&nbsp;Sort by:&nbsp;</p>
      <select
        name="SortBy"
        id="FacetSort"
        onChange={(e) => sortBy(e.currentTarget.value as FacetSortCriterion)}
      >
        <option value="score">Score</option>
        <option value="alphanumeric">Alphanumeric</option>
        <option value="occurrences">Number</option>
      </select>
    </div>
  );
};
