import { SearchBox as HeadlessSearchBox } from '@coveo/headless';
import { FunctionComponent, useEffect, useState } from 'react';

interface SearchBoxProps {
  controller: HeadlessSearchBox;
}

export const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);
  const isEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter';

  useEffect(() => controller.subscribe(() => setState(controller.state)), [controller]);

  return (
    <div className="search-box">
      <input
        value={state.value}
        onChange={(e) => controller.updateText(e.target.value)}
        onKeyDown={(e) => isEnterKey(e) && controller.submit()}
      />
      <ul>
        {state.suggestions.map((suggestion) => {
          return (
            <li
              key={suggestion.rawValue}
              onClick={() => controller.selectSuggestion(suggestion.rawValue)}
              dangerouslySetInnerHTML={{__html: suggestion.highlightedValue}}>
            </li>
          );
        })}
      </ul>
    </div>
  );
}