// ── products.js — Product data & card renderer ─────────────────────────────

const PRODUCTS = [
  { id:'p1', name:'Noir Draped Blazer',        cat:'Women',      price:8499,  orig:11999, img:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80', badge:'New', size:'M' },
  { id:'p2', name:'Ivory Silk Midi Dress',      cat:'Women',      price:6299,  orig:8999,  img:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80', badge:'Sale', size:'S' },
  { id:'p3', name:'Tailored Linen Trousers',    cat:'Men',        price:4999,  orig:6499,  img:'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80', badge:'', size:'L' },
  { id:'p4', name:'Cashmere Turtleneck',        cat:'Women',      price:9799,  orig:12999, img:'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&q=80', badge:'New', size:'M' },
  { id:'p5', name:'Classic Oxford Shirt',       cat:'Men',        price:3499,  orig:4999,  img:'https://images.unsplash.com/photo-1520367745676-56196632073f?w=600&q=80', badge:'', size:'L' },
  { id:'p6', name:'Leather Crossbody Bag',      cat:'Accessories',price:12999, orig:16999, img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', badge:'Luxury', size:'One Size' },
  { id:'p7', name:'Block-Heel Mule',            cat:'Footwear',   price:7299,  orig:9499,  img:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', badge:'', size:'38' },
  { id:'p8', name:'Pinstripe Power Suit',       cat:'Women',      price:15999, orig:21999, img:'https://images.unsplash.com/photo-1594938298603-c8148c4b4f6e?w=600&q=80', badge:'Exclusive', size:'S' },
  { id:'p9', name:'Raw-Edge Denim Jacket',      cat:'Men',        price:5799,  orig:7499,  img:'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80', badge:'', size:'XL' },
  { id:'p10',name:'Gold-Chain Necklace',        cat:'Accessories',price:4299,  orig:5999,  img:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80', badge:'New', size:'One Size' },
  { id:'p11',name:'Satin Slip Skirt',           cat:'Women',      price:3899,  orig:5299,  img:'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80', badge:'Sale', size:'XS' },
  { id:'p12',name:'Chelsea Boot',               cat:'Footwear',   price:8999,  orig:11999, img:'https://images.unsplash.com/photo-1478707585043-99ba7090e7a3?w=600&q=80', badge:'', size:'42' },
  { id:'p13',name:'Oversized Wool Coat',        cat:'Women',      price:18999, orig:24999, img:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80', badge:'Luxury', size:'M' },
  { id:'p14',name:'Slim Chino Trousers',        cat:'Men',        price:3299,  orig:4499,  img:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80', badge:'', size:'32' },
  { id:'p15',name:'Velvet Evening Gown',        cat:'Women',      price:22499, orig:29999, img:'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80', badge:'Exclusive', size:'S' },
  { id:'p16',name:'Structured Tote Bag',        cat:'Accessories',price:9499,  orig:12999, img:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80', badge:'New', size:'One Size' },
];

/* ── Card HTML ── */
function productCard(p) {
  const badge = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
  const origPrice = p.orig ? `<span class="price-original">₹${p.orig.toLocaleString()}</span>` : '';
  return `
    <div class="product-card">
      <div class="product-img-wrap">
        ${badge}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="product-wishlist" onclick="this.classList.toggle('active')" title="Wishlist">♡</button>
        <div class="product-quick-add">
          <button class="btn-primary btn-sm" style="flex:1" onclick="FashionHub.addItem(${JSON.stringify(p).replace(/"/g,'&quot;')})">Add to Cart</button>
          <button class="btn-dark btn-sm" onclick="location.href='shop.html'">View</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          <span class="price-current">₹${p.price.toLocaleString()}</span>
          ${origPrice}
        </div>
      </div>
    </div>`;
}
