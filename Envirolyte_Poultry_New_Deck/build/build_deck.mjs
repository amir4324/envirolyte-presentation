import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const ROOT = "C:/Users/LENOVO/My Drive/Desktop - Lenovo/Projects/envirolyte/Powerpoint/Envirolyte_Poultry_New_Deck";
const BUILD = `${ROOT}/build`;
const FINAL = `${ROOT}/Envirolyte_Poultry_Industry_2026.pptx`;
const MEDIA = `${BUILD}/media-raster`;
const ASSET = `${BUILD}/assets`;

const C = {
  bg: "#F4F7F6", navy: "#12324A", green: "#78B82A", lime: "#A6CE39",
  aqua: "#00B8D4", orange: "#C55A2A", dark: "#1F2933", gray: "#657786",
  pale: "#E8F0EC", white: "#FFFFFF", red: "#D64545", black: "#101820",
};
const lineNone = { style: "solid", fill: "#00000000", width: 0 };

async function bytes(file) {
  const b = await fs.readFile(file);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}

function rect(slide, x, y, w, h, fill, radius = "roundRect", stroke = fill, sw = 0, name) {
  return slide.shapes.add({ geometry: radius, name, position: { left: x, top: y, width: w, height: h }, fill, line: { style: "solid", fill: stroke, width: sw } });
}

function text(slide, value, x, y, w, h, size = 24, color = C.dark, bold = false, align = "left", name) {
  const s = slide.shapes.add({ geometry: "textbox", name, position: { left: x, top: y, width: w, height: h }, fill: "#00000000", line: lineNone });
  s.text = value;
  s.text.style = { fontSize: size, typeface: "Aptos", color, bold, alignment: align, verticalAlignment: "middle", autoFit: "shrinkText", insets: { left: 0, right: 0, top: 0, bottom: 0 } };
  return s;
}

function title(slide, value, kicker) {
  if (kicker) text(slide, kicker.toUpperCase(), 174, 25, 600, 25, 14, C.green, true, "left", "section-kicker");
  text(slide, value, 174, 52, 1030, 82, 38, C.navy, true, "left", "slide-title");
  rect(slide, 174, 139, 68, 5, C.aqua, "rect", C.aqua, 0, "title-accent");
}

function footer(slide, n) {
  text(slide, "ENVIROLYTE  •  POULTRY BIOSECURITY", 174, 685, 520, 18, 10, C.gray, true, "left", "footer-label");
  text(slide, String(n).padStart(2, "0"), 1175, 681, 45, 22, 12, C.green, true, "right", "page-number");
}

function fresh(slide) {
  for (const el of [...slide.elements.items]) el.delete();
  slide.background.fill = C.bg;
  rect(slide, 0, 0, 92, 720, C.navy, "rect", C.navy, 0, "brand-rail-dark");
  rect(slide, 66, 0, 26, 720, C.green, "rect", C.green, 0, "brand-rail-green");
  rect(slide, 92, 0, 12, 720, C.aqua, "rect", C.aqua, 0, "brand-rail-aqua");
}

