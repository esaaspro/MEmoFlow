"use client";

import { useState } from "react";
import { FileText, Mic, Youtube, Globe } from "lucide-react";
import { ActionCard } from "./ActionCard";
import { UploadModal } from "./UploadModal";

type ActionType = "document" | "audio" | "youtube" | "web" | null;

export function DashboardActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);

  const handleActionClick = (actionType: ActionType) => {
    setSelectedAction(actionType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAction(null), 300); // Wait for exit animation
  };

  return (
    <>
      {/* Action Grid */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Actions Rapides</h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Document Upload */}
          <ActionCard
            icon={FileText}
            title="Importer un Document"
            label="PDF, Docx"
            onClick={() => handleActionClick("document")}
          />

          {/* Audio Recording - Featured */}
          <ActionCard
            icon={Mic}
            title="Audio / Enregistrement"
            label="MP3, M4A ou Micro"
            onClick={() => handleActionClick("audio")}
            featured
          />

          {/* YouTube Link */}
          <ActionCard
            icon={Youtube}
            title="Lien YouTube"
            label="Coller une URL"
            onClick={() => handleActionClick("youtube")}
          />

          {/* Web Link */}
          <ActionCard
            icon={Globe}
            title="Lien Site Web"
            label="Article ou Blog"
            onClick={() => handleActionClick("web")}
          />
        </div>
      </section>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isModalOpen}
        actionType={selectedAction}
        onClose={handleCloseModal}
      />
    </>
  );
}

