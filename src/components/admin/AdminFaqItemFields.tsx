import { AdminCheckbox, AdminField, AdminSelect } from '@/components/admin/AdminFormFields';
import AdminRichTextEditor from '@/components/admin/AdminRichTextEditorLazy';

type CategoryOption = { id: string; name: string };

type Defaults = {
  categoryId?: string;
  question?: string;
  answer?: string;
  sortOrder?: number;
  published?: boolean;
};

export default function AdminFaqItemFields({
  categories,
  defaults = {},
}: {
  categories: CategoryOption[];
  defaults?: Defaults;
}) {
  return (
    <>
      <AdminSelect
        label="Category"
        name="categoryId"
        required
        defaultValue={defaults.categoryId ?? categories[0]?.id ?? ''}
        options={categories.map((category) => ({ value: category.id, label: category.name }))}
      />
      <AdminField label="Question" name="question" defaultValue={defaults.question} required />
      <AdminRichTextEditor
        label="Answer"
        name="answer"
        defaultValue={defaults.answer}
        required
        uploadKind="faq-image"
        hint="Rich text answer with optional images — shown on the public FAQ page."
      />
      <AdminField label="Sort order" name="sortOrder" defaultValue={String(defaults.sortOrder ?? 0)} />
      <AdminCheckbox label="Published" name="published" defaultChecked={defaults.published ?? true} />
    </>
  );
}
