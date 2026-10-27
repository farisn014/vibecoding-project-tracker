
export function HandoffToast({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex max-w-sm items-start gap-3 rounded-xl border border-teal-200 bg-white p-4 shadow-xl">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
        ✓
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">
          Task handed off
        </p>
        <p className="mt-1 text-sm text-slate-600">{message}</p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss hand-off notification"
        className="rounded-lg px-2 text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      >
        ×
      </button>
    </div>
  );
}

export function CopyToast({ message, onDismiss }) {
  if (!message) return null;

  const failed = message.startsWith('Copy failed');

  return (
    <div
      role="status"
      className={`fixed bottom-4 left-4 z-[70] flex max-w-sm items-start gap-3 rounded-xl border bg-white p-4 shadow-xl ${
        failed ? 'border-red-200' : 'border-emerald-200'
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          failed
            ? 'bg-red-100 text-red-700'
            : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        {failed ? '!' : '✓'}
      </div>

      <p className="min-w-0 flex-1 text-sm text-slate-700">
        {message}
      </p>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss copy notification"
        className="rounded-lg px-2 text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      >
        ×
      </button>
    </div>
  );
}
