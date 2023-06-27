(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gviz"] = factory();
	else
		root["gviz"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/NinjaStarStyle.js":
/*!*******************************!*\
  !*** ./src/NinjaStarStyle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NinjaStarStyle: () => (/* binding */ NinjaStarStyle)
/* harmony export */ });
//@ts-check


//import Style from 'gridviz'
//import GeoCanvas from 'gridviz'
//import Dataset from 'gridviz'
//import Cell from 'gridviz'
//import Shape from 'gridviz'
//import Stat from 'gridviz'
//import { gviz } from 'gridviz'
//import * from 'gridviz'
//import { Something1 as MySomething } from "my-module.js"


/**
 * @author Joseph Davies, Julien Gaffuri
 */
class NinjaStarStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         * @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the cell.
         * @type {function(number,number, Style.Stat|undefined,number):string} */
        this.color = opts.color || (() => '#EA6BAC') //(v,r,s,zf) => {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for size.
         * @type {string} */
        this.sizeCol = opts.sizeCol

        /** A function returning the size of a cell in geographical unit.
         * @type {function(number,number,Style.Stat|undefined,number):number} */
        this.size = opts.size

        /** A function returning the shape of a cell.
         * @type {function(Dataset.Cell):Style.Shape} */
        this.shape = opts.shape || (() => 'square')
    }


    //import("../GeoCanvas").GeoCanvas

    /**
     * Draw cells as squares, with various colors and size.
     *
     * @param {Array.<Dataset.Cell>} cells
     * @param {number} r
     * @param {GeoCanvas} cg
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
            /** @type {function(number,number,Style.Stat|undefined,number):number} */
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NinjaStarStyle: () => (/* reexport safe */ _NinjaStarStyle__WEBPACK_IMPORTED_MODULE_0__.NinjaStarStyle)
/* harmony export */ });
/* harmony import */ var _NinjaStarStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NinjaStarStyle */ "./src/NinjaStarStyle.js");
//@ts-check


