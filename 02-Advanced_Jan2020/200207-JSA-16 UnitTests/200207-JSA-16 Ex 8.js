//01 Request validator
// function requestValidator(obj){
//   const methods = ["GET", "POST", "DELETE", "CONNECT"];
//   const versions = ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"];
//   const uriRegExp = /^[A-Za-z0-9.]+$/gm;
//   const messageRegExp = /[<>&'"\\]/gm;

//   if(!obj.hasOwnProperty('method') || !methods.includes(obj.method)){
//     throw new Error('Invalid request header: Invalid Method');
//   }
//   if(!obj.hasOwnProperty('uri') || !uriRegExp.test(obj.uri)){
//     throw new Error('Invalid request header: Invalid URI');
//   }
//   if(!obj.hasOwnProperty('version') || (typeof obj.version !== 'string') ||!versions.includes(obj.version)){
//     throw new Error('Invalid request header: Invalid Version');
//   }
//   if(!obj.hasOwnProperty('message') || messageRegExp.test(obj.message)){
//     throw new Error('Invalid request header: Invalid Message');
//   }

//   return obj;
// }
class Warehouse {

  get capacity() {
      return this._capacity;
  }

  set capacity(givenSpace) {

      if (typeof givenSpace === 'number' && givenSpace > 0) {
          return this._capacity = givenSpace;
      } else {
          throw `Invalid given warehouse space`;
      }
  }

  constructor(capacity) {
      this.capacity = capacity;
      this.availableProducts = {'Food': {}, 'Drink': {}};
  }

  addProduct(type, product, quantity) {

      let addedQuantity = ((this.capacity - this.occupiedCapacity()) - quantity);
      let output;

      if (addedQuantity >= 0) {

          if (this.availableProducts[type].hasOwnProperty(product) === false) {
              this.availableProducts[type][product] = 0;
          }

          this.availableProducts[type][product] += quantity;
          output = this.availableProducts[type];

      } else {
          throw `There is not enough space or the warehouse is already full`;
      }

      return output;
  }

  orderProducts(type) {

      let output;
      let sortedKeys = Object.keys(this.availableProducts[type])
          .sort((a, b) => this.availableProducts[type][b] - this.availableProducts[type][a]);

      let newObj = {};

      for (let product of sortedKeys) {

          if (newObj.hasOwnProperty(product) === false) {
              newObj[product] = 0;
          }

          newObj[product] += this.availableProducts[type][product];
      }

      this.availableProducts[type] = newObj;
      output = this.availableProducts[type];

      return output;
  }

  occupiedCapacity() {

      let output = 0;
      let productsCount = Object.keys(this.availableProducts['Food']).length +
          Object.keys(this.availableProducts['Drink']).length;

      if (productsCount > 0) {

          let quantityInStock = 0;

          for (let type of Object.keys(this.availableProducts)) {

              for (let product of Object.keys(this.availableProducts[type])) {

                  quantityInStock += this.availableProducts[type][product];
              }
          }

          output = quantityInStock;
      }

      return output;
  }

  revision() {

      let output = "";

      if (this.occupiedCapacity() > 0) {

          for (let type of Object.keys(this.availableProducts)) {
              output += `Product type - [${type}]\n`;
              for (let product of Object.keys(this.availableProducts[type])) {
                  output += `- ${product} ${this.availableProducts[type][product]}\n`;
              }
          }
      } else {
          output = 'The warehouse is empty';
      }

      return output.trim();
  }

  scrapeAProduct(product, quantity) {

      let type = Object.keys(this.availableProducts).find(t =>          Object.keys(this.availableProducts[t]).includes(product));
      let output;

      if (type !== undefined) {

          if (quantity <= this.availableProducts[type][product]) {
              this.availableProducts[type][product] -= quantity;
          } else {
              this.availableProducts[type][product] = 0;
          }

          output = this.availableProducts[type];

      } else {
          throw `${product} do not exists`;
      }

      return output;
  }
}

  



module.exports = Warehouse;