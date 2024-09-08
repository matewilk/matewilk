import { getPortfolios, getPortfolioFilters } from "../../fetchers";
import PortfolioFilter from "./PortfolioFilter";

const PortfoliosSection = async () => {
  const data = await getPortfolios();
  const filters = await getPortfolioFilters();

  if (!data) return null;

  return <PortfolioFilter data={data} filters={filters} />;
};

export default PortfoliosSection;
