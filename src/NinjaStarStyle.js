//@ts-check
'use strict'

import { Style } from '../Style'

/**
 * @author Joseph Davies, Julien Gaffuri
 */
export class NinjaStarStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         * @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the cell.
         * @type {function(number,number,import("../Style").Stat|undefined,number):string} */
        this.color = opts.color || (() => '#EA6BAC') //(v,r,s,zf) => {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for size.
         * @type {string} */
        this.sizeCol = opts.sizeCol

        /** A function returning the size of a cell in geographical unit.
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.size = opts.size

        /** A function returning the shape of a cell.
         * @type {function(import("../Dataset").Cell):import("../Style").Shape} */
        this.shape = opts.shape || (() => 'square')
    }

    /**
     * Draw cells as squares, with various colors and size.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas").GeoCanvas} cg
     */
    draw(cells, r, cg) {

        console.log("Ninja star style OK !")

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //zoom factor
        const zf = cg.getZf()

        let statSize
        if (this.sizeCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.sizeCol] - c1[this.sizeCol])
            //and compute size variable statistics
            statSize = Style.getStatistics(cells, (c) => c[this.sizeCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Style.getStatistics(cells, (c) => c[this.colorCol], true)
        }

        //draw with HTML canvas
        //in geo coordinates
        cg.setCanvasTransform()

        const r2 = r * 0.5
        for (let cell of cells) {
            //color
            const col = this.color ? this.color(cell[this.colorCol], r, statColor, zf) : undefined
            if (!col || col === 'none') continue
            cg.ctx.fillStyle = col

            //shape
            const shape = this.shape ? this.shape(cell) : 'square'
            if (shape === 'none') continue

            //size
            /** @type {function(number,number,import("../Style").Stat|undefined,number):number} */
            let s_ = this.size || (() => r)
            //size - in geo unit
            const sG = s_(cell[this.sizeCol], r, statSize, zf)

            //get offset
            const offset = this.offset(cell, r, zf)

            if (shape === 'square') {
                //draw square
                const d = r * (1 - sG / r) * 0.5
                cg.ctx.fillRect(cell.x + d + offset.dx, cell.y + d + offset.dy, sG, sG)
            } else if (shape === 'circle') {
                //draw circle
                cg.ctx.beginPath()
                cg.ctx.arc(cell.x + r2 + offset.dx, cell.y + r2 + offset.dy, sG * 0.5, 0, 2 * Math.PI, false)
                cg.ctx.fill()
            } else if (shape === 'donut') {
                //draw donut
                const xc = cell.x + r2 + offset.dx,
                    yc = cell.y + r2 + offset.dy
                cg.ctx.beginPath()
                cg.ctx.moveTo(xc, yc)
                cg.ctx.arc(xc, yc, r2, 0, 2 * Math.PI)
                cg.ctx.arc(xc, yc, (1 - sG / r) * r2, 0, 2 * Math.PI, true)
                cg.ctx.closePath()
                cg.ctx.fill()
            } else if (shape === 'diamond') {
                const s2 = sG * 0.5
                cg.ctx.beginPath()
                cg.ctx.moveTo(cell.x + r2 - s2, cell.y + r2)
                cg.ctx.lineTo(cell.x + r2, cell.y + r2 + s2)
                cg.ctx.lineTo(cell.x + r2 + s2, cell.y + r2)
                cg.ctx.lineTo(cell.x + r2, cell.y + r2 - s2)
                cg.ctx.fill()
            } else {
                throw new Error('Unexpected shape:' + shape)
            }
        }

        //update legends
        this.updateLegends({ style: this, r: r, zf: zf, sSize: statSize, sColor: statColor })
    }
}
