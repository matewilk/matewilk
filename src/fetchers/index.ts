type Information = {
  firstName: string;
  lastName: string;
  fullName: string;
  thumbImage: string;
  largeImage: string;
  bio: string;
  languages: Array<string>;
  experience: string;
  location: string;
  freelance: string;
  socialAddress: Array<{
    [key: string]: string;
  }>;
  phoneNumbers: Array<string>;
  emailAddress: Array<string>;
};

const getInformation = async (): Promise<Information> => {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/information.json`);
  return await res.json();
};

type Service = {
  id: string;
  title: string;
  text: string;
  icon: string;
};

const getServices = async (): Promise<Array<Service>> => {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services.json`);
  return await res.json();
};

const getTechskills = async () => {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/techskills.json`);
  return await res.json();
};

const getLanguageskills = async () => {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/languageskills.json`
  );
  return await res.json();
};

type PortfolioFilter = {
  id: string;
  title: string;
  value: string;
};

const getPortfolioFilters = async (): Promise<Array<PortfolioFilter>> => {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/portfoliofilters.json`
  );
  return await res.json();
};

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

const getPortfolios = async (): Promise<Array<Porfolio>> => {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolios.json`);
  return await res.json();
};

const getJobExperience = async () => {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/jobexperience.json`
  );
  return await res.json();
};

type Education = {
  id: string;
  title: string;
  meta: string;
  text: string;
  year: string;
};

const getEducationBackground = async (): Promise<Array<Education>> => {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/educationbackground.json`
  );
  return await res.json();
};

type ClientReview = {
  id: string;
  name: string;
  meta: string;
  givenreview: string;
  image: string;
  text: string;
};

const getClientReviews = async (): Promise<Array<ClientReview>> => {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clientsreview.json`
  );
  return await res.json();
};

export {
  getInformation,
  getServices,
  getTechskills,
  getLanguageskills,
  getPortfolioFilters,
  getPortfolios,
  getJobExperience,
  getEducationBackground,
  getClientReviews,
};
