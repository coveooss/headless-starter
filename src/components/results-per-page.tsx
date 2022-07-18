import {ResultsPerPage as HeadlessResultPerPage} from '@coveo/headless';
import {FunctionComponent, useEffect, useState} from 'react';

interface ResultsPerPageProps {
  controller: HeadlessResultPerPage;
}

export const ResultsPerPage: FunctionComponent<ResultsPerPageProps> = (
  props
) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), [
    controller,
  ]);
  const pages = [10, 25, 50];

  return (
    <nav className="results-per-page">
      {pages.map((page) => (
        <button
          key={page}
          disabled={controller.isSetTo(page)}
          onClick={() => controller.set(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};
