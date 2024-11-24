import Graphemer from "graphemer";
import { BaseTextStyle, type Block, type Paragraph, type RichText, type StyledText } from "./syntaxTokens";
import type GraphemerIterator from "graphemer/lib/GraphemerIterator";

export class Parser {
    text: string[] = [];
    carret: number = 0;

    isBold = false;


    private lookup(text: string) {
        const splitter = new Graphemer();
        const chars = splitter.splitGraphemes(text);


        for (let i = 0; i < chars.length; i++) {
            const lookup = this.carret + 1 + i;

            if (lookup >= this.text.length) return false;
            if (chars[i] != this.text[lookup]) return false;
        }

        return true;
    }

    private advance(steps: number = 1) {
        this.carret += steps;
        return this.carret < this.text.length;
    }

    parse(text: string): Block[] {
        const splitter = new Graphemer();
        this.text = splitter.splitGraphemes(text);

        const blocks = [];
        while (this.carret < this.text.length) {
            blocks.push(this.parseBlock());
        }
        return blocks;
    }

    private parseBlock(): Block {
        if (this.lookup(":::")) return this.parseDynamicBlock();
        else return this.parseParagraph();
    }

    private parseDynamicBlock(): Block {
        throw new Error("Method not implemented.");
    }

    private parseParagraph(): Paragraph {
        
        const spans: RichText[] = [];
        let lastText = "";
        
        function addSpan(span?: RichText) {
            if (lastText != "") {
                spans.push({
                    type: "text",
                    value: lastText
                });
                lastText = "";
            }
            if (span) spans.push(span);
        }
        
        do {
            if (this.lookup("\n")) break;
            else if (this.lookup("__")) addSpan(this.parseUnderline());
            else if (this.lookup("_")) addSpan(this.parseCursive());
            else if (this.lookup("**")) addSpan(this.parseEmphase());
            else if (this.lookup("*")) addSpan(this.parseBold());
            else if (this.lookup("`")) addSpan(this.parseGenericSpan("`", BaseTextStyle.monospace));
            else if (this.lookup("\"")) addSpan(this.parseGenericSpan("\"", BaseTextStyle.cite));
            else if (this.lookup("#")) addSpan(this.parseGenericSpan("#", BaseTextStyle.normal));
            else lastText += this.text[this.carret + 1];
        } while (this.advance())

        addSpan();

        return {
            type: "paragraph",
            text: spans
        }

    }

    private parseBold(): StyledText {
        return this.parseGenericSpan("*", BaseTextStyle.bold);
    }

    private parseEmphase(): StyledText {
        return this.parseGenericSpan("**", BaseTextStyle.emphase);
    }

    private parseCursive(): StyledText {
        return this.parseGenericSpan("_", BaseTextStyle.cursive);
    }

    private parseUnderline(): StyledText {
        return this.parseGenericSpan("__", BaseTextStyle.underline);
    }

    private parseGenericSpan(marker: string, style: BaseTextStyle): StyledText {
        this.advance(marker.length);
        const startCarret = this.carret + 1;

        do {
            if (this.lookup(marker)) {
                const text = this.text.slice(startCarret, this.carret + 1).join("");

                this.advance(marker.length - 1);

                return {
                    type: "styledText",
                    baseStyle: style,
                    text: text
                }
            }
        } while (this.advance())

        throw Error(`Couldn't find ending of generic span with style ${style}, starting from ${startCarret}`);
    }


} 