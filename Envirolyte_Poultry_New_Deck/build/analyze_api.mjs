import { FileBlob, PresentationFile } from "@oai/artifact-tool";
const p = await PresentationFile.importPptx(await FileBlob.load("C:/Users/LENOVO/My Drive/Desktop - Lenovo/Projects/envirolyte/Powerpoint/Envirolyte_Poultry_New_Deck/build/source-deck.pptx"));
for (const n of [1,3,5,9,10,11,12,13,19,21,24]) {
  const s = p.slides.items[n-1];
  console.log("SLIDE", n, Object.getOwnPropertyNames(Object.getPrototypeOf(s)).sort());
  console.log("SHAPES", s.shapes?.items?.length, "IMAGES", s.images?.items?.length, "NOTES", !!s.speakerNotes);
  if (s.shapes?.items?.[0]) console.log("SHAPE_KEYS", Object.getOwnPropertyNames(Object.getPrototypeOf(s.shapes.items[0])).sort());
}
console.log("P", Object.getOwnPropertyNames(Object.getPrototypeOf(p)).sort());
