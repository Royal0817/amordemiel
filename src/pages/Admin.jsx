import React, { useState } from 'react';
import '../styles/Admin.css';
import { useSubmissions } from '../context/SubmissionsContext.jsx';
import { useGallery } from '../context/GalleryContext.jsx';

const SUPERUSER = {
  username: 'superuser',
  password: 'honeycakes!',
};

const Admin = () => {
  const { submissions, removeSubmission } = useSubmissions();
  const { galleryItems, addGalleryItem, removeGalleryItem } = useGallery();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const [newGalleryItem, setNewGalleryItem] = useState({
    src: '',
    tag: 'Weddings',
    variant: 'square',
    alt: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      credentials.username === SUPERUSER.username &&
      credentials.password === SUPERUSER.password
    ) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleGalleryInput = (event) => {
    const { name, value } = event.target;
    setNewGalleryItem((prev) => ({ ...prev, [name]: value }));
  };

  const submitGalleryItem = (event) => {
    event.preventDefault();
    if (!newGalleryItem.src.trim()) return;
    addGalleryItem({
      ...newGalleryItem,
      alt: newGalleryItem.alt || `Custom cake ${newGalleryItem.tag}`,
    });
    setNewGalleryItem({ src: '', tag: 'Weddings', variant: 'square', alt: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className='admin-page'>
        <form className='admin-card' onSubmit={handleLogin}>
          <h1>Superuser Access</h1>
          <label>
            Username
            <input
              type='text'
              name='username'
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className='error'>{error}</p>}
          <button type='submit' className='cta-primary'>Sign in</button>
        </form>
      </div>
    );
  }

  return (
    <div className='admin-page'>
      <section className='admin-card submissions-card'>
        <div className='admin-card-header'>
          <div>
            <p className='eyebrow'>Inquiry responses</p>
            <h2>Stored submissions</h2>
          </div>
          <span>{submissions.length} total</span>
        </div>
        {submissions.length === 0 ? (
          <p>No submissions yet. Once visitors complete the contact form, entries will appear here.</p>
        ) : (
          <div className='submissions-list'>
            {submissions.map((submission) => (
              <article key={submission.id} className='submission-item'>
                <div>
                  <h3>{submission.name}</h3>
                  <p>{submission.email} · {submission.phone}</p>
                  <p>{submission.eventType} · {submission.guestCount} guests</p>
                  <p className='submission-note'>{submission.details || 'No extra details provided.'}</p>
                  <time dateTime={submission.createdAt}>
                    Submitted {new Date(submission.createdAt).toLocaleString()}
                  </time>
                </div>
                <button type='button' onClick={() => removeSubmission(submission.id)}>
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className='admin-card gallery-card'>
        <div className='admin-card-header'>
          <div>
            <p className='eyebrow'>Gallery management</p>
            <h2>Photos ({galleryItems.length})</h2>
          </div>
        </div>
        <form className='gallery-form' onSubmit={submitGalleryItem}>
          <label>
            Image URL
            <input name='src' value={newGalleryItem.src} onChange={handleGalleryInput} required placeholder='https://example.com/cake.jpg' />
          </label>
          <label>
            Tag
            <select name='tag' value={newGalleryItem.tag} onChange={handleGalleryInput}>
              <option>Weddings</option>
              <option>Quinceañera</option>
              <option>Baby Shower</option>
              <option>Birthday</option>
              <option>Editorial</option>
            </select>
          </label>
          <label>
            Layout style
            <select name='variant' value={newGalleryItem.variant} onChange={handleGalleryInput}>
              <option value='square'>Square</option>
              <option value='tall'>Tall</option>
              <option value='wide'>Wide</option>
            </select>
          </label>
          <label>
            Alt text
            <input name='alt' value={newGalleryItem.alt} onChange={handleGalleryInput} placeholder='Describe the photo' />
          </label>
          <button type='submit' className='cta-secondary'>Add photo</button>
        </form>

        <div className='gallery-admin-grid'>
          {galleryItems.map((item) => (
            <div key={item.id} className='gallery-admin-item'>
              <img src={item.src} alt={item.alt} />
              <div>
                <p>{item.tag}</p>
                <small>{item.variant}</small>
              </div>
              <button type='button' onClick={() => removeGalleryItem(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;
