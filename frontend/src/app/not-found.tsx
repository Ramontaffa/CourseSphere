import Link from 'next/link';
import { Button } from '@/components/atoms/Button/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-200 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Página Não Encontrada (404)
        </h1>
        <p className="mt-4 text-muted-foreground">
          Oops! Parece que a página que você está a procurar não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/">Voltar ao Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}