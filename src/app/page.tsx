import {ArrowRightIcon, SparklesIcon} from "@heroicons/react/24/outline";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export default function Home() {
    return (
        <main className="mx-auto grid min-h-[calc(100vh-138px)] max-w-5xl gap-10 px-6 py-16 lg:grid-cols-[1fr_380px] lg:items-center">
            <section>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="gap-1.5">
                        <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true"/>
                        Next.js
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                        <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true"/>
                        Tailwind CSS
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                        <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true"/>
                        ShadcnUI
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5">
                        <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true"/>
                        HeroIcons
                    </Badge>
                </div>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                    Start clean, then make it yours.
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                    This template is intentionally small: app router, TypeScript,
                    Tailwind CSS, and shadcn-style components without an icon library.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Button className="gap-2">
                        Get started
                        <ArrowRightIcon className="h-4 w-4" aria-hidden="true"/>
                    </Button>
                    <Button variant="outline">View components</Button>
                </div>
            </section>

            <Card>
                <CardHeader>
                    <CardTitle>Starter Form</CardTitle>
                    <CardDescription>
                        A tiny component sample for your next project.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="project-name">Project name</Label>
                        <Input id="project-name" placeholder="My next app"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-notes">Notes</Label>
                        <Textarea id="project-notes" placeholder="What are you building?"/>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="template-ready"/>
                        <Label htmlFor="template-ready">Ready to customize</Label>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
