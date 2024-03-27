import '../styles/Contact.css'
import { Link } from 'react-router-dom';
import React from 'react'
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
      Explore our
            <Link to="/menu" className='menu'>Menu</Link>
          </div>
    <form action="/order_confirmation.html" method="post">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required></input>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required></input>

        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required></input>

        <label htmlFor="cake">Choose your cake:</label>
        <select name="Type of cake" id="cake" placeholder='cake flavor'>
        <option value="volvo">Red Velvet</option>
        <option value="volvo">Tres Leches</option>
        <option value="volvo">Cafe w/ Tres Leches</option>
        <option value="volvo">Stawberry</option>
        <option value="saab">chocolate</option>
        <option value="mercedes">vanilla</option>
        <option value="audi">lemon cake</option>
        <option value="audi">Coconut Dream</option>
        </select>

        <label htmlFor="filling">Choose your filling</label>
        <select name="Type of cake" id="filling" placeholder='cake flavor'>
        <option value="volvo">Strawberry Mouse</option>
        <option value="saab">Chocolate</option>
        <option value="mercedes">Vanilla</option>
        <option value="mercedes">Cream Cheese</option>
        <option value="mercedes">Roasted Coconut</option>
        <option value="audi">lemon Curd</option>
        </select>

        <label htmlFor="pickup">Date for pickup:</label>
        <input type='date' id='pickup'/>

        <label htmlFor="instructions">Special Order Instructions:</label>
        <textarea id="instructions" name="instructions"></textarea>

        <label htmlFor="instructions">Allergies</label>
        <textarea id="instructions" name="instructions"></textarea>

        <input type="submit" value="Submit Request" id='submit'></input>
    </form>
    </article>
  </div>
  )
};

export default Contact;
