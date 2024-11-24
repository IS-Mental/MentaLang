export type Reference = { type: "ref", varName: string };
export type PlainText = { type: "text", value: string };

export type SubstitableText = Reference | PlainText;
export type RichText = StyledText | PlainText | Link;

export enum BaseTextStyle {
    normal,
    cursive,
    bold,
    emphase,
    underline,
    monospace,
    cite
}
export type StyledText = { type: "styledText", baseStyle: BaseTextStyle, class?: string, text: string }

export type Link = { type: "link", address: string, text?: StyledText | PlainText }

export interface dynBlock {
    type: "dynamic";
    contentType: string;
    params: SubstitableText[];
    content: string;
}

export interface Paragraph {
    type: "paragraph";
    text: RichText[];
}

export interface FrontMatter {
    type: "frontmatter";
    staticVars: {
        name: string,
        value: string
    }[];
    dynamicRefs: {
        name: string,
        defaultValue: string,
    };
}

export type Block = Paragraph | dynBlock | FrontMatter;