import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Idea } from './sections/Idea';
import { Covers } from './sections/Covers';
import { BuiltToLast } from './sections/BuiltToLast';
import { HowIBuild } from './sections/HowIBuild';
import { Tools } from './sections/Tools';
import { Meetup } from './sections/Meetup';
import { WorkTogether } from './sections/WorkTogether';
import { Contribute } from './sections/Contribute';
import { About } from './sections/About';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Idea />
        <Covers />
        <BuiltToLast />
        <HowIBuild />
        <Tools />
        <Meetup />
        <WorkTogether />
        <Contribute />
        <About />
      </main>
      <Footer />
    </>
  );
}
