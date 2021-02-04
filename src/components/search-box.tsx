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
    <div style={{minWidth: "50vw"}}>
      <input
        value={state.value}
        onChange={(e) => controller.updateText(e.target.value)}
        onKeyDown={(e) => isEnterKey(e) && controller.submit()}
        style={{minWidth: "100%"}}
      />
    </div>
  );
}