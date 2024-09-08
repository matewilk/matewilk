import { Metadata, ResolvingMetadata } from "next";

import {
  getAllCategories,
  getPostsByCategory,
  getRecentPosts,
} from "src/lib/blogging";
import { BlogGrid } from "src/components/elements/BlogGrid";

type CategoryPostsProps = {
  params: {
    slug: string;
    page: string;
  };
};

const CategoryPosts = ({ params: { slug, page } }: CategoryPostsProps) => {
  const { posts, hasMore } = getPostsByCategory({
    urlPath: "blogs",
    category: slug,
    page: parseInt(page),
    limit: 6,
  });
  const categories = getAllCategories("blogs");
  const recentPosts = getRecentPosts("blogs");

  const pageNumber = Array.isArray(page) ? page[0] : page ?? "1";

  if (!posts) return null;

  const breadcrumb = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Blogs",
      link: "/blogs/1",
    },
    {
      name: slug,
      link: "",
    },
  ];

  return (
    <BlogGrid
      type="blogs"
      breadcrumb={breadcrumb}
      page={pageNumber}
      posts={posts}
      hasMore={hasMore}
      categories={categories}
      recentPosts={recentPosts}
    />
  );
};

export default CategoryPosts;

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
