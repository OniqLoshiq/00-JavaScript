function solve() {
    let myObj = {
        extend: function (template) {
            Object.keys(template).forEach(prop => {
                if (typeof template[prop] === 'function') {
                    Object.getPrototypeOf(this)[prop] = template[prop];
                } else {
                    this[prop] = template[prop];
                }
            });
        }
    };

    return myObj;
}