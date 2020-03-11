(() => {
    String.prototype.ensureStart = function (str) {
        return this.startsWith(str) ? this.toString() : str + this;
    }

    String.prototype.ensureEnd = function (str) {
        return this.endsWith(str) ? this.toString() : this + str;
    }

    String.prototype.isEmpty = function () {
        return this.toString() === "";
    }

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return '.'.repeat(n);
        }

        if (n >= this.length) {
            return this.toString();
        }

        let space = this.toString().substring(0, n - 2).lastIndexOf(' ');

        if (space < 0) {
            return this.substring(0, n - 3) + '...';
        }

        let result = this.substring(0, space);

        return result + '...';
    }

    String.format = function (string, ...params) {
        let regPlaceholder = /{\d{1}}/gm;
        let parameters = [...params];

        let placeholders = string.match(regPlaceholder);
        let iterateTo = placeholders.length <=parameters.length ? placeholders.length : parameters.length;

        for (let i = 0; i < iterateTo; i++) {
            string = string.replace(placeholders[i], parameters[i]);
        }

        return string;
    }
})()

var testString = 'the {0} brown {1} jumps over the {2} dog';

testString = String.format(testString, 'quick')
console.log(testString);

