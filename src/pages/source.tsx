import { helpers } from "deno-static/mod.ts";

import { SiteConfig } from "../config.ts";
import { paths } from "../paths.ts";
import { Article, ArticleSource } from "../types.ts";

import { BaseLayout } from "./_layouts.tsx";
import { ArticleList } from "./_components.tsx";

type SourcePageProps = {
  source: ArticleSource;
  articles: ReadonlyArray<Article>;
};

export const SourcePage: React.FC<SourcePageProps> = ({ source, articles }) => {
  return (
    <BaseLayout
      title={`${source.name} - ${SiteConfig.title}`}
      url={paths.source(source.name)}
    >
      <main>
        <header>
          <h1>{SiteConfig.title}</h1>
          <p>
            Viewing articles for <strong>{source.name}</strong>
          </p>
          <p>
            <a href={helpers.url(paths.index())}>Back to all articles</a>
          </p>
        </header>
        <ArticleList articles={articles} />
      </main>
    </BaseLayout>
  );
};
