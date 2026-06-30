import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

export type ImageAlign = 'left' | 'center' | 'right';

function alignClass(align?: string | null): string {
  const value = align === 'center' || align === 'right' ? align : 'left';
  return `admin-rich-editor-image admin-rich-editor-image--${value}`;
}

const AdminImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      textAlign: {
        default: 'left',
        parseHTML: (element) => {
          const dataAlign = element.getAttribute('data-align');
          if (dataAlign === 'center' || dataAlign === 'right' || dataAlign === 'left') {
            return dataAlign;
          }
          return element.style.textAlign || 'left';
        },
        renderHTML: (attributes) => {
          const align = attributes.textAlign === 'center' || attributes.textAlign === 'right'
            ? attributes.textAlign
            : 'left';
          return {
            'data-align': align,
            class: alignClass(align),
          };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const align =
      HTMLAttributes.textAlign === 'center' || HTMLAttributes.textAlign === 'right'
        ? HTMLAttributes.textAlign
        : 'left';

    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-align': align,
        class: alignClass(align),
      }),
    ];
  },
}).configure({
  resize: {
    enabled: true,
    directions: ['bottom-right'],
    minWidth: 80,
    minHeight: 60,
    alwaysPreserveAspectRatio: true,
  },
});

export default AdminImage;
