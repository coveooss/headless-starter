import {Pager as HeadlessPager} from '@coveo/headless';
import {FunctionComponent, useEffect, useState} from 'react';

interface PagerProps {
  controller: HeadlessPager;
}

export const Pager: FunctionComponent<PagerProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), [
    controller,
  ]);

  return (
    <nav className="pager">
      {state.currentPages.map((page) => (
        <button
          key={page}
          disabled={controller.isCurrentPage(page)}
          onClick={() => controller.selectPage(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};
