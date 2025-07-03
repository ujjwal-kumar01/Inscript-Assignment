import { useState } from 'react';

const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

export default function Footer() {
  const [activeTab, setActiveTab] = useState("All Orders");

  return (
    <div className=" fixed bottom-0 items-center space-x-6 border-b bg-white w-full border-gray-200 px-4 py-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={ `mx-5 pb-2 font-medium relative ${
            activeTab === tab
              ? "text-green-900 font-semibold border-b-2 border-green-900 bg-green-50"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
      <button className="text-gray-500 text-xl pb-2 hover:text-gray-700">+</button>
    </div>
  );
}
