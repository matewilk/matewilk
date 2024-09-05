import React, { FC, ReactNode } from "react";
import { Metadata } from "next";

import { getPostsByPage } from "../lib/blogging";
import { HeroSection } from "../components/containers/HeroSection";
import SectionHeading from "../components/utils/SectionHeading";
import AboutSection from "../components/containers/AboutSection";
import SkillsSection from "../components/containers/SkillsSection";
import ServicesSection from "../components/containers/ServicesSection";
import ResumeSection from "../components/containers/ResumeSection";
import PortfoliosSection from "../components/containers/PortfoliosSection";
import ReviewsSection from "../components/containers/ReviewsSection";
import BlogSection from "../components/containers/BlogSection";
import ContactSection from "../components/containers/ContactSection";

export default async function Home() {
  const { posts } = getPostsByPage({ page: 1, limit: 5, urlPath: "blogs" });
  return (
    <div className="container mx-auto">
      <Section name="section-home" className="hero-section">
        <HeroSection />
      </Section>

      <Section
        name="section-about"
        className="about-section pt-24 lg:pt-28 xl:pt-32"
      >
        <SectionHeading title="About Me" watermark="About" />
        <AboutSection />
      </Section>

      <Section
        name="section-skills"
        className="skills-section pt-24 lg:pt-28 xl:pt-32"
      >
        <SectionHeading title="My Skills" watermark="Skills" />
        <SkillsSection />
      </Section>

      <Section
        name="section-services"
        className="services-section pt-24 lg:pt-28 xl:pt-32"
      >
        <SectionHeading title="My Services" watermark="Services" />
        <ServicesSection />
      </Section>

      <Section
        name="section-resume"
        className="resume-section pt-24 lg:pt-28 xl:pt-32"
      >
        <SectionHeading title="My Resume" watermark="Resume" />
        <ResumeSection />
      </Section>

      <Section
        name="section-portfolios"
        className="portfolio-section pt-24 lg:pt-28 xl:pt-32"
      >
        <SectionHeading title="My Projects" watermark="Projects" />
        <PortfoliosSection />
      </Section>

      <Section
        name="section-reviews"
        className="reviews-section pt-23 lg:pt-28 xl:pt-32"
      >
        <SectionHeading title="Client Reviews" watermark="Reviews" />
        <ReviewsSection />
      </Section>

      <Section
        name="section-blog"
        className="reviews-section pt-23 lg:pt-28 xl:pt-32"
      >
        <SectionHeading title="Latest Blogs" watermark="Blog" />
        <BlogSection posts={posts} />
      </Section>

      <Section
        name="section-contact"
        className="contact-section pt-24 lg:pt-28 xl:pt-32"
      >
        <SectionHeading title="Contact" watermark="Contact" />
        <ContactSection />
      </Section>
      <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </div>
  );
}

const Section: FC<{
  name: string;
  className: string;
  children?: ReactNode;
}> = ({ name, className, children }) => {
  return (
    <section id={name} className={className}>
      {children}
    </section>
  );
};

export const metadata: Metadata = {
  title: "matewilk - Software Engineer",
};
