
let data ;
fetch('https://fakestoreapi.com/products/1')
            .then(res=>res.json())
            .then(json=> data = json)

export const FakeStore = data;