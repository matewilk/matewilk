import Link from "next/link";

import { createSlug } from "src/lib";

type CategoriesProps = {
  categories: Array<string>;
  type: "projects" | "blogs";
};

export const Categories = ({ categories, type }: CategoriesProps) => {
  const uniqueCategories = [...new Set(categories)];
  return (
    <>
      <h5 className="border-b border-white border-opacity-20 pb-2 font-medium text-primary">
        Categories
      </h5>
      <ul className="styledlist mb-0 list-none pl-0">
        {uniqueCategories.map((category, i) => (
          <li key={i}>
            <Link
              href={`/${type}/${createSlug(category)}/1`}
              className="clearfix hover:text-primary"
            >
              {category}
              <span className="float-right">
                ({categories.filter((cat) => cat === category).length})
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
