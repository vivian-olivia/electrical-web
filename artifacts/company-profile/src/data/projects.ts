import { assetUrl } from "@/lib/utils";

/* ─── Real project photos ─── */
const IMG_PROJECTS = {
  indocementAfter1: assetUrl("/projects/project-indocement-after-1.jpeg"),
  pertaminaCepu1: assetUrl("/projects/project-pertamina-cepu-1.jpeg"),
  pusriSG41: assetUrl("/projects/project-pusri-SG41.jpeg"),
};

export interface Project {
  id: string;
  title: string;
  industry: string;
  industryEn: string;
  location: string;
  year: string;
  voltage: string;
  scope: string;
  descId: string;
  descEn: string;
  image: string;
}

export const projectsData: Project[] = [
  {
    id: "indocement-switchgear-retrofit",
    title: "Indocement Switchgear Retrofit",
    industry: "Semen",
    industryEn: "Cement",
    location: "Citeureup, Bogor",
    year: "2023",
    voltage: "6.3kV",
    scope: "Retrofit & Modernization",
    descId: "Retrofit menyeluruh panel switchgear tegangan menengah di pabrik PT Indocement, menggantikan unit lama yang sudah berumur puluhan tahun tanpa mengganggu jadwal produksi semen.",
    descEn: "Full retrofit of medium voltage switchgear panels at PT Indocement's plant, replacing decades-old units without disrupting the cement production schedule.",
    image: IMG_PROJECTS.indocementAfter1,
  },
  {
    id: "pertamina-cepu-switchgear-commissioning",
    title: "Pertamina Cepu Switchgear Testing & Commissioning",
    industry: "Migas",
    industryEn: "Oil & Gas",
    location: "Cepu, Bojonegoro",
    year: "2024",
    voltage: "24kV",
    scope: "Testing & Commissioning",
    descId: "Pengujian dan commissioning panel switchgear 24kV, 630A, 16kA untuk fasilitas produksi migas Pertamina di Blok Cepu, mencakup pengujian proteksi dan partial discharge.",
    descEn: "Testing and commissioning of a 24kV, 630A, 16kA switchgear panel for Pertamina's oil & gas production facility in Blok Cepu, including protection and partial discharge testing.",
    image: IMG_PROJECTS.pertaminaCepu1,
  },
  {
    id: "pusri-sg41-unigear-panel",
    title: "Pusri SG41 Unigear Panel Installation",
    industry: "Pupuk & Petrokimia",
    industryEn: "Fertilizer & Petrochemical",
    location: "Palembang",
    year: "2024",
    voltage: "13.8kV",
    scope: "Supply & Installation",
    descId: "Pengadaan dan instalasi 7 panel switchgear ABB Unigear 13.8kV, 40kA, 2000A untuk pabrik SG41 milik PT Pupuk Sriwidjaja (Pusri) Palembang.",
    descEn: "Supply and installation of 7 ABB Unigear switchgear panels rated 13.8kV, 40kA, 2000A for the SG41 plant of PT Pupuk Sriwidjaja (Pusri) in Palembang.",
    image: IMG_PROJECTS.pusriSG41,
  },
];
