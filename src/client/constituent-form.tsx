import { useState } from 'preact/hooks';

const SUBMISSION_ENDPOINT = '/constituents';

export const ConstituentForm = () => {
  const [alert, setAlert] = useState('');

  const submitForm = async (formEl: HTMLFormElement) => {
    const formData = new FormData(formEl);

    try {
      const res = await fetch(SUBMISSION_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw Error(res.statusText);
      }

      setAlert('Constituent data submitted.');
      formEl.reset();
    } catch (e) {
      console.error(e);
      setAlert('Unable to submit or update constituent. Check system logs.');
    }
  };

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        setAlert('');
        submitForm(ev.target as HTMLFormElement);
      }}
    >
      <h2>Constituent Entry Form</h2>
      <p>
        See data at <a href="/constituents">/constituents</a>
      </p>
      <fieldset>
        <label>
          Name
          <input
            name="name"
            placeholder="First name"
            autocomplete="name"
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            autocomplete="email"
            required
          />
        </label>

        <label>
          Address
          <input
            type="address"
            name="address"
            placeholder="Address"
            autocomplete="address"
            required
          />
        </label>
      </fieldset>

      <button type="submit">Submit Constituent</button>

      {alert && <article role="alert">{alert}</article>}
    </form>
  );
};
