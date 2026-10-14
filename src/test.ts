import { Plotter, Logger } from './Plotter';

class TestLogger implements Logger {
    static messages: string[] = [];

    log(message: string): void {
        TestLogger.messages.push(message);
    }
}

function assert(condition: boolean, message: string): void {
    if (!condition) throw new Error(message);
}

const plotter = new Plotter(TestLogger);
plotter.setColor('Green');
plotter.drawTriangle(100);
const pos = plotter.getPosition();
assert(pos.x === 0 && pos.y === 0, 'Треугольник должен замкнуться');
assert(plotter.getAngle() === 0, 'Угол после трёх поворотов');
assert(plotter.getColor() === 'Green', 'Установка цвета');
assert(!plotter.getCarriageState(), 'После рисования каретка должна быть поднята');
assert(TestLogger.messages.filter(item => item.startsWith('...Чертим')).length === 3, 'Три стороны треугольника');
assert(TestLogger.messages.some(item => item.includes('(100, 0) в (50, 87)')), 'Координаты второй стороны');
assert(TestLogger.messages.some(item => item.includes('(50, 87) в (0, 0)')), 'Координаты третьей стороны');

plotter.setPosition({ x: 10, y: 10 });
plotter.setColor('Red');
plotter.drawSquare(80);
const end = plotter.getPosition();
assert(end.x === 10 && end.y === 10, 'Квадрат должен замкнуться');
assert(TestLogger.messages.filter(item => item.startsWith('...Чертим')).length === 7, 'Семь отрезков');

plotter.move(5);
assert(TestLogger.messages[TestLogger.messages.length - 1]?.startsWith('Передвигаем на 5') === true, 'Поднятая каретка не рисует');
plotter.turn(-90);
assert(plotter.getAngle() === 270, 'Отрицательный поворот');
let invalid = false;
try {
    plotter.setColor('Blue' as 'Green');
} catch {
    invalid = true;
}
assert(invalid, 'Проверка допустимых цветов');
console.log('Все проверки пройдены.');
