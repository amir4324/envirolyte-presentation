import fs from "node:fs/promises";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const source = "C:/Users/LENOVO/My Drive/Desktop - Lenovo/Projects/envirolyte/Powerpoint/Envirolyte_Poultry_New_Deck/build/source-deck.pptx";
const out = "C:/Users/LENOVO/My Drive/Desktop - Lenovo/Projects/envirolyte/Powerpoint/Envirolyte_Poultry_New_Deck/build/template-inspect/template-inspect.ndjson";
const presentation = await PresentationFile.importPptx(await FileBlob.load(source));
const inspection = await presentation.inspect({
  kind: "slide,textbox,shape,image,table,chart,notes,layout",
  maxChars: 300000,
});
await fs.mkdir(new URL("./template-inspect/", import.meta.url), { recursive: true });
await fs.writeFile(out, inspection.ndjson || "", "utf8");
console.log(JSON.stringify({ slides: presentation.slides.items.length, chars: (inspection.ndjson || "").length, truncated: inspection.truncated }));
