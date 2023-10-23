const products = document.getElementById("products");
const menFilter = document.getElementById("men-filter");
const womenFilter = document.getElementById("women-filter");
const unisexFilter = document.getElementById("unisex-filter");
const allProduct = document.getElementsByClassName("product-element");

let isCostumizing = false;

const customizeButton = document.getElementById("customize-btn");
const addProductButton = document.getElementById("add-product-btn");
const body = document.getElementsByTagName("BODY")[0];

const addProductForm = document.getElementById("add-product-form");
const closeFormButton = document.getElementById("closeFormButton");
const overlay = document.getElementById("overlay");

addProductButton.addEventListener("click", () => {
  activeFormAddProduct();
  submitFormButton.setAttribute("action", "add");
});

closeFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  deactiveFormAddProduct();
  submitFormButton.removeAttribute("action");
  localStorage.removeItem("edited-product");
});

const activeFormAddProduct = () => {
  addProductForm.classList.remove("d-none");
  body.classList.add("overlay-active");
  overlay.classList.add("active");
};
const deactiveFormAddProduct = () => {
  addProductForm.classList.add("d-none");
  body.classList.remove("overlay-active");
  overlay.classList.remove("active");
};

const getClothes = async () => {
  const response = await fetch("http://localhost:8080/api/v1/clothes");
  const clothes = await response.json();
  clothes.map((clothe, id) => {
    addProductToHTML(clothe, id);
  });
};

customizeButton.addEventListener("click", () => {
  if (isCostumizing) {
    isCostumizing = false;
    addProductButton.classList.add("d-none");
    customizeButton.innerHTML = "Customize Product";
    uncustomizing();
  } else {
    isCostumizing = true;
    addProductButton.classList.remove("d-none");
    customizeButton.innerHTML = "Cancel Customize";
    customizing();
  }
});

const uncustomizing = () => {
  // add setting button
  for (let product of allProduct) {
    product.classList.remove("active");
  }
};
const customizing = () => {
  // add setting button
  for (let product of allProduct) {
    product.classList.add("active");
  }
  // allProduct.foreach((product) => {
  // });
};

const updateClothe = async (id) => {
  var requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputName.value,
    }),
    redirect: "follow",
  };
  const response = await fetch(
    "http://localhost:8080/api/v1/clothes/" + id,
    requestOptions
  );
  if (response.status === 200) {
    location.reload();
  }
};

getClothes();

const addProductToHTML = (clothe, id) => {
  const productEl = document.createElement("div");
  productEl.classList.add("product-element");

  const productImg = document.createElement("img");
  productImg.setAttribute("src", "./assets/img/1.jpg");
  productImg.classList.add("product-image");
  productImg.setAttribute("alt", clothe.name);

  const productInfo = document.createElement("div");
  productInfo.classList.add("product-info");

  const productName = document.createElement("h5");
  productName.innerHTML = clothe.name;
  productName.classList.add("product-name");

  const infoDivider = document.createElement("hr");
  infoDivider.classList.add("info-divider");

  const productPrice = document.createElement("p");
  productPrice.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(clothe.price);
  productPrice.classList.add("product-price");

  const actionContainer = document.createElement("div");
  actionContainer.classList.add("action-container");

  const customizeIconSettings = document.createElement("div");
  customizeIconSettings.classList.add("customize-action");
  customizeIconSettings.classList.add("edit-product");
  customizeIconSettings.setAttribute("key", clothe.id);
  customizeIconSettings.addEventListener("click", () => {
    activeFormAddProduct();
    submitFormButton.setAttribute("action", "update");

    // get product by id
    const prod = getProductById(customizeIconSettings.getAttribute("key"));
    localStorage.setItem(
      "edited-product",
      customizeIconSettings.getAttribute("key")
    );
    prod.then((prod) => {
      inputName.value = prod.name;
      inputSize.value = prod.size;
      inputPrice.value = prod.price;
      inputDescription.value = prod.description;
      inputSize.disabled = true;
      inputPrice.disabled = true;
      inputDescription.disabled = true;
    });
  });

  const customizeIconDelete = document.createElement("div");
  customizeIconDelete.classList.add("customize-action");
  customizeIconDelete.classList.add("delete-product");
  customizeIconDelete.setAttribute("key", clothe.id);
  customizeIconDelete.addEventListener("click", (e) => {
    deleteProduct(customizeIconDelete.getAttribute("key"));
  });

  const settingsIcon = document.createElement("i");
  settingsIcon.classList.add("bi");
  settingsIcon.classList.add("bi-gear");
  settingsIcon.classList.add("customize-action-icon");

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi");
  deleteIcon.classList.add("bi-trash");
  deleteIcon.classList.add("customize-action-icon");

  customizeIconDelete.appendChild(deleteIcon);
  customizeIconSettings.appendChild(settingsIcon);

  actionContainer.appendChild(customizeIconSettings);
  actionContainer.appendChild(customizeIconDelete);

  productInfo.appendChild(productName);
  productInfo.appendChild(infoDivider);
  productInfo.appendChild(productPrice);

  productEl.appendChild(actionContainer);
  productEl.appendChild(productImg);
  productEl.appendChild(productInfo);
  products.appendChild(productEl);
};

// product form
const inputName = document.getElementById("inputName");
const inputSize = document.getElementById("inputSize");
const inputPrice = document.getElementById("inputPrice");
const inputDescription = document.getElementById("inputDescription");

const submitFormButton = document.getElementById("submit-form-button");

// add product
const addProduct = async () => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputName.value,
      size: inputSize.value,
      price: inputPrice.value,
      description: inputDescription.value,
    }),
    redirect: "follow",
  };
  const response = await fetch(
    "http://localhost:8080/api/v1/clothes",
    requestOptions
  );
  console.log(response);
};

submitFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  const act = submitFormButton.getAttribute("action");
  if (act === "add") {
    addProduct();
  } else if (act === "update") {
    const id = localStorage.getItem("edited-product");
    updateClothe(id);
  }
});

// delete product

const deleteProduct = async (id) => {
  var requestOptions = {
    method: "DELETE",
  };
  const response = await fetch(
    "http://localhost:8080/api/v1/clothes/" + id,
    requestOptions
  );

  if (response.status === 200) {
    location.reload();
  }
};

const getProductById = async (id) => {
  const response = await fetch("http://localhost:8080/api/v1/clothes/" + id);
  const clothe = await response.json();
  return clothe[0];
};
