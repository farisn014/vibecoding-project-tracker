
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-xl text-red-700">
          !
        </div>

        <h2
          id="delete-dialog-title"
          className="text-lg font-bold text-slate-900"
        >
          Delete this task?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          This action cannot be undone. The task will be permanently
          removed from your board.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete task
          </button>
        </div>
      </section>
    </div>
  );
}
