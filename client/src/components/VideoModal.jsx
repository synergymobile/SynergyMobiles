import React from 'react';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  const isUploadedVideo = videoUrl?.startsWith('blob:') || videoUrl?.startsWith('data:');

  return (
    <div 
      className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} 
      id="videoModal"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-black rounded-xl w-full max-w-4xl overflow-hidden relative shadow-2xl z-10 flex flex-col">
        <button 
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-red-600 text-white transition-colors z-20 backdrop-blur-md" 
          onClick={onClose}
        >
          &times;
        </button>
        
        <div className="relative w-full aspect-video bg-black">
          {isUploadedVideo ? (
              <video controls className="w-full h-full object-contain">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
          ) : (
              <iframe 
                  id="videoPlayer" 
                  src={videoUrl} 
                  className="w-full h-full"
                  frameBorder="0" 
                  allowFullScreen 
                  title="Video Player"
              ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
