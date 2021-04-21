import {SearchBox as HeadlessSearchBox} from '@coveo/headless';
import {FunctionComponent, useEffect, useState} from 'react';

interface SearchBoxProps {
  controller: HeadlessSearchBox;
}

export const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), [
    controller,
  ]);

  const suggestionStyle = {
    cursor: 'pointer',
  };

  return (
    <div className="search-box">
      <input
        value={state.value}
        onChange={(e) => controller.updateText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && controller.submit()}
      />
      <ul>
        {state.suggestions.map((suggestion) => {
          return (
            <li
              style={suggestionStyle}
              key={suggestion.rawValue}
              onClick={() => controller.selectSuggestion(suggestion.rawValue)}
              dangerouslySetInnerHTML={{__html: suggestion.highlightedValue}}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};
