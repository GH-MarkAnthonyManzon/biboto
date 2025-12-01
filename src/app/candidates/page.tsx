import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { candidates } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";

export default function CandidatesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Candidates
        </h1>
        <p className="text-muted-foreground">
          Explore the profiles of executive-level candidates. All information is
          sourced from public records.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {candidates.map((candidate) => {
          const image = PlaceHolderImages.find(
            (img) => img.id === candidate.imageUrlId
          );
          return (
            <Link key={candidate.id} href={`/candidates/${candidate.id}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="aspect-square relative">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={`Portrait of ${candidate.fullName}`}
                        data-ai-hint={image.imageHint}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-bold font-headline">
                    {candidate.fullName}
                  </CardTitle>
                  <CardDescription>
                    For {candidate.positionSought}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">
                    {candidate.politicalAffiliation}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
