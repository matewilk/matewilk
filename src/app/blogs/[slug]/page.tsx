import { Metadata, ResolvingMetadata } from "next";

import {
  getAllCategories,
  getPostsByPage,
  getRecentPosts,
} from "src/lib/blogging";
import { BlogGrid } from "src/components/elements/BlogGrid";

const Posts = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { posts, hasMore } = getPostsByPage({
    page: parseInt(slug),
    urlPath: "blogs",
  });
  const categories = getAllCategories("blogs");
  const recentPosts = getRecentPosts("blogs");

  const page = Array.isArray(slug) ? slug[0] : slug ?? "1";

  if (!posts) return null;

  const breadcrumb = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Blogs",
      link: "",
    },
  ];

  return (
    <BlogGrid
      type="blogs"
      breadcrumb={breadcrumb}
      page={page}
      posts={posts}
      hasMore={hasMore}
      categories={categories}
      recentPosts={recentPosts}
    />
  );
};

export default Posts;

export async function generateMetadata(
  {
    params: { slug },
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title } = await parent;
  return {
    title: `Blogs - ${title?.absolute}`,
  };
}
