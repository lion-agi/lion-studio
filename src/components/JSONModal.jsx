import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const JSONModal = ({ isOpen, onClose, jsonData }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    const jsonString = JSON.stringify(jsonData, null, 2);
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "The JSON data has been copied to your clipboard.",
        });
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy failed",
          description: "Failed to copy JSON data. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Workflow JSON Schema</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow mt-4 border rounded-md p-4">
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </ScrollArea>
        <div className="flex justify-end mt-4 space-x-2">
          <Button onClick={handleCopy}>Copy to Clipboard</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JSONModal;