async function addImage(slide, file, x, y, w, h, fit = "cover", geometry = "roundRect", radius = 22, alt = "") {
  return slide.images.add({ blob: await bytes(file), contentType: file.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg", alt, fit, geometry, borderRadius: radius, position: { left: x, top: y, width: w, height: h } });
}

function note(slide, sources) {
  slide.speakerNotes.textFrame.setText(["[Sources]", ...sources.map((s) => `- ${s}`), "[/Sources]"]);
  slide.speakerNotes.setVisible(true);
}

function iconCircle(slide, label, x, y, accent = C.green, size = 44) {
  rect(slide, x, y, size, size, accent, "ellipse", accent, 0);
  text(slide, label, x, y, size, size, 18, C.white, true, "center");
}

const p = await PresentationFile.importPptx(await FileBlob.load(`${BUILD}/template-starter.pptx`));
const s = p.slides.items;

// 1 Cover
fresh(s[0]);
await addImage(s[0], `${MEDIA}/image2.jpeg`, 640, 0, 640, 720, "cover", "rect", 0, "Healthy poultry flock on grass — source presentation");
rect(s[0], 586, 0, 150, 720, { type: "gradient", gradientKind: "linear", angleDeg: 0, stops: [{ offset: 0, color: "#F4F7F600" }, { offset: 100000, color: C.bg }] }, "rect", "#00000000", 0);
await addImage(s[0], `${MEDIA}/image3.png`, 174, 70, 300, 85, "contain", "rect", 0, "Envirolyte logo from source presentation");
text(s[0], "A Complete Water Treatment & Disinfection Solution for the Poultry Industry", 174, 195, 520, 250, 45, C.navy, true, "left", "cover-title");
text(s[0], "STERILIZATION  •  DISINFECTION  •  WATER PURIFICATION", 174, 475, 510, 40, 16, C.green, true, "left");
text(s[0], "For safer operations, healthier birds, and better farm performance.", 174, 530, 480, 78, 23, C.dark, false, "left");
text(s[0], "POULTRY INDUSTRY", 174, 644, 300, 24, 12, C.gray, true, "left");
note(s[0], ["User-supplied Envirolyte poultry presentation, slide 1 and extracted media image2.jpeg / image3.png."]);

// 2 Challenge
fresh(s[1]); title(s[1], "Disease Is Not Only a Health Problem — It Is a Business Problem", "The challenge");
await addImage(s[1], `${ASSET}/barn-disinfection.jpg`, 710, 165, 510, 455, "cover", "roundRect", 26, "Worker disinfecting a poultry barn");
text(s[1], "Diseases and infections create compounding operational pressure across every production cycle.", 174, 170, 480, 80, 24, C.dark, false);
const chall = [["MORTALITY", "Higher flock losses"], ["MEDICATION", "More treatment requirements"], ["EFFICIENCY", "Lower operational performance"], ["WATER", "Continuous contamination risk"], ["BIOSECURITY", "Persistent pressure on people and assets"]];
chall.forEach((d,i)=>{ iconCircle(s[1], String(i+1), 174, 278+i*68, i===0?C.orange:C.green, 38); text(s[1], d[0], 226, 275+i*68, 155, 26, 14, C.navy, true); text(s[1], d[1], 380, 275+i*68, 270, 28, 17, C.gray, false); });
footer(s[1],2); note(s[1],["User-supplied Envirolyte poultry presentation, slide 3.","Barn disinfection image: https://khodulieu.sohoa.tuyenquang.gov.vn/congthongtin/media/a1224789b63d95aeeca2144c8502ffc8.jpg"]);

// 3 Gap
fresh(s[2]); title(s[2], "Traditional Disinfection Solves Isolated Problems. Farms Need a Complete System.", "The gap");
text(s[2], "Effective biosecurity must cover the entire contamination journey — not one chemical or one location.", 174, 160, 980, 54, 23, C.dark, false);
const pathLabels = [["WATER","Daily intake"],["BARNS","Living environment"],["EQUIPMENT","Contact surfaces"],["WORKERS","Movement & hygiene"],["VEHICLES","Farm access"]];
for(let i=0;i<5;i++){ const x=174+i*205; if(i<4) rect(s[2], x+124, 322, 82, 5, C.aqua, "rect", C.aqua, 0); iconCircle(s[2], String(i+1), x, 290, i===0?C.aqua:C.green, 72); text(s[2], pathLabels[i][0], x-18, 385, 110, 25, 15, C.navy, true, "center"); text(s[2], pathLabels[i][1], x-28, 418, 130, 48, 15, C.gray, false, "center"); }
rect(s[2],174,510,980,78,C.navy,"roundRect",C.navy,0); text(s[2],"One weak point can reintroduce risk across the full operation.",210,522,910,48,26,C.white,true,"center");
footer(s[2],3); note(s[2],["User-supplied 15-slide presentation structure, slide 3."]);

// 4 Solution
fresh(s[3]); title(s[3], "Envirolyte Extends Water Treatment Into Farm-Wide Biosecurity", "The solution");
await addImage(s[3], `${MEDIA}/image14.png`, 744, 172, 476, 405, "cover", "roundRect", 26, "Envirolyte generator and storage installation from source deck");
text(s[3], "A comprehensive, eco-conscious and cost-focused program — generated on site and applied where the farm needs it.", 174, 170, 500, 100, 25, C.dark, false);
const apps=["Drinking water treatment","Barn disinfection","Microbial control","Farm sanitation","Less dependence on conventional chemicals"];
apps.forEach((a,i)=>{rect(s[3],174,305+i*54,14,14,i===4?C.orange:C.green,"ellipse",i===4?C.orange:C.green,0);text(s[3],a,204,294+i*54,450,36,18,C.navy,i===4);});
footer(s[3],4); note(s[3],["User-supplied Envirolyte poultry presentation, slides 4 and 7.","Official technology overview: https://envirolyte.com/technology/"]);

// 5 How it works
fresh(s[4]); title(s[4], "Generated On-Site Using Only Salt, Water & Electricity", "How it works");
text(s[4], "A conditioned brine solution passes through a diaphragmatic electrolysis cell to create fresh active solutions close to the point of use.",174,158,990,70,22,C.dark,false);
const steps=[{n:"01",t:"WATER",d:"Conditioned feed water"},{n:"02",t:"SALT",d:"Sodium chloride brine"},{n:"03",t:"ELECTRICITY",d:"Controlled current"},{n:"04",t:"ENVIROLYTE",d:"Diaphragmatic cell"},{n:"05",t:"ANOLYTE",d:"Disinfection solution"}];
steps.forEach((a,i)=>{const x=150+i*218; if(i<4) rect(s[4],x+150,355,68,4,C.aqua,"rect",C.aqua,0); rect(s[4],x,278,150,150,i===4?C.navy:C.white,"roundRect",i===4?C.navy:"#D8E4DF",1); text(s[4],a.n,x+18,292,50,28,14,i===4?C.aqua:C.green,true); text(s[4],a.t,x+18,330,115,32,18,i===4?C.white:C.navy,true); text(s[4],a.d,x+18,373,115,40,14,i===4?"#DDEBF1":C.gray,false);});
rect(s[4],174,500,980,86,C.pale,"roundRect",C.pale,0); text(s[4],"Fresh generation on demand reduces reliance on transported and stored disinfectants.",210,516,910,48,24,C.navy,true,"center");
footer(s[4],5); note(s[4],["Official Envirolyte electrochemical activation: https://envirolyte.com/technology/electrochemical-activation/","Official Envirolyte technology overview: https://envirolyte.com/technology/"]);

// 6 Outputs
fresh(s[5]); title(s[5], "Two Electrolyzed Solutions. Two Different Functions.", "System outputs");
const cols=[{x:174,c:C.aqua,n:"ANOLYTE",role:"DISINFECTION",desc:"Oxidizing solution used for microbial control, water treatment and sanitation."},{x:705,c:C.green,n:"CATHOLYTE",role:"CLEANING & DEGREASING",desc:"Alkaline reducing solution used for washing, cleaning support and process applications."}];
cols.forEach((a,i)=>{rect(s[5],a.x,190,455,378,C.white,"roundRect","#D8E4DF",1); rect(s[5],a.x,190,455,16,a.c,"rect",a.c,0); iconCircle(s[5],i===0?"A":"C",a.x+30,234,a.c,62); text(s[5],a.n,a.x+115,230,290,42,32,C.navy,true); text(s[5],a.role,a.x+30,325,380,32,18,a.c,true); text(s[5],a.desc,a.x+30,375,380,105,22,C.dark,false); text(s[5],i===0?"Broad-spectrum germicidal function":"Detergent / degreasing function",a.x+30,505,380,32,15,C.gray,true);});
footer(s[5],6); note(s[5],["User-supplied Envirolyte poultry presentation, slide 7.","Official electrolysed water solutions: https://envirolyte.com/technology/electrolyzed-water/"]);

// 7 Applications
fresh(s[6]); title(s[6], "One Technology. Multiple Poultry Applications.", "Across the farm");
await addImage(s[6], `${ASSET}/modern-poultry-water.jpg`, 650, 165, 570, 470, "cover", "roundRect", 26, "Modern poultry drinking system");
const use=["Drinking water systems","Barn air — fogging","Barn floors","Hatcheries","Chiller water","Staff hands & feet","Vehicles and access points"];
use.forEach((a,i)=>{iconCircle(s[6],String(i+1),174,170+i*62,i===0?C.aqua:C.green,38);text(s[6],a,226,166+i*62,380,38,18,C.navy,i===0);});
footer(s[6],7); note(s[6],["User-supplied Envirolyte poultry presentation, slide 11.","Official poultry application page: https://envirolyte.com/applications/poultry-farming/","Modern drinking system image: https://cdn.bigdutchman.com/fileadmin/content/poultry/press/photos/Broiler-Elterntierhaltung-Broiler-breeder-management-Traenke-2-Big-Dutchman.jpg"]);

// 8 Performance
fresh(s[7]); title(s[7], "Cleaner Operations Can Translate Into Better Farm Performance", "Reported impact");
text(s[7],"Benefits reported in the supplied Envirolyte material",174,155,700,35,17,C.gray,false);
const metrics=[{v:"50%",l:"Lower mortality rate"},{v:"70%",l:"Fewer medications"},{v:"BETTER",l:"Feed utilization"},{v:"FASTER",l:"Weight gain"}];
metrics.forEach((m,i)=>{const x=174+(i%2)*490,y=220+Math.floor(i/2)*175;rect(s[7],x,y,455,145,i===0?C.navy:C.white,"roundRect",i===0?C.navy:"#D8E4DF",1);text(s[7],m.v,x+25,y+20,180,56,i===0?43:35,i===0?C.white:(i===1?C.orange:C.green),true);text(s[7],m.l,x+210,y+30,215,60,20,i===0?"#E6F2F6":C.navy,true);});
rect(s[7],174,585,945,55,C.pale,"roundRect",C.pale,0);text(s[7],"The supplied material also reports destruction of germs and activity against pathogens including Salmonella and E. coli.",198,594,900,38,15,C.gray,false,"center");
footer(s[7],8); note(s[7],["User-supplied Envirolyte poultry presentation, slide 9. Performance figures are presented as reported claims in the supplied material.","Official poultry application context: https://envirolyte.com/applications/poultry-farming/"]);

// 9 Business case
fresh(s[8]); title(s[8], "This Is More Than Disinfection — It Is an Operational Cost Decision", "Business case");
const models=[{x:174,t:"CONVENTIONAL CHEMICAL MODEL",c:C.orange,flow:"Purchase  →  Transport  →  Store  →  Handle  →  Repeat",bul:["Transport & storage burden","Leak and handling exposure","Cost tied to recurring purchases"]},{x:705,t:"ENVIROLYTE MODEL",c:C.green,flow:"Generate On-Site  →  Dose  →  Use When Needed",bul:["Low generation cost","Reduced transportation","Potentially steadier cost structure"]}];
models.forEach((a,i)=>{rect(s[8],a.x,190,455,400,C.white,"roundRect","#D8E4DF",1);rect(s[8],a.x,190,455,14,a.c,"rect",a.c,0);text(s[8],a.t,a.x+25,230,405,40,19,C.navy,true);rect(s[8],a.x+25,295,405,86,i===0?"#F8EDE8":"#EEF6E5","roundRect",i===0?"#F8EDE8":"#EEF6E5",0);text(s[8],a.flow,a.x+45,310,365,56,17,a.c,true,"center");a.bul.forEach((b,j)=>{rect(s[8],a.x+28,420+j*45,11,11,a.c,"ellipse",a.c,0);text(s[8],b,a.x+55,408+j*45,350,34,17,C.dark,false);});});
footer(s[8],9); note(s[8],["User-supplied Envirolyte poultry presentation, slide 12.","Official operational/logistics context: https://envirolyte.com/technology/electrochemical-activation/"]);

// 10 Safety
fresh(s[9]); title(s[9], "Powerful Against Microorganisms. Designed for Safer Operations.", "Safety & sustainability");
const four=[{x:174,n:"SAFETY",c:C.aqua,d:"Simple handling\nNon-hazardous operation"},{x:430,n:"ENVIRONMENT",c:C.green,d:"Lower environmental impact\n100% biodegradable*"},{x:686,n:"PERFORMANCE",c:C.orange,d:"Fast-acting biocide\nLonger residual effect"},{x:942,n:"SIMPLICITY",c:C.navy,d:"Generated on site\nUsed when needed"}];
four.forEach((a,i)=>{iconCircle(s[9],String(i+1),a.x+70,205,a.c,80);text(s[9],a.n,a.x,310,220,35,18,C.navy,true,"center");text(s[9],a.d,a.x,360,220,86,17,C.gray,false,"center");});
rect(s[9],174,500,988,80,C.navy,"roundRect",C.navy,0);text(s[9],"Fast-acting  •  Powerful biocide  •  Simple to handle  •  Non-toxic*  •  Environmentally friendly*",204,515,928,50,21,C.white,true,"center");
text(s[9],"*As described in the supplied Envirolyte material; application and regulatory requirements should be validated locally.",174,602,988,32,12,C.gray,false,"center");
footer(s[9],10); note(s[9],["User-supplied Envirolyte poultry presentation, slide 10. Safety and sustainability statements are reproduced as claims from the supplied material.","Official Envirolyte technology considerations: https://envirolyte.com/technology/"]);

// 11 Markets
fresh(s[10]); title(s[10], "From Qatar to International Poultry Operations", "Selected installations");
await addImage(s[10], `${ASSET}/world-map.png`, 520, 165, 690, 430, "contain", "rect", 0, "World map used to locate example markets");
const countries=[{x:785,y:304,c:"FRANCE",d:"600,000-hen farm"},{x:885,y:335,c:"SERBIA",d:"Slaughterhouse"},{x:934,y:378,c:"IRAN",d:"Nemooneh Gilan / Behparvar"},{x:865,y:430,c:"QATAR",d:"Al-Sulaiteen / Al-Tqawie"}];
countries.forEach((a,i)=>{rect(s[10],a.x,a.y,18,18,i===3?C.orange:C.green,"ellipse",C.white,2);text(s[10],a.c,a.x+28,a.y-5,175,25,15,C.navy,true);text(s[10],a.d,a.x+28,a.y+20,210,38,12,C.gray,false);});
text(s[10],"EXAMPLES IN THE SUPPLIED PRESENTATION",174,195,285,40,15,C.green,true);["Serbia — slaughterhouse","Iran — two installations","France — large hen farm","Qatar — two poultry farms"].forEach((a,i)=>{text(s[10],a,174,255+i*64,300,40,18,C.navy,i===3);});
footer(s[10],11); note(s[10],["User-supplied Envirolyte poultry presentation, slides 15–20.","World map image: https://www.nicepng.com/png/full/170-1706979_file-blankmap-world-svg-wikipedia-for-world-map.png"]);

// 12 Qatar results
fresh(s[11]); title(s[11], "What Did the Farm Achieve?", "Qatar results — as reported");
const q=[{v:"NIL",l:"Antibiotics\n& reduced medication"},{v:"NIL",l:"Conventional disinfectants\n& sterilizers"},{v:"2.5%",l:"Mortality rate"},{v:"1.6–1.7 kg",l:"Average bird weight"},{v:"2.2 kg",l:"Average feed per bird"},{v:"25–27 DAYS",l:"Cycle time"}];
q.forEach((a,i)=>{const x=174+(i%3)*326,y=180+Math.floor(i/3)*205;rect(s[11],x,y,294,175,i<2?C.navy:C.white,"roundRect",i<2?C.navy:"#D8E4DF",1);text(s[11],a.v,x+20,y+24,254,52,i===3?27:35,i<2?C.aqua:(i===2?C.orange:C.green),true,"center");text(s[11],a.l,x+20,y+89,254,62,16,i<2?C.white:C.navy,true,"center");});
text(s[11],"Operational results reported in the supplied presentation; no independent verification was provided.",174,607,946,28,12,C.gray,false,"center");
footer(s[11],12); note(s[11],["User-supplied Envirolyte poultry presentation, slide 21. All metrics are reported results from the supplied material."]);

// 13 Global acceptance
fresh(s[12]); title(s[12], "A Technology With International Market Acceptance", "Global reach");
await addImage(s[12], `${ASSET}/world-map.png`, 174, 185, 620, 350, "contain", "rect", 0, "World map indicating global market reach");
const zones=[{n:"EUROPE",x:835,y:220,c:C.green,d:"Broad commercial acceptance"},{n:"UNITED STATES",x:835,y:345,c:C.aqua,d:"Market presence and use cases"},{n:"GLOBAL",x:835,y:470,c:C.orange,d:"Applications across multiple sectors"}];
zones.forEach((a,i)=>{iconCircle(s[12],String(i+1),a.x,a.y,a.c,56);text(s[12],a.n,a.x+80,a.y-3,260,32,20,C.navy,true);text(s[12],a.d,a.x+80,a.y+35,300,45,17,C.gray,false);});
rect(s[12],174,570,986,62,C.pale,"roundRect",C.pale,0);text(s[12],"System selection and application remain subject to water quality, dosing requirements, capacity and local regulation.",198,581,940,40,16,C.navy,true,"center");
footer(s[12],13); note(s[12],["User-supplied Envirolyte poultry presentation, slide 13.","Official Envirolyte technology and integration considerations: https://envirolyte.com/technology/","World map image: https://www.nicepng.com/png/full/170-1706979_file-blankmap-world-svg-wikipedia-for-world-map.png"]);

// 14 Strategic
fresh(s[13]);
await addImage(s[13], `${MEDIA}/image29.png`, 650, 0, 630, 720, "cover", "rect", 0, "Poultry drinking system at Al-Sulaiteen Farm from source presentation");
rect(s[13],570,0,170,720,{ type:"gradient",gradientKind:"linear",angleDeg:0,stops:[{offset:0,color:"#F4F7F600"},{offset:100000,color:C.bg}]},"rect","#00000000",0);
text(s[13],"THE STRATEGIC MESSAGE",174,65,400,30,14,C.green,true);text(s[13],"Control the Water. Control More of the Farm’s Risk.",174,125,490,190,45,C.navy,true);
text(s[13],"Every bird drinks water. Every day.",174,345,460,45,26,C.aqua,true);
text(s[13],"That makes water one of the most powerful intervention points in poultry production.",174,410,440,95,22,C.dark,false);
rect(s[13],174,550,440,70,C.navy,"roundRect",C.navy,0);text(s[13],"BIOSECURITY  +  EFFICIENCY  +  COST CONTROL",195,563,398,44,17,C.white,true,"center");
footer(s[13],14); note(s[13],["User-supplied Envirolyte poultry presentation, slide 19 and supplied 15-slide structure.","Official poultry application context: https://envirolyte.com/applications/poultry-farming/"]);

// 15 Next step
fresh(s[14]); title(s[14], "Start With an Assessment of Your Farm", "Next step");
await addImage(s[14], `${MEDIA}/image30.png`, 760, 155, 460, 455, "cover", "roundRect", 26, "Envirolyte installation at Al-Tqawie Farm, Qatar");
text(s[14],"Evaluate the operational baseline",174,168,500,38,24,C.navy,true);
const assess=["Drinking water system","Current disinfection procedures","Medication and chemical usage","Mortality levels","Farm sanitation requirements","Potential operational savings"];
assess.forEach((a,i)=>{iconCircle(s[14],"✓",174,225+i*52,i===5?C.orange:C.green,32);text(s[14],a,220,218+i*52,455,40,17,C.dark,i===5);});
rect(s[14],174,560,520,76,C.navy,"roundRect",C.navy,0);text(s[14],"FROM CLEANER WATER  →  SAFER OPERATIONS  →  BETTER POULTRY PERFORMANCE",194,573,480,50,17,C.white,true,"center");
text(s[14],"Raseen Aqua Solutions  •  Doha, Qatar",790,635,410,28,14,C.gray,true,"right");footer(s[14],15);
note(s[14],["User-supplied Envirolyte poultry presentation, slide 20 and supplied 15-slide structure.","Contact details limited to information explicitly present in the supplied material."]);

// Export final + QA artifacts.
await fs.mkdir(`${BUILD}/final-render`, { recursive: true });
await fs.mkdir(`${BUILD}/final-layout`, { recursive: true });
for (let i=0;i<s.length;i++) {
  const n=String(i+1).padStart(2,"0");
  const png=await p.export({slide:s[i],format:"png",scale:1});
  await fs.writeFile(`${BUILD}/final-render/slide-${n}.png`,new Uint8Array(await png.arrayBuffer()));
  const layout=await p.export({slide:s[i],format:"layout"});
  await fs.writeFile(`${BUILD}/final-layout/slide-${n}.layout.json`,await layout.text(),"utf8");
}
const montage=await p.export({format:"webp",montage:true,scale:1});
await fs.writeFile(`${BUILD}/final-montage.webp`,new Uint8Array(await montage.arrayBuffer()));
const pptx=await PresentationFile.exportPptx(p);
await pptx.save(FINAL);
const inspect=await p.inspect({kind:"slide,textbox,shape,image,notes",maxChars:200000});
await fs.writeFile(`${BUILD}/final-inspect.ndjson`,inspect.ndjson||"","utf8");
console.log(JSON.stringify({output:FINAL,slides:s.length,inspectChars:(inspect.ndjson||"").length},null,2));
