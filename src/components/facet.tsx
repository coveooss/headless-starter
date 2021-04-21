import {Facet as HeadlessFacet} from '@coveo/headless';
import {FunctionComponent, useEffect, useState} from 'react';

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
    </div>
  );
};
