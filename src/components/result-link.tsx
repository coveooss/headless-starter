import { Result } from "@coveo/headless";
import { FunctionComponent } from "react";

interface LinkProps {
  result: Result;
}

export const ResultLink: FunctionComponent<LinkProps> = (props) => {
  return (
    <a href={props.result.clickUri} style={{color: '#00ADFF'}}>
      {props.children}
    </a>
  );
}