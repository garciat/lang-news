import { helpers } from "deno-static/mod.ts";

import cronstrue from "npm:cronstrue@3.24.0";

import { SiteConfig } from "../config.ts";
import { paths } from "../paths.ts";
import { ArticlesFetchResult } from "../types.ts";

import { BaseLayout } from "./_layouts.tsx";
import { ArticleList } from "./_components.tsx";

type HomePageProps = {
  feeds: ArticlesFetchResult;
  updateCronExpr: string;
};

export const HomePage: React.FC<HomePageProps> = (
  { feeds, updateCronExpr },
) => {
  const articles = feeds.sources.flatMap((source) => source.result.articles);

  return (
    <BaseLayout title={SiteConfig.title} url={paths.index()}>
      <main>
        <header>
          <h1>{SiteConfig.title}</h1>
          <p>
            Aggregated news from several official programming language/platform
            {" "}
            <a href={helpers.url(paths.sources())}>sources</a>.
          </p>
          <p>
            <small style={{ opacity: "0.7" }}>
              This feed is updated{" "}
              <a href="https://github.com/Garciat/lang-news/blob/main/.github/workflows/deploy.yml">
                {cronstrue.toString(updateCronExpr).toLowerCase()}
              </a>. Last update:{" "}
              <relative-time datetime={feeds.fetchedAt.toString()}>
                {new Date(feeds.fetchedAt.epochMilliseconds).toUTCString()}
              </relative-time>
            </small>
          </p>
        </header>
        <ArticleList articles={articles} />
      </main>
    </BaseLayout>
  );
};
