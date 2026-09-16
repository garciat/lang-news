import { helpers } from "deno-static/mod.ts";

import { RelativeTimeElement } from "npm:@github/relative-time-element@5.3.1";

import { Intern } from "lib/intern.ts";

import { paths } from "../paths.ts";
import { Article } from "../types.ts";

declare module "npm:react" {
  namespace JSX {
    interface IntrinsicElements {
      "relative-time":
        & React.DetailedHTMLProps<
          React.HTMLAttributes<RelativeTimeElement>,
          RelativeTimeElement
        >
        & Partial<Omit<RelativeTimeElement, keyof HTMLElement>>;
    }
  }
}

type ArticleListProps = {
  articles: ReadonlyArray<Article>;
};

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const articlesByYearMonth = Map.groupBy(
    articles
      .filter(
        (article) => article.date.toZonedDateTimeISO("UTC").year >= 2026,
      )
      .toSorted(
        (a, b) => Temporal.Instant.compare(b.date, a.date),
      ),
    (article) =>
      Intern.PlainYearMonth.from(
        article.date
          .toZonedDateTimeISO("UTC")
          .toPlainDate()
          .toPlainYearMonth(),
      ),
  );

  return (
    <div className="article-list">
      {articlesByYearMonth
        .entries()
        .toArray()
        .map(([yearMonth, articles]) => (
          <section key={yearMonth.toString()}>
            <header>
              <h3>
                {yearMonth.toPlainDate({ day: 1 })
                  .withCalendar("gregory")
                  .toPlainYearMonth()
                  .toLocaleString("en-US", { dateStyle: "full" })}{" "}
                <small>{articles.length} articles</small>
              </h3>
            </header>
            {articles.map((article) => (
              <article key={article.guid} style={{ margin: "1.5em 0" }}>
                <header>
                  <small>
                    <strong>
                      <a href={helpers.url(paths.source(article.source))}>
                        {article.source}
                        {" ↗"}
                      </a>
                    </strong>
                  </small>
                  {" • "}
                  <small>
                    <time
                      dateTime={article.date.toString()}
                      title={article.date.toString()}
                    >
                      {article.date.toZonedDateTimeISO("UTC")
                        .toLocaleString("en-GB", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                    </time>
                  </small>
                </header>
                <div>
                  <a href={article.link.toString()} rel="nofollow">
                    {article.title}
                  </a>
                </div>
              </article>
            ))}
          </section>
        ))}
    </div>
  );
};
