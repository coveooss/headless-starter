import {SearchBox as HeadlessSearchBox} from '@coveo/headless';
import {FunctionComponent, useEffect, useState} from 'react';

interface SearchBoxProps {
  controller: HeadlessSearchBox;
}

export const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);
  const [focused, setFocused] = useState(false);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const suggestionStyle = {
    cursor: 'pointer',
  };

  return (
    <div className="search-box">
      <input
        value={state.value}
        onChange={(e) => controller.updateText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            controller.submit();
          } else if (e.key === 'Escape') {
            controller.clear();
            (e.target as HTMLInputElement).blur();
          }
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button onClick={() => controller.submit()}>Search</button>
      <button onClick={() => controller.clear()}>Clear</button>
      {focused && state.suggestions.length > 0 && (
        <ul>
          {state.suggestions.map((suggestion) => {
            return (
              <li
                style={suggestionStyle}
                key={suggestion.rawValue}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => controller.selectSuggestion(suggestion.rawValue)}
                dangerouslySetInnerHTML={{__html: suggestion.highlightedValue}}
              ></li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
