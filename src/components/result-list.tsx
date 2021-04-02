import {ResultList as HeadlessResultList} from '@coveo/headless'
import { FunctionComponent, useEffect, useState } from 'react'
import {InteractiveResult} from './interactive-result';

interface ResultListProps {
  controller: HeadlessResultList;
}

export const ResultList: FunctionComponent<ResultListProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), [controller]);

  if(!state.results.length) {
    return <div>No results</div>;
  }

  return (
    <div className="result-list">
      <ul>
        {state.results.map((result) => (
          <li key={result.uniqueId}>
            <article>
              <h2>
                <InteractiveResult result={result}>{result.title}</InteractiveResult>
              </h2>
              <p>{result.excerpt}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}