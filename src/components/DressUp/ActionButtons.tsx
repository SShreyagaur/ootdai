
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  onReset: () => void;
  onDownload: () => void;
}

const ActionButtons = ({ onReset, onDownload }: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onReset}
        className="hover:bg-red-50 hover:border-red-200"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onDownload}
        className="hover:bg-green-50 hover:border-green-200"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ActionButtons;
