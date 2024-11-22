const CSV_EXPORT_ENDPOINT = '/constituents/export';

function triggerCSVDownload(csv = '') {
  const blob = new Blob([csv], { type: 'text/csv; charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'constituents.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}

const submitForm = async (formEl: HTMLFormElement) => {
  const formData = new FormData(formEl);
  const begin = formData.get('begin') as string;
  const end = formData.get('end') as string;
  const params = new URLSearchParams({ begin, end });

  try {
    const res = await fetch(`${CSV_EXPORT_ENDPOINT}?${params.toString()}`);
    const text = await res.text();
    triggerCSVDownload(text);
  } catch (e) {
    console.error(e);
  }
};

export const CSVExport = () => (
  <form
    onSubmit={(ev) => {
      ev.preventDefault();
      submitForm(ev.target as HTMLFormElement);
    }}
  >
    <h2>CSV Export</h2>
    <p>(Optional) Enter a date range to filter constituent signup time</p>
    <fieldset role="group">
      <input type="date" name="begin" />
      <input type="date" name="end" />
      <button type="submit">Export</button>
    </fieldset>
  </form>
);
