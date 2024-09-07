"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Portfolio from "../elements/Portfolio";
import PortfolioFilters from "../utils/PortfolioFilters";

const VISIBLE_PORTFOLIOS = 6;

type Porfolio = {
  id: number;
  title: string;
  subtitle: string;
  coverimage: string;
  imagegallery: boolean;
  videogallery: boolean;
  url: string;
  filters: Array<string>;
  slug: string;
};

type PortfolioFilter = {
  id: string;
  title: string;
  value: string;
};

interface PortfolioResponse {
  data: Array<Porfolio>;
  total: number;
}

type Props = {
  data: Array<Porfolio>;
  filters: Array<PortfolioFilter>;
};

const PortfolioFilter = ({ data, filters }: Props) => {
  const [visiblePortfolios, setVisiblePortfolios] = useState(Array<Porfolio>);
  const [currentFilter, setCurrentFilter] = useState("");
  const [limit, setLimit] = useState(VISIBLE_PORTFOLIOS);
  const [total, setTotal] = useState(data.length);

  useEffect(() => {
    if (data) {
      setVisiblePortfolios(data.slice(0, limit));
      setTotal(data.length);
    }
  }, []);

  const handleFilter = useCallback(
    async (value: string) => {
      setCurrentFilter(value);
      const portfolios = await fetch(
        `/api/portfolios?filter=${value}&limit=${limit}`
      );
      const response: PortfolioResponse = await portfolios.json();
      setVisiblePortfolios(response.data);
      setTotal(response.total);
    },
    [limit]
  );

  const handleLoadmore = useCallback(async () => {
    setLimit((prevNumber) => prevNumber + limit);
    const portfolios = await fetch(
      `/api/portfolios?filter=${currentFilter}&limit=${limit * 2}`
    );
    const response: PortfolioResponse = await portfolios.json();
    setVisiblePortfolios(response.data);
    setTotal(response.total);
  }, [currentFilter, limit]);

  if (!data) return null;

  return (
    <>
      <PortfolioFilters
        filters={filters}
        currentFilter={currentFilter}
        filterHandler={handleFilter}
      />
      <motion.div layout className="mt-12 grid grid-cols-6 gap-7">
        {visiblePortfolios?.map((portfolio) => (
          <motion.div
            layout
            exit={{ scale: 0 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.4,
            }}
            className="col-span-6 sm:col-span-3 lg:col-span-2"
            key={portfolio.id}
          >
            <Portfolio type="project" portfolio={portfolio} />
          </motion.div>
        ))}
      </motion.div>
      {visiblePortfolios.length < total ? (
        <div className="mt-12 text-center">
          <button className="btn btn-small" onClick={() => handleLoadmore()}>
            <span>Load More</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default PortfolioFilter;
