import { Metadata, ResolvingMetadata } from "next";
import { allProjects } from "contentlayer/generated";

import { getSinglePost } from "src/lib/blogging";
import Breadcrumb from "src/components/elements/Breadcrumb";
import { Article } from "src/components/elements/Article";
import { notFound } from "next/navigation";

const PostPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const post = allProjects.find(
    (post) => post._raw.sourceFileName === `${slug}.md`
  );

  if (!post) return notFound();

  const { title, date, cover, category, body } = post;

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
            name: "Projects",
            link: "/projects/1",
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

export default PostPage;

export async function generateMetadata(
  {
    params: { slug },
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title: parentTitle } = await parent;
  const post = getSinglePost(slug);

  if (!post) return { title: "Not Found" };
  const { title } = post;
  return {
    title: `${title} - ${parentTitle?.absolute}`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/project/${slug}`,
    },
    authors: [
      {
        name: "Mat Wilk",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      },
    ],
  };
}
