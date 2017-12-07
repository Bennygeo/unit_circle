/* 
 * Trigonametry Math formulas
 * library model for ease of use.
 */



_ = (function () {

    return {
        /**
         * Shorthand for log
         */
        trace: console.log,
        /*
         * 
         * @param {type} rad
         * @returns {Number}
         */
        degreeToRadians: function (rad) {
            return rad * Math.PI / 180;
        },
        /*
         * 
         * @param {type} angle
         * @returns {Number}
         */
        radianToDegree: function (angle) {
            return angle * 180 / Math.PI;
        },
        /*
         * 
         * @param {type} radius
         * @param {type} angle
         * @returns {_.getAngle.UtilsAnonym$0}
         */

        getObjectAngle: function (radius, angle) {
            return {
                x: radius * Math.cos(angle),
                y: radius * Math.sin(angle)
            };
        },

        /**
         * 
         */
        txtLabelPos: function (target) {
            //        _.trace("this.txtPadding : " + this.txtPadding);
            var tmp = this.getPosOfAngle(this.radius + this.txtPadding, _.getAngleOfPoint(target).angle);
            return {
                x: tmp.x,
                y: tmp.y
            };
        },
        /*
         * 
         * @param {type} obj
         * @param {type} radius
         * @param {type} angle
         * @param {type} txt
         * @returns {undefined}
         */
        setAngle: function (obj, radius, angle, txt, padding) {
            obj.x = this.getAngle(radius, this.degreeToRadians(angle)).newX;
            obj.y = this.getAngle(radius, this.degreeToRadians(angle)).newY;
            if (txt) {
                var tmp = this.getPosOfAngle(radius + padding, _.getAngleOfPoint(obj).angle);
                txt.x = tmp.x;
                txt.y = tmp.y;
            }
        },

        /*
         * 
         * @returns {undefined}
         */
        setRadiansAnglePos: function (obj, radius, angle, padding) {
            var objPos = this.getAngle(radius, this.degreeToRadians(angle));
            var objTmp = {
                x: objPos.newX,
                y: objPos.newY
            };
            var posXY = this.getPosOfAngle(radius + padding, _.getAngleOfPoint(objTmp).angle);
            obj.x = posXY.x;
            obj.y = posXY.y;
        },
        /*
         * @param {type} arg1
         * @param {type} arg2
         * @returns {_.getAngleOfPoint.UtilsAnonym$1|_.getAngleOfPoint.UtilsAnonym$2}
         */
        getAngleOfPoint: function (arg1, arg2) {
            if (arguments.length > 1) {
                return {
                    angle: Math.atan2(arg2, arg1)
                };
            } else {
                return {
                    angle: Math.atan2(arg1.y, arg1.x)
                };
            }
        },
        /*
         * @param {type} obj
         * @returns {undefined}
         */
        setRegistrationPoint: function (obj) {
            obj.regX = obj.getBounds().width / 2;
            obj.regY = obj.getBounds().height / 2;
        },
        /*
         * @param {type} obj
         * @param {type} point1
         * @param {type} point2
         * @param {type} lineThickness
         * @returns {undefined}
         */
        connectPoints: function (obj, point1, point2, lineThickness, col, dotedFlag) {
            var col = col || this.lineStrokeColor;
            obj.graphics.clear();
            obj.graphics.setStrokeStyle(lineThickness);
            obj.graphics.beginStroke(col);

            if (dotedFlag) {
                //            x1, y1, x2, y2, dashLen
                obj.graphics.dashedLineTo(point1.x, point1.y, point2.x, point2.y, 4);
            } else {

                obj.graphics.drawLine(point1.x, point1.y, point2.x, point2.y);
            }
            obj.graphics.closePath();
        },
        /*
         * Find the center point
         * Find the angle
         * Find the new {x, y} using given radius 
         * @returns {x, y}
         */
        getCirclePoint: function (stage, radius) {
            var dx = (stage.canvas.width / 2 - stage.mouseX);
            var dy = stage.canvas.height / 2 - stage.mouseY;
            var rad = Math.atan2(dy, dx);
            var newX = radius * Math.cos(rad);
            var newY = radius * Math.sin(rad);
            return {
                x: newX,
                y: newY
            };
        },
       
        /*
         * 
         * @param {type} pointA
         * @param {type} pointB
         * @param {type} pointC
         * @returns {Number}
         * 
         *  LAW OF COSINE(Angle version)
         * @var AB_d, AC_d and CB_d : distance calculation
         * @var angleBCA : Angle of BCA     
         */
        findAngle: function (pointA, pointB, pointC) {
            var AB_d = Math.sqrt((pointB.x - pointA.x) * (pointB.x - pointA.x) + (pointB.y - pointA.y) * (pointB.y - pointA.y));
            var AC_d = Math.sqrt((pointC.x - pointA.x) * (pointC.x - pointA.x) + (pointC.y - pointA.y) * (pointC.y - pointA.y));
            var CB_d = Math.sqrt((pointB.x - pointC.x) * (pointB.x - pointC.x) + (pointB.y - pointC.y) * (pointB.y - pointC.y));
            var BCA = Math.acos((AC_d * AC_d + CB_d * CB_d - AB_d * AB_d) / (2 * AC_d * CB_d));
            return Number((BCA * 180 / Math.PI).toFixed(1));
        },
        /*
         * @param {type} obj
         * @param {type} radius
         * @param {type} startAngle
         * @param {type} endAngle
         * @param {type} angleLoc
         * @param {type} lineThickness
         * @returns {undefined}
         */
        fillAngle: function (obj, radius, startAngle, endAngle, angleLoc, lineThickness) {
            obj.graphics.clear();
            obj.graphics.setStrokeStyle(lineThickness);
            obj.graphics.beginStroke(_.circleStrokeColor);
            //        obj.graphics.beginFill("#B3E5FC");        
            if (angleLoc === "pos") {
                obj.graphics.arc(0, 0, radius, startAngle, endAngle);
            } else {
                obj.graphics.arc(0, 0, radius, endAngle, startAngle);
            }
        },
        /*
         * @param {type} obj
         * @param {type} rad
         * @param {type} fillColor
         * @returns {undefined}
         */
        drawPoint: function (obj, rad, fillColor) {
            obj.graphics.clear();
            obj.graphics.beginFill(fillColor);
            obj.graphics.drawCircle(0, 0, rad);
            obj.graphics.closePath();
        },
        /*
         * @param {type} obj
         * @param {type} orgin
         * @param {type} radius
         * @param {type} from
         * @param {type} to
         * @param {type} lineThickness
         * @returns {undefined}
         */
        drawInfoArc: function (obj, orgin, radius, from, to, lineThickness, strokeColor) {
            if (strokeColor === undefined) {
                strokeColor = '#333';
            }
            obj.graphics.clear();
            obj.graphics.setStrokeStyle(lineThickness);
            obj.graphics.beginStroke(strokeColor);
            obj.graphics.arc(orgin.x, orgin.y, radius, from, to);


            //        obj.graphics.arc(0, 0, radius, from, to);
        },

        drawDottedArc: function (obj, orgin, radius, from, to, lineThickness, strokeColor, child) {
            if (strokeColor === undefined) {
                strokeColor = '#333';
            }

            obj.graphics.clear();
            //        obj.graphics.setStrokeStyle(lineThickness);
            //        obj.graphics.beginStroke(strokeColor);
            // reset the stroke dash, and draw a red rectangle:
            //        obj.graphics.setStrokeDash();
            //        obj.graphics.setStrokeStyle(8).beginStroke("red");

            // dotted dash:

            obj.graphics.setStrokeDash([1, 10]);
            obj.graphics.setStrokeStyle(lineThickness, 13, 13, 17, false).beginStroke(strokeColor);
            obj.graphics.arc(orgin.x, orgin.y, radius, from, to);

            //        obj.graphics.append(new createjs.Graphics.Circle(50, 50, 30));

            //        child.graphics.setStrokeDash([2, 2]);
            //        child.graphics.setStrokeStyle(lineThickness).beginStroke(strokeColor);
            //        child.graphics.arc(orgin.x, orgin.y, radius, from, to);

            //        obj.graphics.arc(0, 0, radius, from, to);
        },

        /*
         * 
         * @param {type} obj
         * @param {type} radius
         * @param {type} from
         * @param {type} to
         * @param {type} angleLoc
         * @param {type} lineThickness
         * @param {type} strokeColor
         * @returns {undefined}
         */
        drawArc: function (obj, radius, from, to, angleLoc, lineThickness, strokeColor) {
            obj.graphics.clear();
            obj.graphics.setStrokeStyle(lineThickness);
            obj.graphics.beginStroke(strokeColor);
            if (angleLoc === 'pos') {
                obj.graphics.arc(0, 0, radius, from, to);
            } else {
                obj.graphics.arc(0, 0, radius, to, from);
            }
        },
        drawFillArc: function (obj, radius, from, to, angleLoc, lineThickness, strokeColor, col) {
            obj.graphics.clear();
            obj.graphics.setStrokeStyle(lineThickness);
            obj.graphics.beginStroke(strokeColor);
            obj.graphics.beginFill(col);
            if (angleLoc === 'pos') {
                obj.graphics.arc(0, 0, radius, from, to);
            } else {
                obj.graphics.arc(0, 0, radius, to, from);
            }
        },
        /*
         * @param {Object : Graphic} pointA
         * @param {Object : Graphics} pointB
         * @returns {_.centerPointOfLine().x and _.centerPointOfLine().y}
         * It returns center point of two points
         */
        centerPointOfLine: function (pointA, pointB) {
            return {
                x: (pointA.x + pointB.x) / 2,
                y: (pointA.y + pointB.y) / 2
            };
        },
        /*
         * @param {type} r
         * @param {type} x1
         * @param {type} y1
         * @param {type} x2
         * @param {type} y2
         * @returns {_.midPointOfArc.UtilsAnonym$5}
         */
        midPointOfArc: function (r, x1, y1, x2, y2) {
            return {
                x: Math.sqrt((r + x1) * (r + x2)) - Math.sqrt((r - x1) * (r - x2)),
                y: Math.sqrt((r + y1) * (r + y2)) - Math.sqrt((r - y1) * (r - y2))
            };
        },
        /*
         * @param {type} obj
         * @param {type} r1
         * @param {type} dist
         * @param {type} point1
         * @param {type} point2
         * @returns {_.internalDivisionOfLineSegment.UtilsAnonym$}
         */

        internalDivisionOfLineSegment: function (r1, dist, point1, point2) {
            var r1 = r1;
            var r2 = dist - r1;
            return {
                x: ((r1 * point1.x) + (r2 * point2.x)) / (r1 + r2),
                y: ((r1 * point1.y) + (r2 * point2.y)) / (r1 + r2)
            };
        },
        /*
         * To show degree of an angle
         * @param {Graphic Shape} obj : Shape graphics to draw
         * @param {Number} r1 : Radius of the arc  
         * @param {Number} dist : Distance between the source and destination point. 
         * @param {Object Shape} point1 : start point
         * @param {Object Shape} point2 : end point
         * @param {Object Shape} orgin : orgin to draw
         * @returns {}
         * drawInfoArc : It draws an arc based on start and end angle.
         * Reference  :http://www.teacherschoice.com.au/Maths_Library/Analytical%20Geometry/AnalGeom_3.htm
         */

        showInfoAngle: function (obj, r1, dist, point1, point2, orgin, angleLoc, strokSize, strokColor, dotted, dottedChild) {
            //        var minDist = minDist || this.defaultArcSize;
            var padding = padding || 0.6;
            //        var thirdView = thirdView || false;

            var dottedFlag = dotted || false;

            var strokeColor = strokColor;

            var point1_orign_dist = this.distanceBetweenTwoObjects(point1, orgin).dist;
            var point2_orign_dist = this.distanceBetweenTwoObjects(point2, orgin).dist;
            var r1 = r1;
            var r2 = Math.abs(point1_orign_dist - r1);
            var r3 = Math.abs(point2_orign_dist - r1);
            var x1 = ((r1 * point1.x) + (r2 * orgin.x)) / (r1 + r2);
            var y1 = ((r1 * point1.y) + (r2 * orgin.y)) / (r1 + r2);
            var x2 = ((r1 * point2.x) + (r3 * orgin.x)) / (r1 + r3);
            var y2 = ((r1 * point2.y) + (r3 * orgin.y)) / (r1 + r3);
            var from = Math.atan2((y1 - orgin.y), (x1 - orgin.x));
            var to = Math.atan2((y2 - orgin.y), (x2 - orgin.x));
            var dist1_2 = this.distanceBetweenTwoObjects({ x: x1, y: y1 }, { x: x2, y: y2 });
            //Finding midPoint
            /*
             * step1 : midpoint of two points
             * step2 : dist midPoint vs vertex
             * step3 : subtract radius from dist
             * step4 : Add the y value with the midPoint coordinate y  value.
             */
            var midPoint = this.centerPointOfLine({ x: x1, y: y1 }, { x: x2, y: y2 });
            var x3 = midPoint.x;
            var y3 = midPoint.y;

            //        debugger;


            if (angleLoc === "pos") {
                this.drawInfoArc(obj, orgin, r1, from, to, strokSize, strokeColor);
            } else {
                this.drawInfoArc(obj, orgin, r1, to, from, strokSize, strokeColor);
            }
        },

        /*
         * Mid point of an arc
         * @param {type} r1
         * @param {type} orgin
         * @param {type} point1
         * @param {type} point2
         * @param {type} enable360
         * @returns {_.midPointOfArc.UtilsAnonym$15}
         */
        midPointOfArc: function (r1, orgin, point1, point2, enable360) {
            //midPoint of arc
            var arcXY = { x: 0, y: 0 };
            var relativeArm1 = { x: point1.x - orgin.x, y: point1.y - orgin.y };
            var relativeArm2 = { x: point2.x - orgin.x, y: point2.y - orgin.y };
            var relativeArm1Size = this.distanceBetweenTwoObjects(point1, orgin).dist;
            var relativeArm2Size = this.distanceBetweenTwoObjects(point2, orgin).dist;
            relativeArm1.x *= r1 / relativeArm1Size;
            relativeArm1.y *= r1 / relativeArm1Size;
            relativeArm2.x *= r1 / relativeArm2Size;
            relativeArm2.y *= r1 / relativeArm2Size;
            var relativeArm1Angle = Math.atan2(relativeArm1.y, relativeArm1.x);
            var relativeArm2Angle = Math.atan2(relativeArm2.y, relativeArm2.x);

            if (enable360) {
                if (relativeArm2Angle <= relativeArm1Angle) {
                    relativeArm2Angle += 2 * Math.PI;
                }
            }

            return {
                x: orgin.x + 30 * r1 * Math.cos(0.5 * (relativeArm1Angle + relativeArm2Angle)),
                y: orgin.y + 30 * r1 * Math.sin(0.5 * (relativeArm1Angle + relativeArm2Angle))
            };
        },
        /*
         * 
         * @param {type} point1
         * @param {type} point2
         * @returns {_.distanceBetweenTwoObjects.UtilsAnonym$7}
         */
        distanceBetweenTwoObjects: function (point1, point2) {
            return {
                dist: Math.sqrt(((point2.x - point1.x) * (point2.x - point1.x)) + ((point2.y - point1.y) * (point2.y - point1.y))),
                target: point2
            };
        },
        minimumTwoValues: function () {
            for (var i = 0; i < arguments.length; i++) {
                //            for(var)
            }
        },
        /*
         * 
         */
        distanceBetweenTwoPoints: function (x1, y1, x2, y2) {
            return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        },
        infoArcRadiusCalc: function (pointA, pointB, pointC, arcR) {
            var arcRadius = arcR || this.defaultArcSize;
            //        var distAB = this.distanceBetweenTwoPoints(pointA.x, pointA.y, pointB.x, pointB.y);
            var distBC = this.distanceBetweenTwoPoints(pointB.x, pointB.y, pointC.x, pointC.y);
            var distAC = this.distanceBetweenTwoPoints(pointA.x, pointA.y, pointC.x, pointC.y);
            var min = Math.min(distBC, distAC);
            if (min < this.defaultArcSize) {
                arcRadius = min;
            }
            return arcRadius;
        },
        drawCurveTo: function (obj, startAngle, endAngle, angleLoc) {
            obj.graphics.clear();
            obj.graphics.setStrokeStyle(lineThickness);
            obj.graphics.beginStroke("#333");
            if (angleLoc === "pos") {
                obj.graphics.moveTo(0, 0).arc(0, 0, radius, endAngle, startAngle);
            } else {
                obj.graphics.moveTo(0, 0).arc(0, 0, radius, startAngle, endAngle);
            }
        },
        findSlope: function (pointA, pointB) {
            return {
                m: (pointB.y - pointA.y) / (pointB.x - pointA.x)
            };
        },
        /*
         * 
         */

        drawCircle: function (fillCol, rad, stroke, strokeFill) {
            var fillColor = fillCol || "#333";
            var stroke = stroke || undefined;
            var strokeFillC = strokeFill || '#000';
            var rad = rad || 10;

            var cont = new createjs.Container();
            var circle = new createjs.Shape();

            var dragArea = new createjs.Shape();
            dragArea.graphics.clear();
            dragArea.graphics.setStrokeStyle(2);
            dragArea.graphics.beginStroke(strokeFill);
            dragArea.graphics.beginFill(fillCol);
            dragArea.alpha = 1;

            dragArea.graphics.drawCircle(0, 0, rad);

            circle.graphics.clear();
            if (stroke !== undefined) {
                //            circle.graphics.setStrokeStyle(stroke);
                //            circle.graphics.beginStroke(strokeFill);
            }
            //        circle.graphics.beginFill(fillColor);
            circle.graphics.beginFill(strokeFillC);
            circle.graphics.drawCircle(0, 0, stroke);


            cont.addChild(dragArea);
            cont.addChild(circle);

            //    dragArea.mouseEnabled = false;
            //    circle.mouseEnabled = false;

            return cont;
        }
    }
})();

