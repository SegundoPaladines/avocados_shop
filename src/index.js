const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector("#app");
appNode.className = 'mt-10 grid grid-cols-1 md:grid-cols-2 gap-8';

//formato al precio
const formatPrice = (price) => {
    // en-EN se refiere a la region y el idioma english-ENGLAND
    const res = new window.Intl.NumberFormat('en-EN', {
        style:'currency', //tipo moneda
        currency:'USD' //moeda de dolar
    }).format(price);

    return res;
}

const getAvos = () => {
    fetch(`${baseUrl}/api/avo`)
        .then((r) => r.json())
            .then((j) =>{
                //array que guardara todos los elementos
                const allItems = []

                //recorrer el response y tomar los datos
                j.data.forEach(element => {
                    //imagen
                    const img = document.createElement('img');
                    //atributos y parametros de la imagen
                    img.src = `${baseUrl}${element.image}`;
                    img.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md-mr-6';

                    //contenedor del texto precio y titulo
                    const textContainer = document.createElement('div');
                    textContainer.className = "flex-col text-center md:text-left ml-6"

                    //titulo
                    const title = document.createElement('h2');
                    //Atributos y parametros del title
                    title.textContent = element.name;
                    title.className = 'text-center md:text-left mb-2';
                    //agregar el titulo al contenedor de texto
                    textContainer.appendChild(title);

                    //precio
                    //atributos y parametros del precio
                    const price = document.createElement('p');
                    price.textContent = formatPrice(element.price);
                    price.className = 'text-gray-500';
                    //agregar el precio al contenedor de texto
                    textContainer.appendChild(price);
                    
                    //container
                    const container = document.createElement('div');

                    //agregar los items al container
                    container.append(img, textContainer);
                    container.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300';

                    //items al array
                    allItems.push(container);
                });

                appNode.append(...allItems);
            });
}

getAvos();