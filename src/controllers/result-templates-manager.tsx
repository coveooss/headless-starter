import { ResultTemplatesManager, Result, buildResultTemplatesManager, ResultTemplatesHelpers } from "@coveo/headless";
import React from "react";
import { ResultLink } from "../components/result-link";
import { headlessEngine } from "../engine";

export const resultTemplatesManager: ResultTemplatesManager<(result: Result) => JSX.Element> = buildResultTemplatesManager(headlessEngine);

resultTemplatesManager.registerTemplates({
  conditions: [],
  content: (result: Result) => (
    <li key={result.uniqueId}>
      <article>
        <h2>
          <ResultLink result={result}>{result.title}</ResultLink>
        </h2>
        <p>{result.excerpt}</p>
      </article>
    </li>
  )
}, {
  priority: 1,
  conditions:[ResultTemplatesHelpers.fieldMustMatch("sourcetype", ["YouTube"])],
  content: (result: Result) => (
    <li key={result.uniqueId}>
      <article className="youtube-result">
        <div>
          <h2>
            <ResultLink result={result}>{result.title}</ResultLink>
          </h2>
          <p>{result.excerpt}</p>
        </div>
        <div><img src={ResultTemplatesHelpers.getResultProperty(result, "ytthumbnailurl") as string} alt="Thumbnail"></img></div>
      </article>
    </li>
  ),
  fields: ["ytthumbnailurl"]
});