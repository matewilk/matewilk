import { Metadata, ResolvingMetadata } from "next";

import { getSinglePost } from "src/lib/blogging";
import Breadcrumb from "src/components/elements/Breadcrumb";
import { Article } from "src/components/elements/Article";

const PostPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const post = getSinglePost(slug, "blogs");
  const { title, date, cover, category, content } = post;

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
          <Article {...{ cover, date, category, content }} />
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
  const post = getSinglePost(slug, "blogs");
  const { title } = post;
  return {
    title: `${title} - ${parentTitle?.absolute}`,
  };
}
