import { Button } from "@/components/atoms/Button/button";
import { useState } from "react";

interface AddInstructorDialogProps {
  courseId: string;
  onAdd?: () => void;
}

export default function AddInstructorDialog({ courseId, onAdd }: AddInstructorDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="mb-4 text-white bg-main-dark-green hover:bg-main-dark-green-hover hover:text-off-white px-3 py-1 rounded"
      >
        Adicionar Novo Instrutor
      </Button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-medium">Adicionar Instrutor</h3>
            <p className="text-sm text-muted-foreground mt-2">Adicione um novo instrutor pelo email.</p>

            <div className="mt-4">
              <label className="block text-sm">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-2 py-1 mt-1"
                placeholder="email@exemplo.com"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setOpen(false)} className="px-3 py-1 border rounded">
                Cancelar
              </Button>
              <Button
                onClick={onAdd}
                disabled={!email}
                className="px-3 py-1 bg-main-dark-green text-white rounded"
              >
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
