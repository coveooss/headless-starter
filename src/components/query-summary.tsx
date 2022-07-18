import {FunctionComponent, useEffect, useState} from 'react';
import {
  QuerySummary as HeadlessQuerySummary,
  QuerySummaryState,
} from '@coveo/headless';

interface QuerySummaryProps {
  controller: HeadlessQuerySummary;
}

function renderNoResults() {
  return <span>No results</span>;
}

function renderBold(input: string) {
  return (
    <span>
      <strong>{input}</strong>
    </span>
  );
}

function renderRange(state: QuerySummaryState) {
  return renderBold(` ${state.firstResult}-${state.lastResult}`);
}

function renderTotal(state: QuerySummaryState) {
  return <span> of {renderBold(state.total.toString())}</span>;
}

function renderQuery(state: QuerySummaryState) {
  if (state.hasQuery) {
    return <span> for {renderBold(state.query)}</span>;
  }
  return <></>;
}

function renderDuration(state: QuerySummaryState) {
  return ` in ${state.durationInSeconds} seconds`;
}
function renderHasResults(state: QuerySummaryState) {
  return (
    <div className="query-summary">
      <span>
        Results{renderRange(state)}
        {renderTotal(state)}
        {renderQuery(state)}
        {renderDuration(state)}
      </span>
    </div>
  );
}
export const QuerySummary: FunctionComponent<QuerySummaryProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), [
    controller,
  ]);

  if (!props.controller.state.hasResults) {
    return renderNoResults();
  }
  return renderHasResults(props.controller.state);
};
