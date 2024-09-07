import {
  getAllCategories,
  getPostsByPage,
  getRecentPosts,
} from "../../../lib/blogging";
import { BlogList } from "../../../components/elements/BlogList";

const Posts = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { posts, hasMore } = getPostsByPage({
    page: parseInt(slug),
    urlPath: "posts",
  });
  const categories = getAllCategories("posts");
  const recentPosts = getRecentPosts("posts");

  const page = Array.isArray(slug) ? slug[0] : slug ?? "1";

  if (!posts) return null;

  return (
    <BlogList
      type="projects"
      page={page}
      posts={posts}
      hasMore={hasMore}
      categories={categories}
      recentPosts={recentPosts}
    />
  );
};

export default Posts;
