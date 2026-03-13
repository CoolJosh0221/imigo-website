import PostEditor from '@/components/admin/PostEditor';
import { createPost } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default function NewPostPage() {
  return <PostEditor mode="create" onSubmit={createPost} />;
}
