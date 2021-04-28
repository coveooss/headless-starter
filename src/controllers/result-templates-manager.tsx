import {
  ResultTemplatesManager,
  Result,
  buildResultTemplatesManager,
  ResultTemplatesHelpers,
} from '@coveo/headless';
import {InteractiveResult} from '../components/interactive-result';
import {headlessEngine} from '../engine';

export const resultTemplatesManager: ResultTemplatesManager<
  (result: Result) => JSX.Element
> = buildResultTemplatesManager(headlessEngine);

resultTemplatesManager.registerTemplates(
  {
    conditions: [],
    fields: ['date'],
    content: (result: Result) => (
      <li key={result.uniqueId}>
        <article>
          <h2>
            <InteractiveResult result={result}>
              {result.title}
            </InteractiveResult>
          </h2>
          <p>{result.excerpt}</p>
          {result.raw.date && (
            <p>Last Modified: {new Date(result.raw.date).toLocaleString()}</p>
          )}
        </article>
      </li>
    ),
  },
  {
    priority: 1,
    conditions: [
      ResultTemplatesHelpers.fieldMustMatch('sourcetype', ['YouTube']),
    ],
    content: (result: Result) => (
      <li key={result.uniqueId}>
        <article className="youtube-result">
          <div>
            <h2>
              <InteractiveResult result={result}>
                {result.title}
              </InteractiveResult>
            </h2>
            <p>{result.excerpt}</p>
          </div>
          <div>
            <img
              src={result.raw.ytthumbnailurl as string}
              alt="Thumbnail"
            ></img>
          </div>
          <div>
            {(result.raw.ytvideoduration as number) && (
              <p>
                Length: {formatSeconds(result.raw.ytvideoduration as number)}
              </p>
            )}
            {(result.raw.ytlikecount as number) && (
              <p>Likes: {result.raw.ytlikecount}</p>
            )}
          </div>
        </article>
      </li>
    ),
    fields: ['ytthumbnailurl', 'ytvideoduration', 'ytlikecount'],
  },
  {
    priority: 1,
    conditions: [
      ResultTemplatesHelpers.fieldMustMatch('sourcetype', ['GoogleDrive']),
    ],
    content: (result: Result) => (
      <li key={result.uniqueId}>
        <article>
          <h2>
            <InteractiveResult result={result}>
              {result.title}
            </InteractiveResult>
          </h2>
          <p>{result.excerpt}</p>
          {result.raw.date && (
            <p>Last Modified: {new Date(result.raw.date).toLocaleString()}</p>
          )}
          {result.raw.size && (
            <p>File Size: {(result.raw.size / 1000000).toFixed(2)} MB</p>
          )}
        </article>
      </li>
    ),
    fields: ['date', 'size'],
  }
);

function formatSeconds(seconds: number) {
  const date = new Date(seconds * 1000).toISOString();
  return seconds < 3600 ? date.substr(14, 5) : date.substr(11, 8);
}
