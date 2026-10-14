export type Point = number;
export type Distance = number;
export type Angle = number;
export type Position = { x: Point; y: Point };
export type LineColor = 'Black' | 'Red' | 'Green';

export interface Logger {
    log(message: string): void;
}

export class LogToConsole implements Logger {
    log(message: string): void {
        console.log(message);
    }
}

export class Plotter {
    private position: Position = { x: 0, y: 0 };
    private angle: Angle = 0;
    private color: LineColor = 'Black';
    private isDown = false;
    private logger: Logger;

    constructor(loggerClass: new () => Logger = LogToConsole) {
        this.logger = new loggerClass();
    }

    getPosition(): Position {
        return { ...this.position };
    }

    getAngle(): Angle {
        return this.angle;
    }

    getColor(): LineColor {
        return this.color;
    }

    getCarriageState(): boolean {
        return this.isDown;
    }

    move(distance: Distance): void {
        if (!Number.isFinite(distance)) throw new Error('Некорректное расстояние');
        const rad = this.angle * Math.PI / 180;
        const next: Position = {
            x: Math.round(this.position.x + distance * Math.cos(rad)),
            y: Math.round(this.position.y + distance * Math.sin(rad))
        };
        if (this.isDown) {
            const colorNames: Record<LineColor, string> = {
                Black: 'чёрный',
                Red: 'красный',
                Green: 'зелёный'
            };
            this.logger.log(`...Чертим линию из (${this.position.x}, ${this.position.y}) в (${next.x}, ${next.y}) используя ${colorNames[this.color]} цвет.`);
        } else {
            this.logger.log(`Передвигаем на ${distance} от точки (${this.position.x}, ${this.position.y})`);
        }
        this.position = next;
    }

    turn(angle: Angle): void {
        if (!Number.isFinite(angle)) throw new Error('Некорректный угол');
        this.logger.log(`Поворачиваем на ${angle} градусов`);
        this.angle = ((this.angle + angle) % 360 + 360) % 360;
    }

    carriageDown(): void {
        this.logger.log('Опускаем каретку');
        this.isDown = true;
    }

    carriageUp(): void {
        this.logger.log('Поднимаем каретку');
        this.isDown = false;
    }

    setColor(color: LineColor): void {
        const colorNames: Record<LineColor, string> = {
            Black: 'чёрный',
            Red: 'красный',
            Green: 'зелёный'
        };
        if (!(color in colorNames)) throw new Error('Неизвестный цвет');
        this.color = color;
        this.logger.log(`Устанавливаем ${colorNames[color]} цвет линии.`);
    }

    setPosition(position: Position): void {
        if (!Number.isFinite(position.x) || !Number.isFinite(position.y)) {
            throw new Error('Некорректные координаты');
        }
        this.position = { ...position };
        this.logger.log(`Устанавливаем позицию каретки в (${position.x}, ${position.y}).`);
    }

    drawTriangle(size: Distance): void {
        for (let i = 0; i < 3; i++) {
            this.carriageDown();
            this.move(size);
            this.carriageUp();
            this.turn(120);
        }
    }

    drawSquare(size: Distance): void {
        for (let i = 0; i < 4; i++) {
            this.carriageDown();
            this.move(size);
            this.carriageUp();
            this.turn(90);
        }
    }
}
