'use client';

import type { ReactNode } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import AdminImage from '@/lib/tiptap/admin-image';
import Highlight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { useCallback, useEffect, useRef, useState } from 'react';
import { adminHint, adminLabel } from '@/components/admin/ui/admin-styles';
import { AdminSpinner } from '@/components/admin/ui/AdminIcons';
import {
  uploadEditorImage,
  type EditorUploadKind,
} from '@/lib/admin/upload-editor-image';

type Props = {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  hint?: string;
  uploadKind?: EditorUploadKind;
};

type ToolBtnProps = {
  onClick: () => void;
  active?: boolean;
  title: string;
  disabled?: boolean;
  children: ReactNode;
};

function ToolbarDivider() {
  return <span className="mx-0.5 w-px self-stretch bg-[var(--z-border)]" aria-hidden />;
}

function ToolBtn({ onClick, active, title, disabled, children }: ToolBtnProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`inline-flex h-8 min-w-8 items-center justify-center rounded px-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? 'is-active' : ''
      }`}
    >
      {children}
    </button>
  );
}

function setContentAlignment(editor: Editor, alignment: 'left' | 'center' | 'right' | 'justify') {
  if (editor.isActive('image')) {
    const imageAlign = alignment === 'justify' ? 'left' : alignment;
    editor.chain().focus().updateAttributes('image', { textAlign: imageAlign }).run();
    return;
  }

  editor.chain().focus().setTextAlign(alignment).run();
}

function EditorToolbar({
  editor,
  uploading,
  onImageClick,
  onLinkClick,
}: {
  editor: Editor | null;
  uploading: boolean;
  onImageClick: () => void;
  onLinkClick: () => void;
}) {
  if (!editor) return null;

  const inTable = editor.isActive('table');
  const imageSelected = editor.isActive('image');

  return (
    <div className="admin-rich-editor-toolbar flex flex-col gap-1 border-b px-2 py-1.5">
      <div className="flex flex-wrap items-center gap-1">
        <ToolBtn title="Undo (Ctrl+Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
          ↶
        </ToolBtn>
        <ToolBtn title="Redo (Ctrl+Y)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
          ↷
        </ToolBtn>
        <ToolbarDivider />
        <ToolBtn title="Paragraph" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>
          P
        </ToolBtn>
        <ToolBtn title="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </ToolBtn>
        <ToolBtn title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </ToolBtn>
        <ToolBtn title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </ToolBtn>
        <ToolBtn title="Heading 4" active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
          H4
        </ToolBtn>
        <ToolbarDivider />
        <ToolBtn title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          •
        </ToolBtn>
        <ToolBtn title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1.
        </ToolBtn>
        <ToolBtn title="Blockquote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          ❝
        </ToolBtn>
        <ToolBtn title="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          {'</>'}
        </ToolBtn>
        <ToolBtn title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          ―
        </ToolBtn>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <ToolBtn title="Bold (Ctrl+B)" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </ToolBtn>
        <ToolBtn title="Italic (Ctrl+I)" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <span className="italic">I</span>
        </ToolBtn>
        <ToolBtn title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <span className="line-through">S</span>
        </ToolBtn>
        <ToolBtn title="Inline code" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
          {'{ }'}
        </ToolBtn>
        <ToolBtn title="Underline (Ctrl+U)" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <span className="underline">U</span>
        </ToolBtn>
        <ToolBtn title="Highlight" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()}>
          HL
        </ToolBtn>
        <ToolbarDivider />
        <ToolBtn title="Superscript" active={editor.isActive('superscript')} onClick={() => editor.chain().focus().toggleSuperscript().run()}>
          x²
        </ToolBtn>
        <ToolBtn title="Subscript" active={editor.isActive('subscript')} onClick={() => editor.chain().focus().toggleSubscript().run()}>
          x₂
        </ToolBtn>
        <ToolbarDivider />
        <ToolBtn title="Insert link" active={editor.isActive('link')} onClick={onLinkClick}>
          Link
        </ToolBtn>
        <ToolBtn title="Insert image" disabled={uploading} onClick={onImageClick}>
          {uploading ? <AdminSpinner className="h-4 w-4" /> : 'Img'}
        </ToolBtn>
        {imageSelected ? (
          <ToolBtn title="Remove selected image" onClick={() => editor.chain().focus().deleteSelection().run()}>
            ✕Img
          </ToolBtn>
        ) : null}
        <ToolbarDivider />
        <ToolBtn
          title={imageSelected ? 'Align image left' : 'Align left'}
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => setContentAlignment(editor, 'left')}
        >
          ⬅
        </ToolBtn>
        <ToolBtn
          title={imageSelected ? 'Align image center' : 'Align center'}
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => setContentAlignment(editor, 'center')}
        >
          ⬌
        </ToolBtn>
        <ToolBtn
          title={imageSelected ? 'Align image right' : 'Align right'}
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => setContentAlignment(editor, 'right')}
        >
          ➡
        </ToolBtn>
        {!imageSelected ? (
          <ToolBtn title="Justify" active={editor.isActive({ textAlign: 'justify' })} onClick={() => setContentAlignment(editor, 'justify')}>
            ≡
          </ToolBtn>
        ) : null}
        <ToolbarDivider />
        <ToolBtn title="Insert table (3×3)" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          Table
        </ToolBtn>
        {inTable ? (
          <>
            <ToolBtn title="Add row" onClick={() => editor.chain().focus().addRowAfter().run()}>
              +Row
            </ToolBtn>
            <ToolBtn title="Add column" onClick={() => editor.chain().focus().addColumnAfter().run()}>
              +Col
            </ToolBtn>
            <ToolBtn title="Delete table" onClick={() => editor.chain().focus().deleteTable().run()}>
              ✕Tbl
            </ToolBtn>
          </>
        ) : null}
        <ToolbarDivider />
        <ToolBtn title="Clear formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
          Clear
        </ToolBtn>
      </div>
    </div>
  );
}

