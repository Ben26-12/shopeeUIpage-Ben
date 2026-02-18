const API_URL = "https://dummyjson.com/products?limit=10";
const getProducts = async () => {
  const productList = document.querySelector("#product-list");
  //render with skeleton trước
  const skeletons = Array(10)
    .fill(
      `
        <div class="col l-2-4 m-4 c-6">
            <div class="product-container skeleton">
                <div class="skeleton-img"></div>
                <div class="skeleton-text" style="width: 80%; margin-top: 10px;"></div>
                <div class="skeleton-text" style="width: 50%;"></div>
            </div>
        </div>
    `,
    )
    .join("");
  productList.innerHTML = skeletons;
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const products = data.products;
    const htmls = products
      .map((product) => {
        // Tính toán giá gốc dựa trên % giảm giá của API
        const originalPrice = (
          product.price /
          (1 - product.discountPercentage / 100)
        ).toFixed(2);

        return `
                <div class="col l-2-4 m-4 c-6">
                    <div class="product-container">
                        <div class="product-img" style="background-image: url('${product.thumbnail}')"></div>
                        
                        <h4 class="product-name">${product.title} - ${product.description}</h4>
                        
                        <div class="product-price">
                            <span class="product-price-original">$${originalPrice}</span>
                            <span class="product-price-sales">$${product.price}</span>
                        </div>
                        
                        <div class="product-testimonial">
                            <div class="product-favourite ${product.rating > 4.5 ? "product-favourite--liked" : ""}">
                                <i class="product-favourite-icon-default fa-solid fa-heart"></i>
                                <i class="product-favourite-icon-liked fa-solid fa-heart"></i>
                            </div>
                            
                            <div class="product-quantity-sold">
                                Đã bán <div class="product-quantity-sold-number">${product.stock}k</div>
                            </div>
                            
                            <div class="star-rating-wrapper">
                                ${renderStars(product.rating)}
                            </div>
                        </div>
                        
                        <div class="product-origin">${product.brand || "Global"}</div>
                        
                        <div class="product-tag-favourite">
                            <i class="fa-solid fa-check"></i>
                            <span>Yêu thích</span>
                        </div>
                        
                        <div class="product-discount-tag">
                            <span class="product-discount-percent">${Math.round(product.discountPercentage)}%</span>
                            <span class="product-discount-text">GIẢM</span>
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");
    productList.innerHTML = htmls;
  } catch (err) {
    console.error(err);
  }
};
function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="product-star-rating-icon ${i <= Math.round(rating) ? "product-star-rating-gold" : ""} fa-solid fa-star"></i>`;
  }
  return stars;
}

getProducts();
