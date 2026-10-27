
const DELIVERABLES_STORAGE_KEY = 'vibetracker.deliverables';

export const DELIVERABLES = [
  {
    id: 'presentation',
    title: 'Presentation',
    description: 'Slides for presenting the project.',
  },
  {
    id: 'demo',
    title: 'Demo',
    description: 'Link to the working project demonstration.',
  },
  {
    id: 'report',
    title: 'Report',
    description: 'Project report and written deliverables.',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Supporting and technical documentation.',
  },
];

export function loadDeliverables() {
  const emptyDeliverables = Object.fromEntries(
    DELIVERABLES.map((deliverable) => [deliverable.id, '']),
  );

  try {
    const saved = window.localStorage.getItem(
      DELIVERABLES_STORAGE_KEY,
    );

    if (!saved) {
      return emptyDeliverables;
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      Array.isArray(parsed)
    ) {
      return emptyDeliverables;
    }

    return Object.fromEntries(
      DELIVERABLES.map((deliverable) => [
        deliverable.id,
        typeof parsed[deliverable.id] === 'string'
          ? parsed[deliverable.id]
          : '',
      ]),
    );
  } catch {
    return emptyDeliverables;
  }
}

export default function DeliverablesBoard({
  deliverables,
  onUpdate,
}) {
  return (
    <section
      aria-labelledby="deliverables-title"
      className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h2
          id="deliverables-title"
          className="font-bold text-slate-900"
        >
          Project deliverables
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Keep the key project links together so your team can find
          them quickly.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DELIVERABLES.map((deliverable) => {
          const url = deliverables[deliverable.id] || '';
          const hasUrl = url.trim().length > 0;

          return (
            <div
              key={deliverable.id}
              className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  aria-label={hasUrl ? 'Link added' : 'No link added'}
                  title={hasUrl ? 'Link added' : 'No link added'}
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    hasUrl
                      ? 'bg-emerald-500'
                      : 'border-2 border-slate-300 bg-white'
                  }`}
                />

                <h3 className="font-semibold text-slate-900">
                  {deliverable.title}
                </h3>
              </div>

              <p className="mb-3 min-h-10 text-sm leading-5 text-slate-500">
                {deliverable.description}
              </p>

              <label
                htmlFor={`deliverable-${deliverable.id}`}
                className="mb-1.5 block text-xs font-semibold text-slate-600"
              >
                URL
              </label>

              <input
                id={`deliverable-${deliverable.id}`}
                type="url"
                inputMode="url"
                value={url}
                onChange={(event) =>
                  onUpdate(deliverable.id, event.target.value)
                }
                placeholder="https://..."
                className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {hasUrl && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block break-all text-sm font-semibold text-indigo-700 hover:text-indigo-900 hover:underline"
                >
                  Open link ↗
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
