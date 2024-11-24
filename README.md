# MentaLang

This is a parser for MentalLang, markup language, used for creating content with interactive sections.
Currently part of IS-Mental project. 

The parser generates oredered list of Blocks with theirs content and properties.

## Current progress
- [x] Basic formats can be added to text in one paragraph (no nesting)
- [ ] Classes can be assigned to Basic formats
- [ ] Multiple paragraphs can be added
- [ ] Dynamic Blocks are detected and parsed with arguments
- [ ] Users can add blocks of code
- [ ] Users can add blocks of math
- [ ] Inline math support
- [ ] Front matter is parsed
- [ ] References to variables are parsed
- [ ] Styles can be nested (and possibly interleaved with eachother)
- [ ] Table syntax is defined and parsed
- [ ] Links are interpreted
- [ ] Users can add display text to links
- [ ] Images can be added
- [ ] Special characters can be escaped
- [ ] Lists are parsed
- [ ] Support for side notes (footnotes)
- and more incoming...

## Contributing
Fell free to create and resolve issues, according to current problems and planned work above. We're 
working in branches, named with following scheme `feat/name-of-the-feature`, where first part is
context of changes on branch from following: feat, fix, docs, and second part - short description of
the problem.

If you're not a part of this organization, make contributon in own fork, and then create PR to this
repo.

## Language definition
We've aimed MentaLang to be simple, portable and familiar. It uses slightly changed and updated
concepts from lungages
like markdown, AsciiDoc and such.

### Basic Formatting
```
This text is *slightly emphased* and **strongly emphased**. Some words could be _tilted_ for sarcasm
or __underlined__.
It's also possible for words to be `monospace`. You can use custom [classname]#classes# by writing
classname in brackets before ANY tagged section (dependent on implementation).
```

### Dynamic blocks
Dynamic blocks are the main reason for creation of this language. Their aviability depends on feature
set of implementation,
but basic structure is following

```
::: Note
This block will be formatted differntly. 
:::

:::mermaid Title of diagram
 flowchart TD
     A[Christmas] -->|Get money| B(Go shopping)
     B --> C{Let me think}
     C -->|One| D[Laptop]
     C -->|Two| E[iPhone]
     C -->|Three| F[fa:fa-car Car]
:::
```

### Frontmatter and variables
This file format gives you an ability to define static and dynamic variables

```
---
title: Title of file (public constatant)
$variable: 0
---
```

Static constants can be used outside of the file, as metadata.
Both variable and static values can be used in any part of the file following way

```
Value of variable is {{$variable}}
```

