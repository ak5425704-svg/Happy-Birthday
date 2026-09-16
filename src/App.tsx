import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SmokeCanvas } from './components/SmokeCanvas';
import { OpeningScreen } from './components/OpeningScreen';
import { HeaderNav } from './components/HeaderNav';
import { TableOfContentsModal, PAGES_CATALOG } from './components/TableOfContentsModal';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { loadPhotos, photoEvents, PHOTOS_UPDATED_EVENT } from './services/photoStorage';
import { MemoryPhoto } from './types';
import { Camera, ArrowUp } from 'lucide-react';

// 20 Chapters / Sections
import { CoverPage } from './components/pages/CoverPage';
import { AboutPage } from './components/pages/AboutPage';
import { PersonalityPage } from './components/pages/PersonalityPage';
import { CravingsPage } from './components/pages/CravingsPage';
import { BlackPage } from './components/pages/BlackPage';
import { TeriDeewaniPage } from './components/pages/TeriDeewaniPage';
import { RoamPage } from './components/pages/RoamPage';
import { MemoryWallPage } from './components/pages/MemoryWallPage';
import { IconicRamshaPage } from './components/pages/IconicRamshaPage';
import { OurBondPage } from './components/pages/OurBondPage';
import { FunnyAwardsPage } from './components/pages/FunnyAwardsPage';
import { IfRamshaWerePage } from './components/pages/IfRamshaWerePage';
import { SeventeenThingsPage } from './components/pages/SeventeenThingsPage';
import { LetterPage } from './components/pages/LetterPage';
import { ShayariPage } from './components/pages/ShayariPage';
import { WishesPage } from './components/pages/WishesPage';
import { BucketListPage } from './components/pages/BucketListPage';
import { PhotoMessagePage } from './components/pages/PhotoMessagePage';
import { FinalMessagePage } from './components/pages/FinalMessagePage';
import { BackCoverPage } from './components/pages/BackCoverPage';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);
  const [photos, setPhotos] = useState<MemoryPhoto[]>([]);
  const [showFloatingTop, setShowFloatingTop] = useState(false);

  // Initialize and listen to persistent photos
  useEffect(() => {
    let mounted = true;
    loadPhotos().then((loaded) => {
      if (mounted) setPhotos(loaded);
    });

    const handleUpdate = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setPhotos(e.detail);
      }
    };

    photoEvents.addEventListener(PHOTOS_UPDATED_EVENT, handleUpdate);

    const handleScroll = () => {
      setShowFloatingTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mounted = false;
      photoEvents.removeEventListener(PHOTOS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleEnterWorld = () => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    setHasEntered(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionIndex: number) => {
    const catalogItem = PAGES_CATALOG[sectionIndex];
    if (catalogItem) {
      const element = document.getElementById(catalogItem.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#08080a] text-[#ededee] font-sans-modern selection:bg-white/20 selection:text-white flex flex-col">
      {/* Ambient background smoke simulation */}
      <SmokeCanvas />

      {/* Film grain subtle overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-grain opacity-60" />

      {/* Main Experience */}
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="opening-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative z-10 w-full min-h-screen flex items-center justify-center"
          >
            <OpeningScreen onEnter={handleEnterWorld} />
          </motion.div>
        ) : (
          <motion.div
            key="website-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 flex flex-col min-h-screen w-full"
          >
            {/* Modern Website Header Navigation */}
            <HeaderNav
              onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
              onOpenSectionIndex={() => setIsTOCOpen(true)}
              photoCount={photos.length}
            />

            {/* Continuous Vertical Scroll Feed */}
            <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 md:p-8 flex flex-col items-center">
              <div className="w-full space-y-16 sm:space-y-24">
                {/* 01 • The Cover */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <CoverPage />
                </motion.div>

                {/* 02 • About Ramsha */}
                <motion.div
                  id="about"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <AboutPage />
                </motion.div>

                {/* 03 • Her Personality */}
                <motion.div
                  id="personality"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <PersonalityPage />
                </motion.div>

                {/* 04 • Simply Her Cravings */}
                <motion.div
                  id="cravings"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <CravingsPage />
                </motion.div>

                {/* 05 • Black Noir Aesthetic */}
                <motion.div
                  id="aesthetic"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <BlackPage />
                </motion.div>

                {/* 06 • Teri Deewani Playlist */}
                <motion.div
                  id="music"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <TeriDeewaniPage />
                </motion.div>

                {/* 07 • She Was Made To Roam */}
                <motion.div
                  id="roam"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <RoamPage />
                </motion.div>

                {/* 08 • Permanent Memory Wall */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <MemoryWallPage onOpenManager={() => setIsPhotoManagerOpen(true)} />
                </motion.div>

                {/* 09 • Iconic Ramsha Quotes & Kand */}
                <motion.div
                  id="quotes"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <IconicRamshaPage />
                </motion.div>

                {/* 10 • Our Bond */}
                <motion.div
                  id="bond"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <OurBondPage />
                </motion.div>

                {/* 11 • Funny Awards Ceremony */}
                <motion.div
                  id="awards"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <FunnyAwardsPage />
                </motion.div>

                {/* 12 • If Ramsha Were... */}
                <motion.div
                  id="essence"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <IfRamshaWerePage />
                </motion.div>

                {/* 13 • 17 Things About Her */}
                <motion.div
                  id="facts"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <SeventeenThingsPage />
                </motion.div>

                {/* 14 • Dear Ramsha Letter */}
                <motion.div
                  id="letter"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <LetterPage />
                </motion.div>

                {/* 15 • Urdu Shayari */}
                <motion.div
                  id="poetry"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <ShayariPage />
                </motion.div>

                {/* 16 • 17 Birthday Wishes */}
                <motion.div
                  id="wishes"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <WishesPage />
                </motion.div>

                {/* 17 • Her Bucket List */}
                <motion.div
                  id="bucket-list"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <BucketListPage />
                </motion.div>

                {/* 18 • Cinematic Spotlight Portrait */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <PhotoMessagePage />
                </motion.div>

                {/* 19 • Before This Chapter Ends */}
                <motion.div
                  id="valediction"
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <FinalMessagePage />
                </motion.div>

                {/* 20 • Epilogue */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6 }}
                >
                  <BackCoverPage onReplay={handleReplay} />
                </motion.div>
              </div>
            </main>

            {/* Floating Quick Navigation & Upload Pills */}
            <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5">
              {showFloatingTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="p-3 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-xl shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Scroll to Top"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              )}

              <button
                onClick={() => setIsPhotoManagerOpen(true)}
                className="px-4 py-2.5 rounded-full bg-white text-black hover:bg-gray-200 border border-white font-sans-modern text-xs uppercase tracking-widest font-bold shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
                title="Manage Photos"
              >
                <Camera className="w-4 h-4" />
                <span className="hidden sm:inline">Photos</span>
                <span className="px-1.5 py-0.2 rounded-full bg-black text-white font-mono text-[10px]">
                  {photos.length}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Directory of all 20 chapters */}
      <TableOfContentsModal
        isOpen={isTOCOpen}
        onClose={() => setIsTOCOpen(false)}
        onSelectSection={scrollToSection}
      />

      {/* Permanent Photo Management Modal */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        photos={photos}
        onPhotosChange={(updated) => setPhotos(updated)}
      />
    </div>
  );
}
