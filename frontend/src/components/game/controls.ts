/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controls.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:11:33 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:11:33 by mleibeng         ###   ########.fr       */
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

}