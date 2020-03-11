function solve() {
    let sortedList = (() => {
        let arr = [];

        let add = function (el) {
            arr.push(el);
            arr.sort((a, b) => a - b);
            this.size+= 1;
        };

        let remove = function (index) {
            if (index >= 0 && index <= arr.length - 1) {
                arr.splice(index, 1);
                this.size-= 1;
            }
        }

        let get = function (index) {
            if (index >= 0 && index <= arr.length - 1) {
                return arr[index];
            }
        }

        return {
            add,
            remove,
            get,
            size: 0
        }

    })();

    return sortedList;
}