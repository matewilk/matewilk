import { marked } from "marked";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

import { createSlug } from "src/lib";
import { getSinglePost } from "src/lib/blogging";
import Breadcrumb from "src/components/elements/Breadcrumb";
import { FloatingImages } from "src/components/elements/FloatingImages";

// import Comments from "../../components/utils/Comments";

const PostPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const post = getSinglePost(slug);
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
          <div className="post-header mb-8">
            <FloatingImages images={[cover, cover]} />
            <div className="flex flex-wrap justify-between gap-x-4">
              <div className="mb-0 flex gap-2 text-heading">
                Category :{" "}
                <div className="inline-flex list-none gap-1.5">
                  {category.map((cat, i) => (
                    <span
                      key={i}
                      className="after:content-[','] last:after:hidden"
                    >
                      <Link
                        href={`/projects/${createSlug(cat)}/1`}
                        className="text-body hover:text-primary"
                      >
                        {cat}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
              <p className="mb-0 text-heading">
                Published on :
                <span className="ml-1.5 text-body">
                  {`${new Date(date).toLocaleDateString("en-us", {
                    month: "short",
                  })} ${new Date(date).toLocaleDateString("en-us", {
                    day: "2-digit",
                  })}, ${new Date(date).getFullYear()}`}
                </span>
              </p>
            </div>
          </div>
          <div
            className="post-body mt-4"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
          {/* <div className="post-comments mt-8">
            <Comments title={title} slug={slug} />
          </div> */}
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
  const { title } = post;
  return {
    title: `${title} - ${parentTitle?.absolute}`,
  };
}
