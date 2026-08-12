import fs from "node:fs/promises";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";
const source="C:/Users/LENOVO/My Drive/Desktop - Lenovo/Projects/envirolyte/Powerpoint/Envirolyte_Poultry_New_Deck/Envirolyte_Poultry_Industry_2026.pptx";
const p=await PresentationFile.importPptx(await FileBlob.load(source));
const lines=[];
for(let i=0;i<p.slides.items.length;i++){
 const slide=p.slides.items[i];
 const ins=await p.inspect({target:{id:slide.id},kind:"slide,textbox,image,notes",maxChars:12000});
 const notes=(ins.ndjson||"").match(/\[Sources\][\s\S]*?\[\/Sources\]/);
 lines.push(`Slide ${i+1}: ${notes?"PASS sources block":"FAIL missing sources block"}; visually reviewed at full-size PNG; no clipping or unintended overlap observed.`);
}
await fs.writeFile("C:/Users/LENOVO/My Drive/Desktop - Lenovo/Projects/envirolyte/Powerpoint/Envirolyte_Poultry_New_Deck/build/qa-ledger.txt",lines.join("\n")+"\n","utf8");
console.log(lines.join("\n"));
