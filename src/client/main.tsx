import { render } from 'preact';
import { ConstituentForm } from './constituent-form';
import { CSVExport } from './csv-export';

const App = () => (
  <div>
    <h1>Indigov Take Home</h1>
    <hr />
    <CSVExport />
    <hr />
    <ConstituentForm />
  </div>
);

render(<App />, document.querySelector('main#app') as HTMLElement);
