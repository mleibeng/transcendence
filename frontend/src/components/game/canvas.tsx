/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   canvas.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:11:30 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/16 23:25:26 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { timeStamp } from "console";
import { Ball, Paddle } from "./controls";

class PongGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private ball: Ball;
    private paddle1: Paddle;
    private paddle2: Paddle;
    private score1: number = 0;
    private score2: number = 0;
    private isRunning: boolean = false;

    constructor() {
        this.canvas = document.getElementById("Ponggame") as HTMLCanvasElement;
        if (!this.canvas)
            throw new Error("Couldn't initialize Canvas")

        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error("Couldn't get 2d context")
        }
        this.ctx = context;

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ball = new Ball(centerX, centerY, 8, 'white', 5, 5)

        const paddleHeight = 100;
        const paddleWidth = 10;

        this.paddle1 = new Paddle(10, centerY - paddleHeight/2, paddleWidth, paddleHeight, 'red')
        this.paddle2 = new Paddle(this.canvas.width - paddleWidth - 10, centerY - paddleHeight/2, paddleWidth, paddleHeight, 'blue')

        this.init()
    }

    private init(): void {
        this.setupEventListeners()
        this.isRunning = true;
        this.gameLoop()
    }


    private setupEventListeners(): void {
        window.addEventListener('keyup', (ev) => this.keyUpFunction(ev))
        window.addEventListener('keydown', (ev) => this.keyDownFunction(ev))

        this.canvas.addEventListener('touchstart', (ev) => this.touchStartFunction(ev))
        this.canvas.addEventListener('touchmove', (ev) => this.touchMoveFunction(ev))
    }

    private keyUpFunction(ev: KeyboardEvent) {
        switch (ev.key) {
            case 's':
            case 'w':
                this.paddle1.stop();
                break;

        }
    }

    private keyDownFunction(ev: KeyboardEvent) {
        switch (ev.key) {
            case 'w':
                this.paddle1.moveUp(5);
                break;
            case 's':
                this.paddle1.moveDown(5);
        }
    }

    private touchStartFunction(ev: KeyboardEvent) {

    }

    private touchMoveFunction(ev: KeyboardEvent) {

    }


    private gameLoop = (): void => {
        this.update()

        this.render()

        if(this.isRunning)
        requestAnimationFrame(this.gameLoop)
    }

    private update(): void {
        this.paddle1.update(this.canvas.height);
        this.paddle2.update(this.canvas.height);

        this.ball.update()

        if (this.ball.y <= this.ball.radius || this.ball.y >= this.canvas.height - this.ball.radius)
            this.ball.reverseYDirection();

        if (this.isColliding(this.ball, this.paddle1) || this.isColliding(this.ball, this.paddle2))
            this.ball.reverseXDirection();

        if (this.ball.x < 0) {
            this.score2 += 1;
            this.resetBall();
        } else if (this.ball.x > this.canvas.width) {
            this.score1 += 1;
            this.resetBall()
        }
    }

    private resetBall(): void {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
    }

    private render(): void {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)

        this.drawCenterLine();

        this.drawPaddles()
        this.drawBall()
        this.drawScore()
    }

    private drawCenterLine(): void {
        const middle = this.canvas.width / 2;
        const segmentHeight = 10

        this.ctx.strokeStyle = 'white'
        this.ctx.setLineDash([segmentHeight, segmentHeight])
        this.ctx.beginPath()
        this.ctx.moveTo(middle,0)
        this.ctx.lineTo(middle, this.canvas.height);
        this.ctx.stroke();
        this.ctx.setLineDash([])
    }

    private drawPaddles(): void {
        this.ctx.fillStyle = this.paddle1.color;
        this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height)

        this.ctx.fillStyle = this.paddle2.color;
        this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height)
    }

    private drawBall(): void {
        this.ball.draw(this.ctx)
    }

    private drawScore(): void {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px monospace'
        this.ctx.textAlign = 'center';

        this.ctx.fillText(this.score1.toString(), this.canvas.width / 4, 50)
        this.ctx.fillText(this.score2.toString(), this.canvas.width * 3 / 4, 50)
    }

}

export default PongGame