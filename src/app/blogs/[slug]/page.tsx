import { Metadata, ResolvingMetadata } from "next";

import {
  getAllCategories,
  getBlogsByPage,
  getBlogsPageParams,
  getRecentPosts,
} from "src/lib/blogging";
import { BlogGrid } from "src/components/elements/BlogGrid";

export async function generateStaticParams() {
  return getBlogsPageParams();
}

const Blogs = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { blogs, hasMore } = getBlogsByPage({ page: parseInt(slug) });
  const categories = getAllCategories("blogs");
  const recentPosts = getRecentPosts("blogs");

  const page = Array.isArray(slug) ? slug[0] : slug ?? "1";

  if (!blogs) return null;

  const breadcrumb = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Blogs",
    },
  ];

  return (
    <BlogGrid
      type="blogs"
      breadcrumb={breadcrumb}
      page={page}
      posts={blogs}
      hasMore={hasMore}
      categories={categories}
      recentPosts={recentPosts}
    />
  );
};

export default Blogs;

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
