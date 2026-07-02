type Comment = {
  id: string;
  author: string;
  date: string;
  body: string;
  avatarInitials?: string;
};

type Props = {
  comments?: Comment[];
};

export default function BlogCommentsSection({ comments = [] }: Props) {
  return (
    <>
      <div className="blogright-border blogright-border--spaced" />

      <h2 className="blogright-comments-title">
        Blog Comments{comments.length > 0 ? ` (${comments.length})` : ''}
      </h2>

      {comments.length === 0 ? (
        <p className="blogright-comment-empty">No comments yet. Be the first to share your thoughts below.</p>
      ) : (
        comments.map((comment) => (
          <article key={comment.id} className="blogright-reply-section">
            <div className="blogright-reply-head">
              <div className="blogright-reply-author">
                <div className="blogright-reply-avatar" aria-hidden>
                  {comment.avatarInitials ?? comment.author.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <p className="blogright-reply-name">{comment.author}</p>
                  <p className="blogright-reply-date">{comment.date}</p>
                </div>
              </div>
              <a href="#blog-reply-form" className="blogright-reply-action">
                ↩ Reply
              </a>
            </div>
            <p className="blogright-reply-text">{comment.body}</p>
          </article>
        ))
      )}
    </>
  );
}
