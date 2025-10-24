"use client";

import { Course } from "@/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@atoms/Card/card";
import { Calendar } from "lucide-react";
import Link from "next/link";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  function formatDate(dateInput: string | Date) {
    if (!dateInput) return "";
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return "Data inválida";
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <Link
      className="group block w-full h-full transition-transform transform hover:scale-103 focus:scale-103"
      href={`/course/${course.id}`}
    >
      <Card className="flex flex-col cursor-pointer transition-shadow duration-300 border-border/50 hover:shadow-md">
        <CardHeader className="grow">
          <h3 className="text-xl font-semibold text-main-blue line-clamp-2 group-hover:text-main-blue-hover transition-colors duration-300">
            {course.name}
          </h3>

          <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-2 h-10">
            {course.description || "Este curso não tem descrição."}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 text-sm text-muted-foreground p-4 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-main-dark-blue" />
            <span>{formatDate(course.start_date)}</span>
          </div>
          <span className="hidden md:inline">→</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-main-dark-blue" />
            <span>{formatDate(course.end_date)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
