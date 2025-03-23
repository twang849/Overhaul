import { useState } from "react";

export default function Home() {
  // Function to open the popup window
  const openPopup = () => {
    window.open("/for-kids.html", "Trivia Quiz", "width=800,height=600");
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Main Section */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={openPopup} // Calls the openPopup function on click
              className="bg-orange-500 text-white px-6 py-4 rounded-lg font-semibold text-lg"
            >
              Play a Game!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
