function solve(){
    class Melon{
        constructor(weight, melonSort){
            if(new.target === Melon){
                throw new TypeError('Abstract class cannot be instantiated directly');
            }

            this.weight = weight;
            this.melonSort = melonSort;
        }

        get elementIndex(){
            return this.weight * this.melonSort.length;
        }

        get element(){
            let className = this.constructor.name;
            return className.substring(0, className.length - 5);
        }

        toString(){
            return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
        }
    }

    class Watermelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
        }
    }

    class Firemelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
        }
    }

    class Earthmelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
        }
    }

    class Airmelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
        }
    }

    class Melolemonmelon extends Watermelon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this.element = 'Water';
            this._elementCounter = 0;
            this._elementArray = ['Water', 'Fire', 'Earth', 'Air'];
        }

        get element(){
            return this._element;
        }

        set element(val){
            this._element = val;
        }

        morph(){
            this._elementCounter++;
            if(this._elementCounter === this._elementArray){
                this._elementCounter = 0;
            }

            this.element = this._elementArray[this._elementCounter];
        }
    }

    return {Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon};
}