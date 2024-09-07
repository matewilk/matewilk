"use client";
import Image from "next/image";
import Link from "next/link";
import { RiExternalLinkLine, RiImageLine, RiVideoLine } from "react-icons/ri";
import { useState } from "react";

import { createSlug } from "../../lib";
import { imageLoader, shimmer, toBase64 } from "../../lib/utils";
import { BlogPost } from "../../lib/blogging";

const Blog = ({
  type,
  title,
  date,
  thumb,
  category,
  slug,
  link = "",
  imagegallery = [],
  videogallery = [],
}: BlogPost) => {
  const [videoGalleryOpen, setVideoGalleryOpen] = useState(false);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);

  return (
    <article className="blog card group p-4 md:p-5">
      <div className="blog-top relative mb-4 overflow-hidden">
        <div className="blog-image fiximage blur-0 filter transition-all duration-500 group-hover:blur">
          <Image
            loader={imageLoader}
            unoptimized={true}
            src={thumb}
            height={225}
            width={400}
            alt={title}
            // objectFit="cover"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(400, 225)
            )}`}
          />
        </div>
        <div className="blog-hovercontent absolute left-0 top-0 z-20 flex h-[101%] w-full -translate-x-full transform items-center justify-center overflow-hidden bg-grey bg-opacity-80 transition-all duration-500 group-hover:translate-x-0">
          {imagegallery.length ? (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              onClick={() => setImageGalleryOpen(true)}
            >
              <RiImageLine />
            </button>
          ) : null}
          {videogallery.length ? (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              onClick={() => setVideoGalleryOpen(true)}
            >
              <RiVideoLine />
            </button>
          ) : null}
          {link ? (
            <Link legacyBehavior href={link}>
              <a
                target="_blank"
                className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              >
                <RiExternalLinkLine />
              </a>
            </Link>
          ) : null}
        </div>
        <div className="blog-date absolute left-auto right-5 top-5 inline-block min-h-[60px] min-w-[60px] rounded bg-primary p-2 text-center text-grey">
          <span className="month block text-sm uppercase leading-none">
            {new Date(date).toLocaleDateString("en-us", {
              month: "short",
            })}
          </span>
          <span className="date block text-2xl leading-none">
            {new Date(date).toLocaleDateString("en-us", {
              day: "2-digit",
            })}
          </span>
          <span className="year block text-sm leading-none">
            {new Date(date).getFullYear()}
          </span>
        </div>
      </div>
      <h5 className="mb-0">
        <Link legacyBehavior href={link ? link : `/${type}/${slug}`}>
          <a
            target="_blank"
            className="block overflow-hidden overflow-ellipsis whitespace-nowrap transition-colors duration-500 hover:text-primary"
            title={title}
          >
            {title}
          </a>
        </Link>
      </h5>
      <div className="flex list-none gap-1.5 text-sm">
        {category.map((cat, i) => (
          <span key={i} className="after:content-[','] last:after:hidden">
            <Link legacyBehavior href={`/${type}s/${createSlug(cat)}/1`}>
              <a className=" hover:text-primary">{cat}</a>
            </Link>
          </span>
        ))}
      </div>
    </article>
  );
};

export default Blog;
