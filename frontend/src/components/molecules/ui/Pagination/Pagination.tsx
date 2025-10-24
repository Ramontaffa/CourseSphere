import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@atoms/Button/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const baseButtonClasses = "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors bg-zinc-200 cursor-pointer";
  const arrowButtonClasses = `${baseButtonClasses} text-zinc-600 hover:bg-zinc-200 disabled:text-zinc-500 disabled:pointer-events-none`;

  const numberButtonClasses = (page: number) => `
        ${baseButtonClasses}
        ${ currentPage === page
            ? "bg-blue-100 text-main-dark-blue font-bold pointer-events-none"
            : "text-zinc-700 hover:bg-zinc-200"
        }
    `;

  return (
    <nav className="flex items-center justify-center gap-3">
      <Button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowButtonClasses}
        aria-label="Ir para a página anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {currentPage > 1 && (
        <Button
          onClick={() => handlePageClick(currentPage - 1)}
          className={numberButtonClasses(currentPage - 1)}
        >
          {currentPage - 1}
        </Button>
      )}

      <Button
        onClick={() => handlePageClick(currentPage)}
        className={numberButtonClasses(currentPage)}
      >
        {currentPage}
      </Button>

      {currentPage < totalPages && (
        <Button
          onClick={() => handlePageClick(currentPage + 1)}
          className={numberButtonClasses(currentPage + 1)}
        >
          {currentPage + 1}
        </Button>
      )}

      <Button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={arrowButtonClasses}
        aria-label="Ir para a próxima página"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </nav>
  );
}
