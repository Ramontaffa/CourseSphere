import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/atoms/Dialog/dialog";
import { Button } from "@/components/atoms/Button/button";
import { Trash } from "lucide-react";

interface DeleteDialogProps {
  id: string | number;
  onDelete: (id: string | number) => Promise<void>;
  header?: boolean;
}

export function DeleteDialog({ id, onDelete, header }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(id);
    setOpen(false);
  };

  const headerStyles = header ? "text-white bg-red-500 hover:bg-red-600" : "text-red-500 hover:bg-zinc-100 hover:text-red-700";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">Excluir</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
