/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   canvas.ts                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:11:30 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/20 03:19:13 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Ball, Paddle } from "./game_objects";

class PongGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private ball: Ball;
    private paddle1: Paddle;
    private paddle2: Paddle;
    private score1: number = 0;
    private score2: number = 0;
    private isRunning: boolean = false;
    private animationId: number | null = null;
    private countdown: number | null = null
    private countdownInterval: number | null = null
    private startGame: boolean = true
    private hitCD: number = 0;


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

        this.ball = new Ball(centerX, centerY, 8, 'white', 4, 4)

        const paddleHeight = 100;
        const paddleWidth = 10;

        this.paddle1 = new Paddle(10, centerY - paddleHeight/2, paddleWidth, paddleHeight, 'red')
        this.paddle2 = new Paddle(this.canvas.width - paddleWidth - 10, centerY - paddleHeight/2, paddleWidth, paddleHeight, 'blue')

        this.setupEventListeners()
    }

    private setupEventListeners(): void {
        window.addEventListener('keyup', (ev) => this.keyUpFunction(ev))
        window.addEventListener('keydown', (ev) => this.keyDownFunction(ev))

        this.canvas.addEventListener('touchstart', (ev) => this.touchStartFunction(ev))
        this.canvas.addEventListener('touchmove', (ev) => this.touchMoveFunction(ev))
    }

    private startCountdown():void {
        this.countdown = 4;
        this.countdownInterval = window.setInterval(() => {
            this.countdown! -= 1;
            if (this.countdown! <= 0) {
                if (this.countdownInterval) {
                    clearInterval(this.countdownInterval);
                    this.countdownInterval = null;
                }
                this.start()
            }
            this.render(false)
        }, 1000)
    }

    private renderCountdown():void {
        if (this.countdown !== null && this.countdown > 0) {
            this.ctx.fillStyle = 'white';
            this.ctx.font = '80px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                this.countdown.toString(),
                this.canvas.width / 2,
                this.canvas.height / 2
            );
        }
    }

    private toggleGame(): void {
        this.isRunning = !this.isRunning
        if (this.isRunning && this.startGame) {
            this.startGame = false;
            this.startCountdown()
        } else if (this.isRunning && !this.startGame) {
            this.start()
        }
         else {
            this.stop()
        }
    }

    private keyUpFunction(ev: KeyboardEvent) {
        switch (ev.key) {
            case ' ':
                this.toggleGame();
                break;
            case 's':
            case 'w':
                this.paddle1.stop();
                break;
            case 'ArrowDown':
            case 'ArrowUp':
                this.paddle2.stop();
                break;
        }
    }

    private keyDownFunction(ev: KeyboardEvent) {
        switch (ev.key) {
            case 'w':
                this.paddle1.moveUp(10);
                break;
            case 's':
                this.paddle1.moveDown(10);
                break;
            case 'ArrowDown':
                this.paddle2.moveDown(10);
                break;
            case 'ArrowUp':
                this.paddle2.moveUp(10);
                break;
        }
    }

    private touchStartFunction(ev: TouchEvent) {
        ev.preventDefault()
        const touch = ev.touches[0]
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        if (x < this.canvas.width / 2) {
            this.paddle1.setTargetY(y)
        } else {
            this.paddle2.setTargetY(y)
        }
    }

    private touchMoveFunction(ev: TouchEvent) {
        ev.preventDefault()
        const touch = ev.touches[0]
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        if (x < this.canvas.width / 2) {
            this.paddle1.setTargetY(y)
        } else {
            this.paddle2.setTargetY(y)
        }
    }


    private gameLoop = (): void => {
        if (!this.isRunning) return;

        this.update()
        this.render(true)


        this.animationId = requestAnimationFrame(this.gameLoop)

        this.winGame()
    }

    private update(): void {
        this.paddle1.update(this.canvas.height);
        this.paddle2.update(this.canvas.height);

        this.ball.update()

        if (this.ball.y <= this.ball.radius || this.ball.y >= this.canvas.height - this.ball.radius)
            this.ball.reverseYDirection();

        if (this.hitCD <= 0)
        {
            if (this.isColliding(this.ball, this.paddle1)) {
                this.hitCD = 10;
                this.ball.reverseXDirection();
                Math.abs(this.ball.speedX += Math.random())
                Math.abs(this.ball.speedY += Math.random())
            }

            if (this.isColliding(this.ball, this.paddle2)) {
                this.hitCD = 10;
                this.ball.reverseXDirection();
                Math.abs(this.ball.speedX -= Math.random())
                Math.abs(this.ball.speedY -= Math.random())

            }
        } else
            this.hitCD--;


        if (this.ball.x < 15) {
            this.score2 += 1;
            this.resetBall();
        } else if (this.ball.x > this.canvas.width - 15) {
            this.score1 += 1;
            this.resetBall()
        }
    }

    private resetBall(): void {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.speedX = 4
        this.ball.speedY = 4 + Math.random()
        if (Math.random() > 0.5)
            this.ball.reverseXDirection();
        if (Math.random() > 0.5)
            this.ball.reverseYDirection();
    }

    public render(renderBall: boolean): void {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)

        this.drawCenterLine();

        if (renderBall)
            this.drawBall()
        this.drawPaddles()
        this.drawScore()
        this.renderCountdown()
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

    private isColliding(ball:Ball , paddle:Paddle): boolean {
        return ball.x - ball.radius <= paddle.x + paddle.width &&
        ball.x + ball.radius >= paddle.x &&
        ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.height;
    }

    private drawScore(): void {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px monospace'
        this.ctx.textAlign = 'center';

        this.ctx.fillText(this.score1.toString(), this.canvas.width / 4, 50)
        this.ctx.fillText(this.score2.toString(), this.canvas.width * 3 / 4, 50)
    }

    private winGame(): void {
        if (this.score1 === 10 || this.score2 === 10) {
            this.ctx.fillStyle = 'gold';
            this.ctx.font = '80px monospace';
            this.ctx.textAlign = 'center';

            const winner = this.score1 === 10 ? 'Player 1 Wins!' : 'Player 2 Wins!';
            this.ctx.fillText(winner, this.canvas.width / 2, this.canvas.height / 2);

            this.resetScore();
            this.stop();
            this.startGame = true;
        }
    }

    private resetScore(): void {
        this.score1 = 0
        this.score2 = 0
    }

    public start(): void {
        if (!this.isRunning)
            this.isRunning = true;
            this.gameLoop()
    }

    public stop():void {
        this.isRunning = false;
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId)
            this.animationId = null;
        }
    }

    public resize(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;

        const centerY = height / 2;
        this.ball.x = width / 2;
        this.ball.y = centerY;

        this.paddle1.y = centerY - this.paddle1.height / 2;
        this.paddle2.x = width - this.paddle2.width - 10
        this.paddle2.y = centerY - this.paddle2.height / 2;
    }

    public clean(): void {
        window.removeEventListener('keydown', this.keyDownFunction)
        window.removeEventListener('keyup', this.keyUpFunction)
        this.canvas.removeEventListener('touchstart', this.touchStartFunction)
        this.canvas.removeEventListener('touchmove',  this.touchMoveFunction)
    }

}

export default PongGame