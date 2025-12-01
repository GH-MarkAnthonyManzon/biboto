"use client";

import { useState } from "react";
import { candidates } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Candidate } from "@/lib/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function ComparePage() {
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);

  const handleCheckboxChange = (candidate: Candidate) => {
    setSelectedCandidates((prev) =>
      prev.some((c) => c.id === candidate.id)
        ? prev.filter((c) => c.id !== candidate.id)
        : [...prev, candidate]
    );
  };

  const comparisonRows = [
    {
      label: "Position Sought",
      getValue: (c: Candidate) => c.positionSought,
    },
    {
      label: "Political Affiliation",
      getValue: (c: Candidate) => c.politicalAffiliation,
    },
    {
      label: "Education",
      getValue: (c: Candidate) => (
        <ul className="list-disc pl-4 text-xs">
          {c.education.map((edu, i) => (
            <li key={i}>{`${edu.degree}, ${edu.institution} (${edu.year})`}</li>
          ))}
        </ul>
      ),
    },
    {
      label: "Career Highlights",
      getValue: (c: Candidate) => (
        <ul className="list-disc pl-4 text-xs">
          {c.careerTimeline
            .filter((item) => item.isMilestone)
            .map((item, i) => (
              <li key={i}>{`${item.title} (${item.date})`}</li>
            ))}
        </ul>
      ),
    },
    {
      label: "Platforms",
      getValue: (c: Candidate) => (
         <ul className="list-disc pl-4 text-xs">
          {c.platforms.map((p, i) => (
            <li key={i}>{p.title}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Compare Candidates
        </h1>
        <p className="text-muted-foreground">
          Select candidates to compare their background and platforms side-by-side.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Candidates</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center space-x-2">
              <Checkbox
                id={candidate.id}
                onCheckedChange={() => handleCheckboxChange(candidate)}
                checked={selectedCandidates.some((c) => c.id === candidate.id)}
              />
              <Label htmlFor={candidate.id} className="text-sm font-medium leading-none cursor-pointer">
                {candidate.fullName}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedCandidates.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 font-headline">Comparison</h2>
           <Card>
             <ScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] font-semibold text-base">Feature</TableHead>
                    {selectedCandidates.map((c) => (
                      <TableHead key={c.id} className="font-semibold text-base">{c.fullName}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonRows.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell className="font-medium">{row.label}</TableCell>
                      {selectedCandidates.map((c) => (
                        <TableCell key={c.id}>{row.getValue(c)}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
              </ScrollArea>
           </Card>
        </div>
      )}
    </div>
  );
}
