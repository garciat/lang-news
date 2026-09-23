import { directory, index, json, jsx, site, treeMap } from "deno-static/mod.ts";

import { sources } from "./config.ts";
import { readFeeds } from "./feeds.ts";
import { paths } from "./paths.ts";
import { ArticleStorageSchema } from "./types.ts";

import { HomePage } from "./pages/home.tsx";
import { SourcesPage } from "./pages/sources.tsx";
import { SourcePage } from "./pages/source.tsx";
import { readUpdateCronExpr } from "./data.ts";

const feeds = await readFeeds(sources);

const updateCronExpr = await readUpdateCronExpr();

await site(() => ({
  [index]: jsx(<HomePage feeds={feeds} updateCronExpr={updateCronExpr} />),
  [paths.slugs.sources]: {
    [index]: jsx(<SourcesPage feeds={feeds} />),
  },
  [paths.slugs.source]: treeMap(
    feeds.sources,
    (source) => source.source.name,
    (source) => ({
      [index]: jsx(
        <SourcePage
          key={source.source.name}
          source={source.source}
          articles={source.result.articles}
        />,
      ),
    }),
  ),
  [paths.slugs.storage]: json(
    ArticleStorageSchema.encode({
      version: 2,
      result: feeds,
    }),
  ),
  [paths.slugs.assets]: directory(import.meta.resolve("./assets/")),
}));
