import { ensureDir, ensureFile, existsSync, moveSync } from "https://deno.land/std@0.73.0/fs/mod.ts";
import { format } from "https://deno.land/std@0.73.0/datetime/mod.ts";

const { args: [arg0, arg1, arg2, arg3] } = Deno;
let command, type, dir, name;

async function createProject(name: string) {
  console.log(`creating project ${name}...`);
  if (existsSync("./FAAL-WEB")) {
    moveSync( `./FAAL-WEB`, `./FAAL-WEB_${format(new Date(), "dd-MM-yyyy-hh-mm-ss")}`, );
  }
  const cloneRepo = Deno.run({
    cmd: ["git", "clone", "https://github.com/fpeluso/FAAL-WEB.git"],
  });
  const { code } = await cloneRepo.status();
  cloneRepo.close();
  if (existsSync(`./${name}`)) {
    moveSync( `./${name}`, `./${name}_${format(new Date(), "dd-MM-yyyy-hh-mm-ss")}`, );
  }
  moveSync(`./FAAL-WEB`, `./${name}`,);
}

async function createType(type: string, dir: string | undefined, name: string) {
  let newDir = dir ? `./src/${dir}/${name}` : `./src/${name}`;
  let existDir = existsSync(newDir);
  if(existDir){
    console.log(`a folder named ${newDir} already exists`);
    return;
  }
  ensureDir(newDir);
  ensureFile(`${newDir}/${name}${type.substring(0,1).toUpperCase()}${type.substring(1)}.ts`);

}

try {
  switch (Deno.args.length) {
    case 2:
      command = arg0;
      name = arg1;
      break;
    case 3:
      command = arg0;
      type = arg1;
      name = arg2;
      break;
    case 4:
      command = arg0;
      type = arg1;
      dir = arg2;
      name = arg3;
      break;
    default:
      console.log(`invalid parameters`);
      throw "invalid parameters";
  }
  switch (command) {
    case `new`:
      createProject(name);
      break;
    case `create`:
      if(type) {
        createType(type, dir, name);
      } else{
        //this should never happen
        throw "no type specified";
      }
      break;
    default:
      console.log("write some error here!"); //TODO: write some error here!
  }
} catch {
  console.log("wtf?");
}
