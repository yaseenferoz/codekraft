import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
};

export function PrimaryButton({ href, children }: PrimaryButtonProps) {
  return (
    <Link href={href} className="ck-primary-button">
      <span>{children}</span>
      <ArrowRight size={20} strokeWidth={1.8} />
    </Link>
  );
}
