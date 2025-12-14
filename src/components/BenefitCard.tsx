import { Award, Truck, BadgeIndianRupee, Heart, Zap, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Truck,
  BadgeIndianRupee,
  Heart,
  Zap,
};

interface BenefitCardProps {
  benefit: {
    icon: string;
    title: string;
    description: string;
  };
  index: number;
}

export function BenefitCard({ benefit, index }: BenefitCardProps) {
  const IconComponent = iconMap[benefit.icon] || Award;

  return (
    <div
      className="text-center p-4 opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
        <IconComponent className="w-5 h-5 text-primary" />
      </div>
      <h3 className="font-serif text-base font-semibold text-foreground mb-1.5">
        {benefit.title}
      </h3>
      <p className="text-xs text-muted-foreground">
        {benefit.description}
      </p>
    </div>
  );
}