Math.cot = function (x) {
    return 1 / Math.tan(x);
};

createjs.Shape.prototype.drawCircle = function (radius, fillColor) {
    this.graphics.clear();
    this.graphics.beginFill(fillColor);
    this.graphics.drawCircle(0, 0, radius);
    this.graphics.closePath();
};

createjs.Graphics.prototype.drawLine = function (x1, y1, x2, y2) {
    //    this.clear();
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
};
createjs.Graphics.prototype.dashedLineTo = function (x1, y1, x2, y2, dashLen) {
    this.moveTo(x1, y1);
    var dX = x2 - x1;
    var dY = y2 - y1;
    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
    var dashX = dX / dashes;
    var dashY = dY / dashes;
    var q = 0;
    while (q++ < dashes) {
        x1 += dashX;
        y1 += dashY;
        this[q % 2 === 0 ? 'moveTo' : 'lineTo'](x1, y1);
    }
    this[q % 2 === 0 ? 'moveTo' : 'lineTo'](x2, y2);
    return this;
};

createjs.Container.prototype.cacheObject = function () {
    var obj = this.getBounds();
    this.cache(obj.x, obj.y, obj.width, obj.height);
};
/*
* SET THE TARGET ELMENT TO THE LAST INDEX OF THE ARRAY.
* 
* Place passed value to the last index position and
* Last index value to the duplicate place
*/
Array.prototype.swapElements = function (el) {
    var tmp = this[this.length - 1], matchFlag = false;
    this[this.length - 1] = el;
    for (var i = 0; i < this.length - 2; i++) {
        if (this[i] === el) {
            matchFlag = true;
            break;
        }
    }
    if (matchFlag)
        this[i] = tmp;
};
Array.prototype.min = function () {
    return Math.min.apply(Math, this);
};



