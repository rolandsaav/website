import { promises as fs } from "fs";
import { marked } from "marked";
export default async function Page() {
  const file = await fs.readFile(process.cwd() + "/markdown/TEST.md", "utf8");
  const html = await marked(file);
  return (
    <div className="wrapper flex-col">
      <div className="title">Background</div>
      <div className="prose">This page is coming soon.</div>
    </div>
  );
}
