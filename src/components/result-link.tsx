import { Result } from "@coveo/headless";
import { FunctionComponent } from "react";

interface LinkProps {
  result: Result;
}

export const ResultLink: FunctionComponent<LinkProps> = (props) => {
  return (
    <a href={props.result.clickUri} className="result-link">
      {props.children}
    </a>
  );
}