import Banner from './components/banner/Banner';
import FoundationSection from './components/foundation/FoundationSection';
import InitiativesSection from './components/initiatives/InitiativesSection';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-white">
      {/* Full-width Banner */}
      <Banner />

      {/* Foundation Section */}
      <section className="foundation-section pt-6">
        <div className="container mx-auto px-4">
          <FoundationSection />
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="initiatives-section pb-12">
        <div className="container mx-auto px-4">
          <InitiativesSection />
        </div>
      </section>

    </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
