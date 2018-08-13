

window.addEventListener('load', () => {
    const submit = () => {
        const xhr = new XMLHttpRequest();
        const input_search = document.getElementById('businessId').value;

        const url = `http://localhost:4000/v1/items/${input_search}`;
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status === 200) {

                document.getElementById('result-container').style.display = 'table';
                document.getElementById('not-found').style.display = 'none';
                const response = JSON.parse(xhr.responseText);
                populateResult(response.data);
                populateCarousel(response.data.recommendation);

            } else {
                document.getElementById('not-found').style.display = 'table';
                document.getElementById('result-container').style.display = 'none';
            }
        };

        xhr.send();
    }


    const form = document.getElementById('form-search');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submit();

    });

    const populateResult = (params) => {
        const elements = document.getElementById('result');
        elements.getElementsByClassName('link')[0].href = `http://${params.reference.item.detailUrl}`;
        elements.getElementsByClassName('result-img')[0].src = `http://${params.reference.item.imageName}`;
        elements.getElementsByClassName('description')[0].innerHTML = params.reference.item.name;
        elements.getElementsByClassName('price')[0].innerHTML = params.reference.item.price;
        elements.getElementsByClassName('paymentConditions')[0].innerHTML = valueToReal(params.reference.item.productInfo.paymentConditions);
    };

    const populateCarousel = (params) => {
        const parent = document.getElementById('recommendations');

        for (let i = 0; i < params.length; i++) {

            const carousel_container = makeElement(parent, 'div', 'carousel-container');
            const carousel_item = makeElement(carousel_container, 'div', 'carousel-item');
            const link = makeElement(carousel_item, 'a', 'link', params[i].detailUrl);

            const item_image = makeElement(link, 'div', 'item-image');
            makeTagHTML(item_image, 'img', 'img-carousel', params[i]);

            makeElement(link, 'div', 'description-carousel', params[i].name);

            makeTagHTML(link, 'label', 'price-label', 'Preço ');
            makeTagHTML(link, 'span', 'price', params[i].price);

            makeElement(link, 'div', 'paymentConditions', valueToReal(params[i].productInfo.paymentConditions));

            makeTagHTML(link, 'p', '', 'sem juros');
        }

    };

    const valueToReal = (value) => {
        const n = value.indexOf('de');
        const number = value.slice(0, n + 11) + 'R$' + value.slice(n + 11);
        return number.replace('.', ',');
    };

    const makeElement = (parent, element, decorator, param) => {
        const elm = document.createElement(element);
        elm.className = decorator;
        if (param !== undefined) {
            if (elm.nodeName === 'A') {
                elm.href = param;
            } else {
                elm.innerHTML = param;
            }
        }
        parent.appendChild(elm);
        return elm;
    };

    const makeTagHTML = (parent, element, decorator, param) => {
        const elm = document.createElement(element);
        elm.className = decorator;
        if (param !== undefined) {
            populateElement(elm, param)
        }
        parent.appendChild(elm);
    };

    const populateElement = (element, param) => {
        if (element.nodeName === 'IMG') {
            return setSrc(element, param.imageName);
        } else {
            element.innerHTML = param;
            return element;
        }
    };

    const setSrc = (element, param) => {
        const elm = element.src = `http://${param}`;
        return elm;
    };

});