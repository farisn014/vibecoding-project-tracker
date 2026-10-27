
export default function SettingsPanel({
  theme,
  setTheme,
  textSize,
  setTextSize,
  onClose,
}) {
  return (
    <section
      role="region"
      aria-labelledby="settings-title"
      className="absolute right-0 top-full z-50 mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-xl"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="settings-title" className="text-lg font-bold">
          Accessibility settings
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close settings"
          className="rounded-lg px-3 py-1 text-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          ×
        </button>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">
          Appearance
        </legend>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            aria-pressed={theme === 'light'}
            onClick={() => setTheme('light')}
            className={`rounded-lg border px-3 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              theme === 'light'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                : 'border-slate-300 hover:bg-slate-50'
            }`}
          >
            ☀ Light
          </button>

          <button
            type="button"
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme('dark')}
            className={`rounded-lg border px-3 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              theme === 'dark'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                : 'border-slate-300 hover:bg-slate-50'
            }`}
          >
            ☾ Dark
          </button>
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold">
          Text size
        </legend>

        <div className="space-y-2">
          {[
            { value: 'default', label: 'Default', sample: 'Aa' },
            { value: 'large', label: 'Large', sample: 'Aa' },
            {
              value: 'extra-large',
              label: 'Extra large',
              sample: 'Aa',
            },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 ${
                textSize === option.value
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="text-size"
                  value={option.value}
                  checked={textSize === option.value}
                  onChange={() => setTextSize(option.value)}
                  className="accent-indigo-600"
                />

                <span className="text-sm font-medium">
                  {option.label}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={
                  option.value === 'large'
                    ? 'text-lg'
                    : option.value === 'extra-large'
                      ? 'text-2xl'
                      : 'text-base'
                }
              >
                {option.sample}
              </span>
            </label>
          ))}
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Larger text may change the layout of the board.
        </p>
      </fieldset>

      <button
        type="button"
        onClick={() => {
          setTheme('light');
          setTextSize('default');
        }}
        className="mt-5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Reset settings
      </button>
    </section>
  );
}
