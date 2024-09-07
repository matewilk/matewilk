import {
  getAllCategories,
  getPostsByCategory,
  getRecentPosts,
} from "src/lib/blogging";
import { BlogList } from "src/components/elements/BlogList";

type CategoryPostsProps = {
  params: {
    slug: string;
    page: string;
  };
};

const CategoryPosts = ({ params: { slug, page } }: CategoryPostsProps) => {
  const { posts, hasMore } = getPostsByCategory({
    urlPath: "posts",
    category: slug,
    page: parseInt(page),
    limit: 6,
  });
  const categories = getAllCategories("posts");
  const recentPosts = getRecentPosts("posts");

  const pageNumber = Array.isArray(page) ? page[0] : page ?? "1";

  if (!posts) return null;

  const breadcrumb = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Projects",
      link: "/projects/1",
    },
    {
      name: slug,
      link: "",
    },
  ];

  return (
    <BlogList
      type="projects"
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
