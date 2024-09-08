import { NextRequest, NextResponse } from "next/server";

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

interface PortfolioResponse {
  data: Array<Porfolio>;
  total: number;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<PortfolioResponse>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfolios.json`
  );
  const porfolios: Array<Porfolio> = await response.json();

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || 6;
  const filter = searchParams.get("filter") || "";

  const visiblePortfolios = filter
    ? porfolios.filter((portfolio) => portfolio.filters.includes(filter))
    : porfolios;

  const total = visiblePortfolios.length;
  const data = visiblePortfolios.slice(0, Number(limit));

  return NextResponse.json({ data, total });
}
