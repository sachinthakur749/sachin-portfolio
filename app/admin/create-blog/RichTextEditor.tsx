"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none text-white [&_*]:text-white [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4 [&_code]:bg-white/10 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-white/5 [&_pre]:p-4 [&_pre]:rounded [&_blockquote]:border-l-4 [&_blockquote]:border-white/30 [&_blockquote]:pl-4 [&_blockquote]:italic",
      },
    },
  });

  if (!editor) {
    return (
      <div className="h-80 bg-white/5 border border-white/10 rounded-sm animate-pulse" />
    );
  }

  return (
    <div className="border border-white/10 rounded-sm overflow-hidden bg-white/5">
      {/* Toolbar */}
      <div className="bg-white/2 border-b border-white/10 p-3 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("bold")
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("italic")
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("strike")
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          Strike
        </button>

        <div className="w-px bg-white/10"></div>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("heading", { level: 3 })
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          H3
        </button>

        <div className="w-px bg-white/10"></div>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("bulletList")
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("orderedList")
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          1. List
        </button>

        <div className="w-px bg-white/10"></div>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("codeBlock")
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          Code
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm font-light transition-colors ${
            editor.isActive("blockquote")
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          Quote
        </button>

        <div className="w-px bg-white/10"></div>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-3 py-1 rounded text-sm font-light bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-3 py-1 rounded text-sm font-light bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          Redo
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-80 prose prose-invert max-w-none"
      />
    </div>
  );
}
