// Book Heaven - Sample data + interactivity



let cart = [];
let currentFilter = 'All';

// Render books
function renderBooks(){
  const grid = document.getElementById('bookGrid');
  const filtered = currentFilter === 'All' ? books : books.filter(b => b.category === currentFilter);
  if(filtered.length === 0){ grid.innerHTML = '<p class="muted">No books found in this category.</p>'; return; }
  grid.innerHTML = filtered.map(b => `
    <div class="book-card">
      <div class="book-cover">
    <img src="${b.image}" alt="${b.title}">
     </div>
      <div class="book-info">
        <span class="badge ${b.badge==='Used'?'used':''}">${b.badge}</span>
        <div class="book-title">${b.title}</div>
        <div class="book-author">by ${b.author}</div>
        <div class="book-meta">
          <div><span class="price">₹${b.price}</span><span class="old-price">₹${b.old}</span></div>
        </div>
        <button class="add-btn" onclick="addToCart(${b.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function filterBooks(cat, btn){
  currentFilter = cat;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  if(btn) btn.classList.add('active');
  else {
    const chip = Array.from(document.querySelectorAll('.chip')).find(c => c.textContent.trim() === cat);
    if(chip) chip.classList.add('active');
  }
  renderBooks();
  document.getElementById('books').scrollIntoView({behavior:'smooth'});
}
const books = [
{
  id:1,
  title:"The Silent Patient",
  author:"Alex Michaelides",
  price:399,
  old:599,
  category:"Fiction",
  badge:"Bestseller",
  image:"the silent patient.jfif"
},

{
  id:2,
  title:"Atomic Habits",
  author:"James Clear",
  price:449,
  old:699,
  category:"Non-Fiction",
  badge:"Bestseller",
  image:"atomic habits.jpg"
},

{
  id:3,
  title:"Ponniyin Selvan",
  author:"Kalki Krishnamurthy",
  price:899,
  old:1200,
  category:"Tamil",
  badge:"Classic",
  image:"ponniyin selvan.jfif"
},

{
  id:4,
  title:"NCERT Mathematics Class 10",
  author:"NCERT",
  price:250,
  old:350,
  category:"Textbook",
  badge:"School",
  image:"NCERT mathematics book for class 10.webp"
},

{
  id:5,
  title:"The Very Hungry Caterpillar",
  author:"Eric Carle",
  price:299,
  old:399,
  category:"Children",
  badge:"Kids",
  image:"The Very Hungry Caterpillar.webp"
},

{
  id:6,
  title:"Rich Dad Poor Dad",
  author:"Robert Kiyosaki",
  price:350,
  old:500,
  category:"Second Hand",
  badge:"Used",
  image:"Rich Dad Poor Dad.jfif"
},

{
  id:7,
  title:"Sapiens",
  author:"Yuval Noah Harari",
  price:599,
  old:799,
  category:"Non-Fiction",
  badge:"New",
 image:"Sapiens.png"
},

{
  id:8,
  title:"Mathorubagan",
  author:"Perumal Murugan",
  price:350,
  old:450,
  category:"Tamil",
  badge:"Tamil",
 image:"Mathorubagan.jpg"
},

{
  id:9,
  title:"Physics NCERT XII",
  author:"NCERT",
  price:320,
  old:420,
  category:"Textbook",
  badge:"School",
  image:"Physics NCERT XII.jfif"
},

{
  id:10,
  title:"Wings of Fire",
  author:"A.P.J. Abdul Kalam",
  price:299,
  old:399,
  category:"Non-Fiction",
  badge:"Inspiration",
  image:"wings of fire.jpg"
},

{
  id:11,
  title:"Harry Potter",
  author:"J.K. Rowling",
  price:499,
  old:699,
  category:"Children",
  badge:"Popular",
  image:"harry potter.jpg"
},

{
  id:12,
  title:"Panchatantra Stories",
  author:"Vishnu Sharma",
  price:199,
  old:299,
  category:"Children",
  badge:"Kids",
  image:"panchatantra.jfif"
}
];
// Cart
function addToCart(id){
  const book = books.find(b => b.id === id);
  const existing = cart.find(c => c.id === id);
  if(existing) existing.qty++;
  else cart.push({...book, qty:1});
  updateCart();
  toggleCart(true);
}

function removeFromCart(id){
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

function updateCart(){
  document.getElementById('cartCount').textContent = cart.reduce((s,c)=>s+c.qty,0);
  const items = document.getElementById('cartItems');
  if(cart.length === 0){ items.innerHTML = '<p class="muted">Your cart is empty.</p>'; }
  else {
    items.innerHTML = cart.map(c => `
      <div class="cart-item">
        <div><div class="ci-title">${c.title}</div><small>Qty: ${c.qty}</small></div>
        <div><span class="ci-price">₹${c.price * c.qty}</span><button onclick="removeFromCart(${c.id})">✕</button></div>
      </div>
    `).join('');
  }
  document.getElementById('cartTotal').textContent = cart.reduce((s,c)=>s + c.price*c.qty, 0);
}

function toggleCart(forceOpen){
  const d = document.getElementById('cartDrawer');
  const o = document.getElementById('overlay');
  if(forceOpen === true){ d.classList.add('open'); o.classList.add('show'); }
  else { d.classList.toggle('open'); o.classList.toggle('show'); }
}

function checkout(){
  if(cart.length === 0){ alert('Your cart is empty!'); return; }
  alert(`Thank you! Your order total is ₹${cart.reduce((s,c)=>s+c.price*c.qty,0)}.\nOrder confirmation will be sent shortly.`);
  cart = [];
  updateCart();
  toggleCart();
}

// Search
function handleSearch(e){
  e.preventDefault();
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if(!q) return;
  const grid = document.getElementById('bookGrid');
  const results = books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  if(results.length === 0) grid.innerHTML = `<p class="muted">No books found for "${q}".</p>`;
  else {
    grid.innerHTML = results.map(b => `
    <div class="book-cover">
   <img src="${b.image}" alt="${b.title}">
</div>
        <div class="book-info">
          <span class="badge ${b.badge==='Used'?'used':''}">${b.badge}</span>
          <div class="book-title">${b.title}</div>
          <div class="book-author">by ${b.author}</div>
          <div class="book-meta"><div><span class="price">₹${b.price}</span><span class="old-price">₹${b.old}</span></div></div>
          <button class="add-btn" onclick="addToCart(${b.id})">Add to Cart</button>
        </div>
      </div>`).join('');
  }
  document.getElementById('books').scrollIntoView({behavior:'smooth'});
}

function handleSeller(e){ e.preventDefault(); alert('Thanks! Our seller team will contact you within 24 hours.'); e.target.reset(); }
function handleContact(e){ e.preventDefault(); alert('Message sent! We will get back to you soon.'); e.target.reset(); }

// Menu toggle
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});
document.getElementById('cartBtn').addEventListener('click', () => toggleCart());

// Init
document.getElementById('year').textContent = new Date().getFullYear();
renderBooks();
