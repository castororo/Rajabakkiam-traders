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
      className="text-center p-6 opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
        <IconComponent className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
        {benefit.title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {benefit.description}
      </p>
    </div>
  );
}
