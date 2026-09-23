export const paths = {
  slugs: {
    sources: "sources",
    source: "source",
    assets: "assets",
    storage: "data.json",
  } as const,
  index() {
    return "/" as const;
  },
  sources() {
    return `/${this.slugs.sources}/` as const;
  },
  source(name: string) {
    return `/${this.slugs.source}/${name}/` as const;
  },
  asset(path: `/${string}`) {
    return `/${this.slugs.assets}${path}` as const;
  },
  storage() {
    return `/${this.slugs.storage}` as const;
  },
} as const;
