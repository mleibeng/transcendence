/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controls.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:11:33 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/19 20:45:59 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export class Ball {
    x:number
    y:number
    radius:number
    color:string
    speedX:number
    speedY:number


    constructor(x:number, y:number, radius:number, color:string, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color
        this.speedX = speedX;
        this.speedY = speedY;
    }

    reverseYDirection(): void {
        this.speedY = -this.speedY
    }

    reverseXDirection(): void {
        this.speedX = -this.speedX
    }

    update(): void  {
        this.x += this.speedX
        this.y += this.speedY
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath()
    }

}

export class Paddle {
    x:number
    y:number
    width:number
    height:number
    color:string
    speed:number = 0
    targetY: number | null=null;

    constructor(x:number,y:number,width:number,height:number,color:string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height =height;
        this.color = color;
    }

    moveUp(speed:number):void {
        this.speed = -speed;
        this.targetY = null;
    }

    moveDown(speed:number):void {
        this.speed = speed;
        this.targetY = null;
    }

    stop(): void {
        this.speed = 0
    }

    update(canvasHeight: number) {
        if (this.targetY !== null) {
            if (Math.abs(this.y - this.targetY) < 5) {
                this.y = this.targetY;
                this.targetY = null;
            }
            else if (this.y < this.targetY) {
                this.y += this.speed
            }
            else {
                this.y -= this.speed
            }
        } else {
            this.y += this.speed;
        }

        if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y + this.height > canvasHeight) {
            this.y = canvasHeight - this.height;
        }
    }

    setTargetY(y:number) {
        this.targetY = y - this.height / 2;
    }
}