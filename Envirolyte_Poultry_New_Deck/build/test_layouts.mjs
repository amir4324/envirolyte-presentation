import { FileBlob, PresentationFile } from "@oai/artifact-tool";
const p = await PresentationFile.importPptx(await FileBlob.load("C:/Users/LENOVO/My Drive/Desktop - Lenovo/Projects/envirolyte/Powerpoint/Envirolyte_Poultry_New_Deck/build/source-deck.pptx"));
for (let i = 0; i < p.slides.items.length; i++) {
  try {
    const blob = await p.export({ slide: p.slides.items[i], format: "layout" });
    await blob.text();
    console.log(`${i + 1}:ok`);
  } catch (error) {
    console.log(`${i + 1}:FAIL:${error.message}`);
  }
}
