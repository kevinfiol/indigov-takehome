import { render } from 'preact';

const ConstituentForm = () => {
  return (
    <form>
    </form>
  );
};

const App = () => (
  <div>
    <h1>Constituent Entry Form</h1>
    <p>
      See data at <a href="/constituents">/constituents</a>
    </p>
    <ConstituentForm />
  </div>
);

render(<App />, document.querySelector('main#app') as HTMLElement);
