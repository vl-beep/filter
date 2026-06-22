import { FiltersProvider } from "@/context/FiltersContext";

export default function FiltersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FiltersProvider>{children}</FiltersProvider>;
}
