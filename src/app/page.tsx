"use client";

import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const copy = t.home;

  return (
    <>
      <main className="mx-auto grid min-h-[calc(100vh-142px)] max-w-5xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <section>
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="gap-1.5">
            <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Next.js
          </Badge>
          <Badge variant="secondary" className="gap-1.5">
            <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Tailwind CSS
          </Badge>
          <Badge variant="secondary" className="gap-1.5">
            <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
            ShadcnUI
          </Badge>
          <Badge variant="secondary" className="gap-1.5">
            <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
            HeroIcons
          </Badge>
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {copy.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button className="gap-2">
            {copy.primaryAction}
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="outline">{copy.secondaryAction}</Button>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{copy.form.title}</CardTitle>
          <CardDescription>
            {copy.form.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">{copy.form.nameLabel}</Label>
            <Input id="project-name" placeholder={copy.form.namePlaceholder} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-notes">{copy.form.notesLabel}</Label>
            <Textarea id="project-notes" placeholder={copy.form.notesPlaceholder} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="template-ready" />
            <Label htmlFor="template-ready">{copy.form.readyLabel}</Label>
          </div>
        </CardContent>
      </Card>
    </main>
    <ReviewsSection />
    </>
  );
}
