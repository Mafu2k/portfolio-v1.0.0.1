import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '@/components/UI/AnimatedText';
import MagneticButton from '@/components/UI/MagneticButton';
import './NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <section className="not-found" aria-labelledby="not-found-heading">
      <p className="eyebrow">Error 404</p>
      <AnimatedText
        as="h1"
        id="not-found-heading"
        text="404"
        className="not-found__code"
        immediate
        delay={0.05}
      />
      <p className="not-found__desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna.
      </p>
      <MagneticButton variant="outline">
        <Link to="/" aria-label="Wróć na stronę główną">
          Strona główna
        </Link>
      </MagneticButton>
    </section>
  );
};

export default NotFound;
