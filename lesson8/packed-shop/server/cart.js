let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};
let remove = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if (find.quantity > 1) {
        find.quantity -= 1;
    } else {
        cart.contents.splice(cart.contents.indexOf(find), 1);
    }
    return JSON.stringify(cart, null, 4);
};
let del = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    return JSON.stringify(cart, null, 4);
};
let quant = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity = req.body.quantity;
    return JSON.stringify(cart, null, 4);
};
let clear = (cart, req) => {
    cart.contents.splice(0, cart.contents.length);
    return JSON.stringify(cart, null, 4);
}
module.exports = {
    add,
    change,
    remove,
    del,
    quant,
    clear
};