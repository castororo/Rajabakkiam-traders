import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/data";

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-card/95 backdrop-blur-sm border-t border-border p-3 z-40">
      <div className="flex gap-3">
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-3 rounded-lg font-medium text-sm"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a
          href={BUSINESS_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
