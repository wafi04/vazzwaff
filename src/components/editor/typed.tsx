'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Extension } from '@tiptap/core';

const FontSize = Extension.create({
  name: 'fontSize',
  
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },
  
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: element => element.style.fontSize,
          renderHTML: attributes => {
            if (!attributes.fontSize) {
              return {}
            }
            return {
              style: `font-size: ${attributes.fontSize}`,
            }
          },
        },
      },
    }]
  },
});

interface TypedEditorProps {
  text: string;
  setText: (value: string) => void;
}

export function TypedEditor({ text, setText }: TypedEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontSize, // Now FontSize is defined before it's used
    ],
    content: text,
    onUpdate: ({ editor }) => {
      setText(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && text !== editor.getHTML()) {
      editor.commands.setContent(text);
    }
  }, [text, editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/2">
        <h2 className="font-semibold mb-2">Editor</h2>
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-2">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn">Bold</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn">Italic</button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="btn">Underline</button>
        
          <button onClick={() => editor.chain().focus().insertContent('😊').run()} className="btn">😊</button>
          <button onClick={() => editor.chain().focus().insertContent('🔥').run()} className="btn">🔥</button>
          <button onClick={() => editor.chain().focus().insertContent('💡').run()} className="btn">💡</button>
        </div>
        {/* Editor */}
        <div className="border p-2 rounded min-h-[200px]">
          <EditorContent editor={editor} />
        </div>
      </div>
      {/* Preview */}
      <div className="w-full md:w-1/2">
        <h2 className="font-semibold mb-2">Preview</h2>
        <div
          className="prose max-w-none p-4 border rounded min-h-[200px] "
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
        />
      </div>
    </div>
  );
}