export default function AdminRichTextEditor({
  label,
  name,
  defaultValue = '',
  required,
  hint,
  uploadKind = 'page-image',
}: Props) {
  const [html, setHtml] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);

  const insertUploadedImage = useCallback(
    async (file: File) => {
      const editorInstance = editorRef.current;
      if (!editorInstance) return;
      if (!file.type.startsWith('image/')) {
        setUploadError('Please choose an image file.');
        return;
      }

      setUploading(true);
      setUploadError('');

      try {
        const path = await uploadEditorImage(file, uploadKind);
        editorInstance
          .chain()
          .focus()
          .setImage({ src: path, alt: file.name.replace(/\.[^.]+$/, '') })
          .updateAttributes('image', { textAlign: 'left' })
          .run();
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Image upload failed');
      } finally {
        setUploading(false);
      }
    },
    [uploadKind],
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: false,
        underline: false,
      }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      Highlight.configure({ multicolor: false }),
      Subscript,
      Superscript,
      Placeholder.configure({ placeholder: 'Write your content here…' }),
      AdminImage,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'admin-rich-editor-content min-h-[260px] px-3 py-3 outline-none',
      },
      handleDrop: (_view, event) => {
        const file = event.dataTransfer?.files?.[0];
        if (!file?.type.startsWith('image/')) return false;
        event.preventDefault();
        void insertUploadedImage(file);
        return true;
      },
      handlePaste: (_view, event) => {
        const file = event.clipboardData?.files?.[0];
        if (!file?.type.startsWith('image/')) return false;
        event.preventDefault();
        void insertUploadedImage(file);
        return true;
      },
    },
    onUpdate: ({ editor: ed }) => {
      setHtml(ed.isEmpty ? '' : ed.getHTML());
    },
  });

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  useEffect(() => {
    if (!editor || !defaultValue || !editor.isEmpty) return;
    editor.commands.setContent(defaultValue);
    queueMicrotask(() => {
      setHtml(defaultValue);
    });
  }, [editor, defaultValue]);

  const setLink = () => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', prev ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const onImageSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !editorRef.current) return;
    await insertUploadedImage(file);
  };

  return (
    <div>
      <label className={adminLabel} style={{ color: 'var(--z-text)' }}>
        {label}
      </label>

      <div className="admin-rich-editor mt-1.5">
        <EditorToolbar
          editor={editor}
          uploading={uploading}
          onImageClick={() => fileInputRef.current?.click()}
          onLinkClick={setLink}
        />
        <EditorContent editor={editor} />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onImageSelected}
      />

      <input type="hidden" name={name} value={html} required={required && !html} />
      {uploadError ? <p className={`${adminHint} text-[var(--z-danger)]`}>{uploadError}</p> : null}
      {hint ? (
        <p className={adminHint} style={{ color: 'var(--z-text-muted)' }}>
          {hint}
        </p>
      ) : (
        <p className={adminHint} style={{ color: 'var(--z-text-muted)' }}>
          Full formatting toolbar — click an image to select it, then use ⬅ ⬌ ➡ to align. Drag the corner handle to resize.
        </p>
      )}
    </div>
  );
}
