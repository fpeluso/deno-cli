import { parse } from "https://deno.land/std@0.73.0/flags/mod.ts";
import {
  ensureDir,
  existsSync,
  moveSync,
} from "https://deno.land/std@0.73.0/fs/mod.ts";
import { format } from "https://deno.land/std/datetime/mod.ts";

const { args: [name] } = Deno;

async function createProject(name: string) {
  console.log(`creating project ${name}...`);
  // ensureDir(`./${name}`);
  if (existsSync("./FAAL-WEB")) {
    moveSync(
      `./FAAL-WEB`,
      `./FAAL-WEB_${format(new Date(), "dd-MM-yyyy-hh-mm-ss")}`,
    );
  }
  const cloneRepo = Deno.run({
    cmd: ["git", "clone", "https://github.com/fpeluso/FAAL-WEB.git"],
  });
  const { code } = await cloneRepo.status();
  cloneRepo.close();
  if (existsSync(`./${name}`)) {
    moveSync(
      `./${name}`,
      `./${name}_${format(new Date(), "dd-MM-yyyy-hh-mm-ss")}`,
    );
  }
  moveSync(
    `./FAAL-WEB`,
    `./${name}`,
  );
}

try {
  createProject(name);
} catch {
  console.log("wtf?");
}
