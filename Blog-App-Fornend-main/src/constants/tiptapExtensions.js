import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';

import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css'; // Import a default style or your preferred theme

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

// Register languages with highlight.js
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', js);
hljs.registerLanguage('typescript', ts);

export const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    CodeBlockLowlight.configure({
        lowlight: hljs, // Pass hljs instance
    }),
    Dropcursor,
    Image,
];
