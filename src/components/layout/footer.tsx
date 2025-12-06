export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs text-muted-foreground max-w-2xl">
            <strong>Disclaimer:</strong> This platform aggregates publicly
            available information from official and reputable sources. It does
            not endorse any candidate and exists solely for voter education.
            All data is presented for informational purposes and should be
            verified with primary sources.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} Biboto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
