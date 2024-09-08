import { Reviews } from "./Reviews";
import { getClientReviews } from "../../fetchers";

const ReviewsSection = async () => {
  const data = await getClientReviews();

  if (!data) return null;

  return <Reviews data={data} />;
};

export default ReviewsSection;
