import '../styles/Contact.css'
import { Link } from 'react-router-dom';
// import Nav from './Nav.jsx'

const Contact = () => {
  return (
  <div className='contact-container'>
     <div className='gallery-nav-item'>
           <Link to="/">Homepage</Link>
      </div>
    <article className='info'>
    Our handcrafted custom cakes require a serious amount of time to make. For that reason,
    it's preferred that orders be finalized at least 2 weeks before the event date.

    <div className='menu-link'>
      Explore our menu!
            <Link to="/menu">Menu</Link>
          </div>
    <form action="/order_confirmation.html" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required></input>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required></input>

        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required></input>

        <label for="cars">Choose your cake:</label>
        <select name="Type of cake" id="cars" placeholder='cake flavor'>
        <option value="volvo">red velvet</option>
        <option value="saab">chocolate</option>
        <option value="mercedes">vanilla</option>
        <option value="audi">lemon cake</option>
        </select>

        <label for="cars">Choose your filling</label>
        <select name="Type of cake" id="cars" placeholder='cake flavor'>
        <option value="volvo">red velvet</option>
        <option value="saab">chocolate</option>
        <option value="mercedes">vanilla</option>
        <option value="audi">lemon cake</option>
        </select>

        <label for="address">Date for pickup:</label>
        <textarea id="address" name="address" required></textarea>

        <label for="instructions">Special Order Instructions:</label>
        <textarea id="instructions" name="instructions"></textarea>

        <input type="submit" value="Submit Request"></input>
    </form>
    </article>
  </div>
  )
};

export default Contact;
