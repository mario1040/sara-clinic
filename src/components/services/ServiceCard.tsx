import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, PlayCircle, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  videoUrl: string;
}

const ServiceCard = ({ title, description, image, videoUrl }: ServiceCardProps) => {
  const { language } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4 }}
        className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500"
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="relative p-6 -mt-16 z-10">
          {/* Title */}
          <h3 className="text-xl font-serif font-bold gold-text mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-foreground/70 text-sm mb-6 line-clamp-2">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Button A: See Real Cases */}
            <Link
              to="/#real-results"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              <span>{language === "en" ? "Real Cases" : "حالات حقيقية"}</span>
            </Link>

            {/* Button B: Watch Procedure */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-all duration-300"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{language === "en" ? "Watch" : "شاهد"}</span>
            </button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 border-2 border-primary/30 rounded-xl" />
          <div className="absolute -inset-1 bg-primary/5 blur-xl rounded-xl" />
        </div>
      </motion.div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-navy-dark border-border overflow-hidden">
          <DialogClose className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-white" />
          </DialogClose>
          <div className="aspect-video w-full">
            <iframe
              src={videoUrl}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCard;
