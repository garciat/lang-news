import { helpers } from "deno-static/mod.ts";

import { SiteConfig } from "../config.ts";
import { paths } from "../paths.ts";
import { ArticlesFetchResult } from "../types.ts";

import { BaseLayout } from "./_layouts.tsx";
import { ArticleList } from "./_components.tsx";

type HomePageProps = {
  feeds: ArticlesFetchResult;
};

export const HomePage: React.FC<HomePageProps> = ({ feeds }) => {
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
            <small style={{ opacity: "0.5" }}>
              This feed is updated{" "}
              <abbr title="best-effort by free GitHub Actions">~hourly</abbr>.
              Last update:{" "}
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
