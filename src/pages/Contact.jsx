import '../styles/Contact.css';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const cakeOptions = [
  'Signature Tasting Sampler',
  'Red Velvet',
  'Tres Leches',
  'Cafe & Tres Leches',
  'Strawberry',
  'Chocolate',
  'Vanilla',
  'Lemon',
  'Coconut Dream',
];

const fillingOptions = [
  'Strawberry Mousse',
  'Chocolate Truffle',
  'Vanilla Bean',
  'Cream Cheese',
  'Roasted Coconut',
  'Lemon Curd',
];

const dessertSelections = [
  'Mini dessert box (12 pieces)',
  'Cupcake dozen',
  'Macaron assortment',
  'Dessert shooters (24 count)',
  'Sugar cookie set',
];

const eventTypes = ['Wedding', 'Quinceañera', 'Baby Shower', 'Birthday', 'Corporate', 'Editorial'];
const guestRanges = ['Less than 30', '30 - 75', '75 - 125', '125 - 200', '200+'];
const dessertAddOns = ['Cupcakes', 'Dessert Shooters', 'Macarons', 'Sugar Cookies', 'Mini Cakes'];

const Contact = () => {
  const [activeForm, setActiveForm] = useState('desserts');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setSubmitMessage('');
    setSubmitError('');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submission = {};
    for (const [key, value] of formData.entries()) {
      if (submission[key]) {
        submission[key] = Array.isArray(submission[key])
          ? [...submission[key], value]
          : [submission[key], value];
      } else {
        submission[key] = value;
      }
    }
    submission.addons = formData.getAll('addons');
    setIsSubmitting(true);
    fetch('/api/submit.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.status !== 'ok') {
          throw new Error(data?.message || 'Submission failed.');
        }
        setSubmitMessage('Thanks! Your inquiry has been received.');
        form.reset();
      })
      .catch((error) => {
        setSubmitError(error.message || 'Submission failed.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  return (
    <div className='contact-page'>
      <section className='contact-hero'>
        <div className='contact-hero-copy'>
          <p className='eyebrow'>Inquiry Form</p>
          <h1>Let's design the sweet centerpiece for your celebration.</h1>
          <p className='lede'>Complete the fields below to share your event date, guest count, and flavor dreams. We respond within 48 hours with next steps, availability, and a custom quote.</p>

          <ul className='response-stats'>
            <li>
              <strong>48 hrs</strong>
              <span>Average reply time</span>
            </li>
            <li>
              <strong>2-3 months</strong>
              <span>Ideal booking window</span>
            </li>
          </ul>
        </div>

        <div className='contact-hero-card'>
          <h3>Need guidance?</h3>
          <p>We're here to capture your color palette, heirloom florals, and favorite flavors in one sculpted showpiece.</p>
          <p className='card-note'>Serving the DC metroploitan area</p>
          <Link to='/gallery' className='text-link'>View recent work</Link>
        </div>
      </section>

      <section className='contact-form-section' id='contact-forms'>
        <p className='form-section-eyebrow'>Choose your inquiry</p>
        <div className='form-tabs' role='tablist' aria-label='Inquiry types'>
          <button
            type='button'
            role='tab'
            aria-selected={activeForm === 'desserts'}
            className={`form-tab ${activeForm === 'desserts' ? 'active' : ''}`}
            onClick={() => setActiveForm('desserts')}
          >
            Cakes
          </button>
          <button
            type='button'
            role='tab'
            aria-selected={activeForm === 'cakes'}
            className={`form-tab ${activeForm === 'cakes' ? 'active' : ''}`}
            onClick={() => setActiveForm('cakes')}
          >
            Desserts
          </button>
          <button
            type='button'
            role='tab'
            aria-selected={activeForm === 'tastings'}
            className={`form-tab ${activeForm === 'tastings' ? 'active' : ''}`}
            onClick={() => setActiveForm('tastings')}
          >
            Wedding tastings
          </button>
        </div>

        {activeForm === 'desserts' && (
        <div className='form-card' role='tabpanel'>
          <h2>Cake inquiry</h2>
          <p className='form-subhead'>We’d love to learn more about the cake you have in mind.</p>

          <form onSubmit={handleSubmit} id='dessert-form'>
            <input type='hidden' name='inquiryType' value='Desserts' />
            <div className='form-grid two-col'>
              <label>
                Full name
                <input type='text' name='name' required placeholder='First and last name' />
              </label>
              <label>
                Email
                <input type='email' name='email' required placeholder='you@email.com' />
              </label>
              <label>
                Phone number
                <input type='tel' name='phone' required placeholder='(555) 123-4567' />
              </label>
              <label>
                Event type
                <select name='eventType' defaultValue='' required>
                  <option value='' disabled>Select occasion</option>
                  {eventTypes.map((event) => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className='form-grid three-col'>
              <label>
                Event date
                <input type='date' name='eventDate' required />
              </label>
              <label>
                Guest count
                <select name='guestCount' defaultValue='' required>
                  <option value='' disabled>Select range</option>
                  {guestRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </label>
              <label>
                Venue
                <input type='text' name='venue' placeholder='Venue name + city' />
              </label>
            </div>

            <div className='form-grid two-col'>
              <label>
                Dessert selection
                <select name='dessertSelection' defaultValue='' required>
                  <option value='' disabled>Select assortment</option>
                  {dessertSelections.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                Flavor direction
                <input type='text' name='flavorNotes' placeholder='Citrus, chocolate-forward, floral...' />
              </label>
            </div>

            <div className='checkbox-field'>
              <p>Dessert add-ons</p>
              <div className='checkbox-grid'>
                {dessertAddOns.map((addon) => (
                  <label key={addon}>
                    <input type='checkbox' name='addons' value={addon} />
                    <span>{addon}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className='textarea-label'>
              Tell us about your inspiration, colors, or must-have details
              <textarea name='details' rows={4} placeholder='Pinterest board links, themes, or notes'></textarea>
            </label>

            <label className='textarea-label'>
              Allergies or dietary notes
              <textarea name='allergies' rows={3} placeholder='Let us know about any restrictions'></textarea>
            </label>

            <button type='submit' className='cta-primary submit-btn' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit dessert inquiry'}
            </button>
            {submitMessage && <p className='submit-status'>{submitMessage}</p>}
            {submitError && <p className='submit-error'>{submitError}</p>}
          </form>
        </div>
        )}

        {activeForm === 'cakes' && (
        <div className='form-card' role='tabpanel'>
          <h2>Cake inquiry</h2>
          <p className='form-subhead'>Share the cake size, flavors, and the story you want to tell.</p>

          <form onSubmit={handleSubmit} id='cake-form'>
            <input type='hidden' name='inquiryType' value='Cakes' />
            <div className='form-grid two-col'>
              <label>
                Full name
                <input type='text' name='name' required placeholder='First and last name' />
              </label>
              <label>
                Email
                <input type='email' name='email' required placeholder='you@email.com' />
              </label>
              <label>
                Phone number
                <input type='tel' name='phone' required placeholder='(555) 123-4567' />
              </label>
              <label>
                Event type
                <select name='eventType' defaultValue='' required>
                  <option value='' disabled>Select occasion</option>
                  {eventTypes.map((event) => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className='form-grid three-col'>
              <label>
                Event date
                <input type='date' name='eventDate' required />
              </label>
              <label>
                Guest count
                <select name='guestCount' defaultValue='' required>
                  <option value='' disabled>Select range</option>
                  {guestRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </label>
              <label>
                Venue
                <input type='text' name='venue' placeholder='Venue name + city' />
              </label>
            </div>

            <div className='form-grid two-col'>
              <label>
                Cake flavor
                <select name='cakeFlavor' defaultValue='' required>
                  <option value='' disabled>Select flavor</option>
                  {cakeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                Filling choice
                <select name='filling' defaultValue=''>
                  <option value='' disabled>Select filling</option>
                  {fillingOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className='textarea-label'>
              Design notes or inspiration
              <textarea name='details' rows={4} placeholder='Color palette, florals, tiers, or themes'></textarea>
            </label>

            <label className='textarea-label'>
              Allergies or dietary notes
              <textarea name='allergies' rows={3} placeholder='Let us know about any restrictions'></textarea>
            </label>

            <button type='submit' className='cta-primary submit-btn' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit cake inquiry'}
            </button>
            {submitMessage && <p className='submit-status'>{submitMessage}</p>}
            {submitError && <p className='submit-error'>{submitError}</p>}
          </form>
        </div>
        )}

        {activeForm === 'tastings' && (
        <div className='form-card' role='tabpanel'>
          <h2>Wedding tasting request</h2>
          <p className='form-subhead'>Reserve a tasting session to explore flavor pairings.</p>

          <form onSubmit={handleSubmit} id='tasting-form'>
            <input type='hidden' name='inquiryType' value='Wedding tasting' />
            <input type='hidden' name='eventType' value='Wedding' />
            <div className='form-grid two-col'>
              <label>
                Full name
                <input type='text' name='name' required placeholder='First and last name' />
              </label>
              <label>
                Email
                <input type='email' name='email' required placeholder='you@email.com' />
              </label>
              <label>
                Phone number
                <input type='tel' name='phone' required placeholder='(555) 123-4567' />
              </label>
              <label>
                Event date
                <input type='date' name='eventDate' required />
              </label>
            </div>

            <div className='form-grid two-col'>
              <label>
                Wedding venue
                <input type='text' name='venue' placeholder='Venue name + city' />
              </label>
              <label>
                Estimated guest count
                <select name='guestCount' defaultValue='' required>
                  <option value='' disabled>Select range</option>
                  {guestRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className='form-grid two-col'>
              <label>
                Preferred tasting date
                <input type='date' name='tastingDate' />
              </label>
              <label>
                Preferred time
                <input type='time' name='tastingTime' />
              </label>
            </div>

            <label className='textarea-label'>
              Flavor interests
              <textarea name='details' rows={3} placeholder='Favorite flavor profiles, dietary notes, or questions'></textarea>
            </label>

            <label className='textarea-label'>
              Allergies or dietary notes
              <textarea name='allergies' rows={3} placeholder='Let us know about any restrictions'></textarea>
            </label>

            <button type='submit' className='cta-primary submit-btn' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Request tasting'}
            </button>
            {submitMessage && <p className='submit-status'>{submitMessage}</p>}
            {submitError && <p className='submit-error'>{submitError}</p>}
          </form>
        </div>
        )}
      </section>
    </div>
  );
};

export default Contact;
