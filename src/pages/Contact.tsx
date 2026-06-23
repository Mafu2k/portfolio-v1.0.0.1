import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/animations/gsap';
import AnimatedText from '@/components/UI/AnimatedText';
import MagneticButton from '@/components/UI/MagneticButton';
import { profile } from '@/content/portfolio';
import './Contact.scss';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact__info > *',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'arch.out', delay: 0.15 }
      );
      gsap.fromTo('.contact__form-wrap',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'arch.out', delay: 0.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState('loading');
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSubmitState('success');
  };

  return (
    <section
      ref={sectionRef}
      className="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="eyebrow">Kontakt</p>

          <AnimatedText
            as="h1"
            id="contact-heading"
            text="Lorem ipsum dolor"
            className="contact__heading"
            immediate
            delay={0.1}
          />

          <p className="contact__desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui.
            Maecenas sed diam eget risus varius blandit sit amet non magna.
          </p>

          <address className="contact__address" aria-label="Dane kontaktowe">
            <div className="contact-detail">
              <span className="contact-detail__label text-mono">Email</span>
              <a
                href={`mailto:${profile.email}`}
                className="contact-detail__value"
                aria-label={`Wyślij email: ${profile.email}`}
              >
                {profile.email}
              </a>
            </div>
            <div className="contact-detail">
              <span className="contact-detail__label text-mono">Telefon</span>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="contact-detail__value"
                aria-label={`Zadzwoń: ${profile.phone}`}
              >
                {profile.phone}
              </a>
            </div>
            <div className="contact-detail">
              <span className="contact-detail__label text-mono">Lokalizacja</span>
              <span className="contact-detail__value">{profile.location}</span>
            </div>
          </address>

          <div className="contact__social" aria-label="Media społecznościowe">
            <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer"
               className="contact__social-link" aria-label="Instagram — nowe okno">
              Instagram
            </a>
            <a href={profile.social.behance} target="_blank" rel="noopener noreferrer"
               className="contact__social-link" aria-label="Behance — nowe okno">
              Behance
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
               className="contact__social-link" aria-label="LinkedIn — nowe okno">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="contact__form-wrap">
          {submitState === 'success' ? (
            <div className="contact__success" role="status" aria-live="polite">
              <span className="contact__success-icon" aria-hidden="true">✓</span>
              <h2 className="contact__success-title">Wiadomość wysłana</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <MagneticButton
                variant="outline"
                onClick={() => setSubmitState('idle')}
                aria-label="Wyślij kolejną wiadomość"
              >
                Wyślij kolejną
              </MagneticButton>
            </div>
          ) : (
            <form
              ref={formRef}
              className="contact__form"
              onSubmit={handleSubmit}
              aria-label="Formularz kontaktowy"
              noValidate
            >
              <div className="form-field">
                <label htmlFor="contact-name" className="form-field__label">Imię i nazwisko</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-field__input"
                  placeholder="Lorem Ipsum"
                  required
                  autoComplete="name"
                  aria-required="true"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email" className="form-field__label">Adres email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="form-field__input"
                  placeholder="lorem@ipsum.com"
                  required
                  autoComplete="email"
                  aria-required="true"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-message" className="form-field__label">Wiadomość</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  className="form-field__input form-field__input--textarea"
                  placeholder="Lorem ipsum dolor sit amet…"
                  required
                  aria-required="true"
                />
              </div>

              <MagneticButton
                type="submit"
                variant="solid"
                disabled={submitState === 'loading'}
                aria-label="Wyślij wiadomość"
              >
                {submitState === 'loading' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