//export styles


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHZpei1zdHlsZS1uaW5qYS1zdGFyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ1k7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsV0FBVyw0QkFBNEI7OztBQUd2QztBQUNBO0FBQ0E7QUFDTzs7QUFFUCxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjs7QUFFQTtBQUNBLGtCQUFrQiw2REFBNkQ7QUFDL0U7O0FBRUE7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjs7QUFFQTtBQUNBLGtCQUFrQiw0REFBNEQ7QUFDOUU7O0FBRUE7QUFDQSxrQkFBa0Isb0NBQW9DO0FBQ3REO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDLGVBQWUsUUFBUTtBQUN2QixlQUFlLFdBQVc7QUFDMUI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qiw0REFBNEQ7QUFDbkY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QiwrREFBK0Q7QUFDNUY7QUFDQTs7Ozs7OztVQzFJQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDWTs7QUFFWjtBQUNpRCIsInNvdXJjZXMiOlsid2VicGFjazovL2d2aXovd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2d2aXovLi9zcmMvTmluamFTdGFyU3R5bGUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ndml6L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ndml6L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ3Zpei93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2d2aXovLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZ3ZpelwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJndml6XCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuLy9pbXBvcnQgU3R5bGUgZnJvbSAnZ3JpZHZpeidcbi8vaW1wb3J0IEdlb0NhbnZhcyBmcm9tICdncmlkdml6J1xuLy9pbXBvcnQgRGF0YXNldCBmcm9tICdncmlkdml6J1xuLy9pbXBvcnQgQ2VsbCBmcm9tICdncmlkdml6J1xuLy9pbXBvcnQgU2hhcGUgZnJvbSAnZ3JpZHZpeidcbi8vaW1wb3J0IFN0YXQgZnJvbSAnZ3JpZHZpeidcbi8vaW1wb3J0IHsgZ3ZpeiB9IGZyb20gJ2dyaWR2aXonXG4vL2ltcG9ydCAqIGZyb20gJ2dyaWR2aXonXG4vL2ltcG9ydCB7IFNvbWV0aGluZzEgYXMgTXlTb21ldGhpbmcgfSBmcm9tIFwibXktbW9kdWxlLmpzXCJcblxuXG4vKipcbiAqIEBhdXRob3IgSm9zZXBoIERhdmllcywgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIE5pbmphU3RhclN0eWxlIGV4dGVuZHMgU3R5bGUge1xuXG4gICAgLyoqIEBwYXJhbSB7b2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKiBUaGUgbmFtZSBvZiB0aGUgY29sdW1uL2F0dHJpYnV0ZSBvZiB0aGUgdGFidWxhciBkYXRhIHdoZXJlIHRvIHJldHJpZXZlIHRoZSB2YXJpYWJsZSBmb3IgY29sb3IuXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3JDb2wgPSBvcHRzLmNvbG9yQ29sXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBjb2xvciBvZiB0aGUgY2VsbC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKG51bWJlcixudW1iZXIsIFN0eWxlLlN0YXR8dW5kZWZpbmVkLG51bWJlcik6c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbG9yID0gb3B0cy5jb2xvciB8fCAoKCkgPT4gJyNFQTZCQUMnKSAvLyh2LHIscyx6ZikgPT4ge31cblxuICAgICAgICAvKiogVGhlIG5hbWUgb2YgdGhlIGNvbHVtbi9hdHRyaWJ1dGUgb2YgdGhlIHRhYnVsYXIgZGF0YSB3aGVyZSB0byByZXRyaWV2ZSB0aGUgdmFyaWFibGUgZm9yIHNpemUuXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZUNvbCA9IG9wdHMuc2l6ZUNvbFxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgc2l6ZSBvZiBhIGNlbGwgaW4gZ2VvZ3JhcGhpY2FsIHVuaXQuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihudW1iZXIsbnVtYmVyLFN0eWxlLlN0YXR8dW5kZWZpbmVkLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBvcHRzLnNpemVcblxuICAgICAgICAvKiogQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHNoYXBlIG9mIGEgY2VsbC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKERhdGFzZXQuQ2VsbCk6U3R5bGUuU2hhcGV9ICovXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlIHx8ICgoKSA9PiAnc3F1YXJlJylcbiAgICB9XG5cblxuICAgIC8vaW1wb3J0KFwiLi4vR2VvQ2FudmFzXCIpLkdlb0NhbnZhc1xuXG4gICAgLyoqXG4gICAgICogRHJhdyBjZWxscyBhcyBzcXVhcmVzLCB3aXRoIHZhcmlvdXMgY29sb3JzIGFuZCBzaXplLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS48RGF0YXNldC5DZWxsPn0gY2VsbHNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gclxuICAgICAqIEBwYXJhbSB7R2VvQ2FudmFzfSBjZ1xuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIHIsIGNnKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJOaW5qYSBzdGFyIHN0eWxlIE9LICFcIilcblxuICAgICAgICAvL2ZpbHRlclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIGNlbGxzID0gY2VsbHMuZmlsdGVyKHRoaXMuZmlsdGVyKVxuXG4gICAgICAgIC8vem9vbSBmYWN0b3JcbiAgICAgICAgY29uc3QgemYgPSBjZy5nZXRaZigpXG5cbiAgICAgICAgbGV0IHN0YXRTaXplXG4gICAgICAgIGlmICh0aGlzLnNpemVDb2wpIHtcbiAgICAgICAgICAgIC8vaWYgc2l6ZSBpcyB1c2VkLCBzb3J0IGNlbGxzIGJ5IHNpemUgc28gdGhhdCB0aGUgYmlnZ2VzdCBhcmUgZHJhd24gZmlyc3RcbiAgICAgICAgICAgIGNlbGxzLnNvcnQoKGMxLCBjMikgPT4gYzJbdGhpcy5zaXplQ29sXSAtIGMxW3RoaXMuc2l6ZUNvbF0pXG4gICAgICAgICAgICAvL2FuZCBjb21wdXRlIHNpemUgdmFyaWFibGUgc3RhdGlzdGljc1xuICAgICAgICAgICAgc3RhdFNpemUgPSBTdHlsZS5nZXRTdGF0aXN0aWNzKGNlbGxzLCAoYykgPT4gY1t0aGlzLnNpemVDb2xdLCB0cnVlKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0YXRDb2xvclxuICAgICAgICBpZiAodGhpcy5jb2xvckNvbCkge1xuICAgICAgICAgICAgLy9jb21wdXRlIGNvbG9yIHZhcmlhYmxlIHN0YXRpc3RpY3NcbiAgICAgICAgICAgIHN0YXRDb2xvciA9IFN0eWxlLmdldFN0YXRpc3RpY3MoY2VsbHMsIChjKSA9PiBjW3RoaXMuY29sb3JDb2xdLCB0cnVlKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9kcmF3IHdpdGggSFRNTCBjYW52YXNcbiAgICAgICAgLy9pbiBnZW8gY29vcmRpbmF0ZXNcbiAgICAgICAgY2cuc2V0Q2FudmFzVHJhbnNmb3JtKClcblxuICAgICAgICBjb25zdCByMiA9IHIgKiAwLjVcbiAgICAgICAgZm9yIChsZXQgY2VsbCBvZiBjZWxscykge1xuICAgICAgICAgICAgLy9jb2xvclxuICAgICAgICAgICAgY29uc3QgY29sID0gdGhpcy5jb2xvciA/IHRoaXMuY29sb3IoY2VsbFt0aGlzLmNvbG9yQ29sXSwgciwgc3RhdENvbG9yLCB6ZikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghY29sIHx8IGNvbCA9PT0gJ25vbmUnKSBjb250aW51ZVxuICAgICAgICAgICAgY2cuY3R4LmZpbGxTdHlsZSA9IGNvbFxuXG4gICAgICAgICAgICAvL3NoYXBlXG4gICAgICAgICAgICBjb25zdCBzaGFwZSA9IHRoaXMuc2hhcGUgPyB0aGlzLnNoYXBlKGNlbGwpIDogJ3NxdWFyZSdcbiAgICAgICAgICAgIGlmIChzaGFwZSA9PT0gJ25vbmUnKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL3NpemVcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcixTdHlsZS5TdGF0fHVuZGVmaW5lZCxudW1iZXIpOm51bWJlcn0gKi9cbiAgICAgICAgICAgIGxldCBzXyA9IHRoaXMuc2l6ZSB8fCAoKCkgPT4gcilcbiAgICAgICAgICAgIC8vc2l6ZSAtIGluIGdlbyB1bml0XG4gICAgICAgICAgICBjb25zdCBzRyA9IHNfKGNlbGxbdGhpcy5zaXplQ29sXSwgciwgc3RhdFNpemUsIHpmKVxuXG4gICAgICAgICAgICAvL2dldCBvZmZzZXRcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0KGNlbGwsIHIsIHpmKVxuXG4gICAgICAgICAgICBpZiAoc2hhcGUgPT09ICdzcXVhcmUnKSB7XG4gICAgICAgICAgICAgICAgLy9kcmF3IHNxdWFyZVxuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSByICogKDEgLSBzRyAvIHIpICogMC41XG4gICAgICAgICAgICAgICAgY2cuY3R4LmZpbGxSZWN0KGNlbGwueCArIGQgKyBvZmZzZXQuZHgsIGNlbGwueSArIGQgKyBvZmZzZXQuZHksIHNHLCBzRylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hhcGUgPT09ICdjaXJjbGUnKSB7XG4gICAgICAgICAgICAgICAgLy9kcmF3IGNpcmNsZVxuICAgICAgICAgICAgICAgIGNnLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgIGNnLmN0eC5hcmMoY2VsbC54ICsgcjIgKyBvZmZzZXQuZHgsIGNlbGwueSArIHIyICsgb2Zmc2V0LmR5LCBzRyAqIDAuNSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKVxuICAgICAgICAgICAgICAgIGNnLmN0eC5maWxsKClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hhcGUgPT09ICdkb251dCcpIHtcbiAgICAgICAgICAgICAgICAvL2RyYXcgZG9udXRcbiAgICAgICAgICAgICAgICBjb25zdCB4YyA9IGNlbGwueCArIHIyICsgb2Zmc2V0LmR4LFxuICAgICAgICAgICAgICAgICAgICB5YyA9IGNlbGwueSArIHIyICsgb2Zmc2V0LmR5XG4gICAgICAgICAgICAgICAgY2cuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgY2cuY3R4Lm1vdmVUbyh4YywgeWMpXG4gICAgICAgICAgICAgICAgY2cuY3R4LmFyYyh4YywgeWMsIHIyLCAwLCAyICogTWF0aC5QSSlcbiAgICAgICAgICAgICAgICBjZy5jdHguYXJjKHhjLCB5YywgKDEgLSBzRyAvIHIpICogcjIsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKVxuICAgICAgICAgICAgICAgIGNnLmN0eC5jbG9zZVBhdGgoKVxuICAgICAgICAgICAgICAgIGNnLmN0eC5maWxsKClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hhcGUgPT09ICdkaWFtb25kJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHMyID0gc0cgKiAwLjVcbiAgICAgICAgICAgICAgICBjZy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgICAgICBjZy5jdHgubW92ZVRvKGNlbGwueCArIHIyIC0gczIsIGNlbGwueSArIHIyKVxuICAgICAgICAgICAgICAgIGNnLmN0eC5saW5lVG8oY2VsbC54ICsgcjIsIGNlbGwueSArIHIyICsgczIpXG4gICAgICAgICAgICAgICAgY2cuY3R4LmxpbmVUbyhjZWxsLnggKyByMiArIHMyLCBjZWxsLnkgKyByMilcbiAgICAgICAgICAgICAgICBjZy5jdHgubGluZVRvKGNlbGwueCArIHIyLCBjZWxsLnkgKyByMiAtIHMyKVxuICAgICAgICAgICAgICAgIGNnLmN0eC5maWxsKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHNoYXBlOicgKyBzaGFwZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vdXBkYXRlIGxlZ2VuZHNcbiAgICAgICAgdGhpcy51cGRhdGVMZWdlbmRzKHsgc3R5bGU6IHRoaXMsIHI6IHIsIHpmOiB6Ziwgc1NpemU6IHN0YXRTaXplLCBzQ29sb3I6IHN0YXRDb2xvciB9KVxuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG4vL2V4cG9ydCBzdHlsZXNcbmV4cG9ydCB7IE5pbmphU3RhclN0eWxlIH0gZnJvbSAnLi9OaW5qYVN0YXJTdHlsZSdcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==