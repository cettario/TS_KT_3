"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plotter = exports.LogToConsole = void 0;
class LogToConsole {
    log(message) {
        console.log(message);
    }
}
exports.LogToConsole = LogToConsole;
class Plotter {
    constructor(loggerClass = LogToConsole) {
        this.position = { x: 0, y: 0 };
        this.angle = 0;
        this.color = 'Black';
        this.isDown = false;
        this.logger = new loggerClass();
    }
    getPosition() {
        return { ...this.position };
    }
    getAngle() {
        return this.angle;
    }
    getColor() {
        return this.color;
    }
    getCarriageState() {
        return this.isDown;
    }
    move(distance) {
        if (!Number.isFinite(distance))
            throw new Error('Некорректное расстояние');
        const rad = this.angle * Math.PI / 180;
        const next = {
            x: Math.round(this.position.x + distance * Math.cos(rad)),
            y: Math.round(this.position.y + distance * Math.sin(rad))
        };
        if (this.isDown) {
            const colorNames = {
                Black: 'чёрный',
                Red: 'красный',
                Green: 'зелёный'
            };
            this.logger.log(`...Чертим линию из (${this.position.x}, ${this.position.y}) в (${next.x}, ${next.y}) используя ${colorNames[this.color]} цвет.`);
        }
        else {
            this.logger.log(`Передвигаем на ${distance} от точки (${this.position.x}, ${this.position.y})`);
        }
        this.position = next;
    }
    turn(angle) {
        if (!Number.isFinite(angle))
            throw new Error('Некорректный угол');
        this.logger.log(`Поворачиваем на ${angle} градусов`);
        this.angle = ((this.angle + angle) % 360 + 360) % 360;
    }
    carriageDown() {
        this.logger.log('Опускаем каретку');
        this.isDown = true;
    }
    carriageUp() {
        this.logger.log('Поднимаем каретку');
        this.isDown = false;
    }
    setColor(color) {
        const colorNames = {
            Black: 'чёрный',
            Red: 'красный',
            Green: 'зелёный'
        };
        if (!(color in colorNames))
            throw new Error('Неизвестный цвет');
        this.color = color;
        this.logger.log(`Устанавливаем ${colorNames[color]} цвет линии.`);
    }
    setPosition(position) {
        if (!Number.isFinite(position.x) || !Number.isFinite(position.y)) {
            throw new Error('Некорректные координаты');
        }
        this.position = { ...position };
        this.logger.log(`Устанавливаем позицию каретки в (${position.x}, ${position.y}).`);
    }
    drawTriangle(size) {
        for (let i = 0; i < 3; i++) {
            this.carriageDown();
            this.move(size);
            this.carriageUp();
            this.turn(120);
        }
    }
    drawSquare(size) {
        for (let i = 0; i < 4; i++) {
            this.carriageDown();
            this.move(size);
            this.carriageUp();
            this.turn(90);
        }
    }
}
exports.Plotter = Plotter;
