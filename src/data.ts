import z from "@zod/zod";
import { parse } from "jsr:@std/yaml@1.2.0";

const WorkflowSchema = z.object({
  on: z.object({
    schedule: z.tuple([
      z.object({ cron: z.string() }),
    ]),
  }),
});

export async function readUpdateCronExpr() {
  const text = await moduleText(
    import("../.github/workflows/deploy.yml", { with: { type: "text" } }),
  );

  const workflow = WorkflowSchema.parse(parse(text));

  return workflow.on.schedule[0].cron;
}

async function moduleText(fut: Promise<{ default: string }>): Promise<string> {
  return (await fut).default;
}
