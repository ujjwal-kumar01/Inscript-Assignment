import type { FC } from "react";
import {
  ListFilter ,
  EyeOff,
  ArrowDownUp,
  ChevronsRight 
} from "lucide-react";
import { Upload, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import pic from "../assets/Arrow Autofit.png";
import pic2 from "../assets/Arrow Split.svg"; // New action icon
import "../cssfiles/tools.css"; // Import your CSS file

const Toolbar: FC = () => {
  return (
    <div className=" w-full flex items-center justify-between bg-white px-4 py-2 border-b">
    <div className="w-full flex items-center gap-2 text-sm text-gray-700">
      <Button variant="ghost" size="sm" className="gap-1">
        Toolbar <ChevronsRight  className="w-4 h-4" /> 
      </Button>
      <Button variant="ghost" size="sm" className="gap-1">
        <EyeOff className="w-4 h-4" /> Hide fields
      </Button>
      <Button variant="ghost" size="sm" className="gap-1">
        <ArrowDownUp className="w-4 h-4" /> Sort
      </Button>
      <Button variant="ghost" size="sm" className="gap-1">
        <ListFilter  className="w-4 h-4" /> Filter
      </Button>
      <Button variant="ghost" size="sm" className="gap-1">
        <img src={pic} alt="share" className="h-5 w-5" /> Cell view
      </Button>
      </div>

    <div className="flex items-center gap-2">
      {/* Action buttons */}
        <Button variant="outline" size="sm" className="gap-1">
          <Upload className="h-4 w-4" /> Import
        </Button>
        <Button variant="outline" size="sm">
          Export
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" /> Share
        </Button>
    </div>
    {/* New Action button */}
  <Button className="bg-green-900 text-white hover:bg-green-800 font-medium mx-1 h-8">
    <img src={pic2} alt="new action" className="h-5 w-5 inline-block mr-1" />
    New Action
  </Button>
    </div>
  );
};

export default Toolbar;
