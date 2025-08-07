import { Metadata, ResolvingMetadata } from "next";

import { getSingleBlog } from "src/lib/blogging";
import Breadcrumb from "src/components/elements/Breadcrumb";
import { Article } from "src/components/elements/Article";
import { notFound } from "next/navigation";

const BlogPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const blog = getSingleBlog(slug);

  if (!blog) return notFound();

  const { title, date, cover, category, body } = blog;

  return (
    <>
      <Breadcrumb
        title={title}
        paths={[
          {
            name: "Home",
            link: "/",
          },
          {
            name: "Blogs",
            link: "/blogs/1",
          },
          {
            name: title,
            link: "",
          },
        ]}
      />
      <div className="single-post py-24 lg:py-28 xl:py-32">
        <div className="container mx-auto">
          <Article {...{ cover, date, category, body }} />
        </div>
      </div>
    </>
  );
};

export default BlogPage;

export async function generateMetadata(
  {
    params: { slug },
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title: parentTitle } = await parent;

  const post = getSingleBlog(slug);
  if (!post) return { title: "Not Found" };

  const { title } = post;
  return {
    title: `${title} - ${parentTitle?.absolute}`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    },
    authors: [
      {
        name: "Mat Wilk",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      },
    ],
  };
}
