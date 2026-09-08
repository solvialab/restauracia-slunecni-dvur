import { Sun } from "@/components/ui/sun";
export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <header className="page-intro container">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{text}</p>
      </div>
      <Sun />
    </header>
  );
}
