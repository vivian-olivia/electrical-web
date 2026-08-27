import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { projectsData, type ProjectSlug } from "./projectsData";
import ProjectDetailClient from "./ProjectDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project =
    projectsData[slug as ProjectSlug] ??
    projectsData["indocement-switchgear-retrofit"];

  return pageMetadata(project.title, project.descId);
}

export default function Page() {
  return <ProjectDetailClient />;
}
