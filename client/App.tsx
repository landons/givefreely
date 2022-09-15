import { ApiProvider } from '@providers/ApiProvider';
import { HelloWorld } from '@components/HelloWorld';

export default function App() {
  return (
    <ApiProvider>
      <HelloWorld />
    </ApiProvider>
  );
}

