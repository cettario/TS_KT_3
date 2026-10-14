"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Plotter_1 = require("./Plotter");
function drawTriangle(plt, size) {
    plt.setColor('Green');
    for (let i = 0; i < 3; i++) {
        plt.carriageDown();
        plt.move(size);
        plt.carriageUp();
        plt.turn(120);
    }
}
const plotter = new Plotter_1.Plotter(Plotter_1.LogToConsole);
drawTriangle(plotter, 100);
console.log('\nКвадрат:');
plotter.setPosition({ x: 10, y: 10 });
plotter.setColor('Red');
plotter.drawSquare(80);
