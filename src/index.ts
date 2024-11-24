import { Parser } from "./parser";

const path = "./src/testowy.txt";
const file = Bun.file(path);

const text = await file.text();

const parser = new Parser();
console.log("Rozpoczynanie");

// console.log(JSON.stringify(parser.parse(text), undefined, 2));
console.log(parser
    .parse(text)
    .map(x => {
        if (x.type != "paragraph") return;
        return x.text;
    })
    .flat()
    .map(x => {
        if (x?.type == "text") return x.value;
        if (x?.type == "styledText") {
            const borders = x.baseStyle;
            return `<${borders}>${x.text}</${borders}>`
        }
    }).join("")
);