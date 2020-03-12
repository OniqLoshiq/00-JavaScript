function createComputerHierarchy() {
    class Base {
        constructor(manufacturer) {
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Base {
        constructor(manufacturer, responseTime) {
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }

    class Monitor extends Base {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }

    class Battery extends Base {
        constructor(manufacturer, expectedLife) {
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }

    class Computer extends Base {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new Error('Abstract class cannot be instantiated');
            }
            super(manufacturer);
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }

        checkInstanceOfProperty(passedObj, expectedObj){
            if(!(passedObj instanceof expectedObj)){
                throw new TypeError(`The ${passedObj.constructor.name} should be an instance of ${expectedObj.name}`);
            }
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }

        get battery() {
            return this._battery;
        }

        set battery(val) {
            this.checkInstanceOfProperty(val, Battery);
            this._battery = val;
        }
    }

    class Desktop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(val) {
            this.checkInstanceOfProperty(val, Keyboard);
            this._keyboard = val;
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(val) {
            this.checkInstanceOfProperty(val, Monitor);
            this._monitor = val;
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    };
}