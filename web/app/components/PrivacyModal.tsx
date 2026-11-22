"use client";

import { useEffect, useState } from "react";

export default function PrivacyModal() {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const accepted = localStorage.getItem("quicksy_privacy_accepted");
    if (!accepted) {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    if (!isChecked) return;
    localStorage.setItem("quicksy_privacy_accepted", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        
        <div className="p-6 border-b bg-gray-50 rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-800">Privacy Policy & Terms of Service</h2>
          <p className="text-sm text-gray-500 mt-1">Please read and accept to continue to QUICKSY.</p>
        </div>

        <div className="p-6 overflow-y-auto text-sm text-gray-700 space-y-4 flex-1">
          <p><strong>1. Data Protection & Privacy:</strong> QUICKSY collects basic user data (Name, Email, Address, Order History) to facilitate buying and selling. We do not sell your personal data to third parties. Your data is stored securely using encrypted cloud databases. By using this platform, you agree to the collection of this data for operational purposes.</p>
          
          <p><strong>2. Seller & Admin Responsibilities:</strong> Sellers are solely responsible for the accuracy of their product listings, images, and pricing. Admins reserve the right to remove any listing or ban any user that violates community guidelines, uploads illegal content, or attempts to manipulate the platform. </p>
          
          <p><strong>3. Company Disclaimer:</strong> QUICKSY is a marketplace connecting buyers and sellers. We are <strong>not responsible</strong> for the actual physical quality, safety, or legality of the items sold. We are not liable for disputes regarding shipping delays, lost packages, or financial losses incurred during transactions. Users buy and sell at their own risk.</p>

          <p><strong>4. Pros and Cons for Beta Users:</strong> <br/>
          <em>Pros:</em> Free to use during Beta, direct connection between buyers and sellers, easy returns/exchanges management. <br/>
          <em>Cons:</em> Automated payments and courier tracking are currently disabled/offline during the Beta. Users must coordinate shipping and payments manually until further notice.</p>

          <p><strong>5. Account Security:</strong> You are responsible for maintaining the confidentiality of your password. Notify us immediately if you suspect unauthorized access to your account.</p>
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-xl">
          <label className="flex items-start gap-3 cursor-pointer mb-6">
            <input 
              type="checkbox" 
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 w-5 h-5 cursor-pointer accent-blue-600"
            />
            <span className="text-sm font-semibold text-gray-800 select-none">
              I have read, understood, and agree to the Privacy Policy, Terms of Service, and the Beta disclaimers.
            </span>
          </label>

          <button
            onClick={handleAccept}
            disabled={!isChecked}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              isChecked ? "bg-blue-600 hover:bg-blue-700 shadow-lg" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Accept & Continue
          </button>
        </div>

      </div>
    </div>
  );
}