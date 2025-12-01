"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { candidates } from "@/lib/data";
import Link from "next/link";
import { User } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Input
          placeholder="Search for a candidate..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCandidates.map((candidate) => (
          <Link key={candidate.id} href={`/candidates/${candidate.id}`}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="aspect-square relative flex items-center justify-center bg-muted">
                  <User className="w-24 h-24 text-muted-foreground" />
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
        ))}
      </div>
    </div>
  );
}
