// src/components/biboy-download-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function BiboyDownloadButton() {
  const handleDownload = () => {
    window.open(
      'https://www.figma.com/proto/1FGMmV1LMFUAD7fQvhbzSo/Biboto-s-Extension?page-id=0%3A1&node-id=13-169&p=f&viewport=425%2C128%2C0.17&t=bdDjOsevEd2amvza-1&scaling=contain&content-scaling=fixed&starting-point-node-id=13%3A169',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Button 
      onClick={handleDownload}
      size="lg"
      className="gap-2"
    >
      <Download className="h-5 w-5" />
      Download Biboy Extension
    </Button>
  );
}