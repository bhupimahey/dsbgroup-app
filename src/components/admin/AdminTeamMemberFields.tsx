import { AdminCheckbox, AdminField, AdminSelect, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import AdminRichTextEditor from '@/components/admin/AdminRichTextEditorLazy';
import { TEAM_GROUP_OPTIONS } from '@/lib/team/constants';

type Defaults = {
  name?: string;
  title?: string;
  bio?: string;
  teaser?: string | null;
  branch?: string | null;
  group?: string;
  imagePath?: string | null;
  phone?: string | null;
  email?: string | null;
  sortOrder?: number;
  published?: boolean;
};

export default function AdminTeamMemberFields({ defaults = {} }: { defaults?: Defaults }) {
  return (
    <>
      <AdminFileUpload
        label="Photo"
        name="imagePath"
        accept="image/jpeg,image/png,image/webp"
        defaultValue={defaults.imagePath ?? ''}
        uploadKind="team-image"
        hint="Professional headshot — matches the card layout on /team."
      />
      <AdminField label="Name" name="name" defaultValue={defaults.name} required />
      <AdminField label="Title / designation" name="title" defaultValue={defaults.title} required />
      <AdminSelect
        label="Team section"
        name="group"
        defaultValue={defaults.group ?? 'WHOLE_TIME_CONSULTANTS'}
        options={TEAM_GROUP_OPTIONS}
      />
      <AdminField
        label="Branch / location"
        name="branch"
        defaultValue={defaults.branch ?? ''}
        placeholder="Jaipur Branch"
        hint="Optional — shown under the title on the public team page."
      />
      <AdminTextarea
        label="Short preview (teaser)"
        name="teaser"
        defaultValue={defaults.teaser ?? ''}
        rows={3}
        hint="Card preview before “Read full profile”. Leave blank to auto-generate from bio."
      />
      <AdminRichTextEditor
        label="Full bio"
        name="bio"
        defaultValue={defaults.bio ?? ''}
        required
        uploadKind="team-image"
        hint="Rich text — paragraphs, lists, images, and headings display on /team."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Phone" name="phone" defaultValue={defaults.phone ?? ''} />
        <AdminField label="Email" name="email" type="email" defaultValue={defaults.email ?? ''} />
      </div>
      <AdminField label="Sort order" name="sortOrder" defaultValue={String(defaults.sortOrder ?? 0)} />
      <AdminCheckbox label="Published" name="published" defaultChecked={defaults.published ?? true} />
    </>
  );
}
