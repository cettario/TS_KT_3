import { Plotter, LogToConsole, Distance } from './Plotter';

function drawTriangle(plt: Plotter, size: Distance): void {
    plt.setColor('Green');
    for (let i = 0; i < 3; i++) {
        plt.carriageDown();
        plt.move(size);
        plt.carriageUp();
        plt.turn(120);
    }
}

const plotter = new Plotter(LogToConsole);
drawTriangle(plotter, 100);

console.log('\nКвадрат:');
plotter.setPosition({ x: 10, y: 10 });
plotter.setColor('Red');
plotter.drawSquare(80);
