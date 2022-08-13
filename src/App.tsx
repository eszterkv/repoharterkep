import { Header, Map } from './sections'

export const App: React.FC = () => (
  <>
    <Header />
    <main style={{ maxHeight: 'calc(100vh - 160px)' }} className="overflow-hidden">
      <Map />
    </main>
  </>
)
