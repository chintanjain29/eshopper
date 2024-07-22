const openQuickView = (product) => {
    let $html;

    if (product.variants.length > 1) {
        let variant_options = document.createElement("div");
        variant_options.setAttribute("class", "main-options");

        product.options.forEach((option) => {
            let option_values = document.createElement("div");
            option_values.setAttribute("class", `main-option-${option.name}`);
            option.values.forEach((value, index) => {
                let label = document.createElement("label");
                label.innerText = value;
                label.setAttribute("for", `${index}-${value}`);
                let input = document.createElement("input");
                input.type = "radio";
                input.name = option.name;
                input.value = value;
                input.setAttribute("id", `${index}-${value}`);
                label.appendChild(input);
                option_values.appendChild(label);
            });
            let wrapper = document.createElement("div");
            wrapper.appendChild(option_values);
            let string_options = wrapper.innerHTML;
            let radio_options = `
                <div class="option-${option.name}">
                    <h6>${option.name}</h6>
                    ${string_options}
                </div>
            `;
            variant_options.innerHTML += radio_options;
        });

        let variants_main = document.createElement("div");
        variants_main.setAttribute("class", "all_variants_main");
        product.variants.forEach((e) => {
            let var_input = document.createElement("input");
            var_input.type = "hidden";
            var_input.value = e.id;
            var_input.name = "variant";
            var_input.dataset.title = e.title;
            variants_main.appendChild(var_input);
        });

        let options_wrapper = document.createElement("div");
        options_wrapper.appendChild(variant_options);
        let string_options_main = options_wrapper.innerHTML;
        $html = `
            <div class="product-main">
                <div class="product-media">
                    <img src="${product.image.src}" alt="${product.handle}" style="max-width: 100%; height: auto;">
                </div>
                <div class="pro-information">
                    ${variants_main.outerHTML}
                    <h5>${product.title}</h5>
                    <p class="price"></p>
                    ${string_options_main}
                    <button type="button" data-id="${product.variants[0].id}" class="custom-quick-add">Add to cart</button>
                </div>
            </div>
        `;
    } else {
        $html = `
            <div class="product-main">
                <div class="product-media">
                    <img src="${product.image.src}" alt="${product.handle}" style="max-width: 100%; height: auto;">
                </div>
                <div class="pro-information">
                    <h5>${product.title}</h5>
                    <p class="price"></p>
                    <button type="button" data-id="${product.variants[0].id}" class="custom-quick-add">Add to cart</button>
                </div>
            </div>
        `;
    }

    document.querySelector(".quickview_popup .quickview_pro_inner").innerHTML = $html;
    document.querySelector(".quickview_popup").style.display = 'block';
    document.querySelector(".quickview_popup").classList.add("active");
    if (product.variants.length > 1) changeOptions();
    addToCart();
};