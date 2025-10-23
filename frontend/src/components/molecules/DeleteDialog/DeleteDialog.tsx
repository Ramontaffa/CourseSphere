'use client';

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/atoms/Dialog/dialog";
import { Button } from "@/components/atoms/Button/button";
import { Trash, Loader2 } from "lucide-react";

interface DeleteDialogProps {
  id: string | number;
  onDelete: (id: string | number) => Promise<void>;
  header?: boolean;
}

export function DeleteDialog({ id, onDelete, header }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(id);
      setOpen(false);
    } catch (err) {
      console.error('Erro ao deletar item:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const headerStyles = header ? "text-white bg-red-500 hover:bg-red-600" : "text-red-500 hover:bg-zinc-100 hover:text-red-700";

  // Prevent closing the dialog while deletion is in progress
  const handleOpenChange = (next: boolean) => {
    if (isDeleting) return;
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={`transition border-none shadow-none ${headerStyles}`} variant="outline">
          <Trash size={16} /> {header ? "Excluir" : ""}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <p className="mt-2 mb-4">Tem certeza que deseja excluir este item?</p>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>Cancelar</Button>
          </DialogClose>
          <Button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700" disabled={isDeleting}>
            {isDeleting ? (
              <span className="inline-flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </span>
            ) : (
              'Excluir'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
