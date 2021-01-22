import React from "react";
import { Helmet } from "react-helmet";

class Oclock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { time: new Date() };
    this.dayTime = { dayTime: new Date().getHours() };
    this.radius = this.props.size / 4;
    this.drawingContext = null;
    this.draw24hour = this.props.timeFormat.toLowerCase().trim() === "24hour";
    this.drawRoman =
      !this.draw24hour &&
      this.props.hourFormat.toLowerCase().trim() === "roman";
  }
  // isDayTime() {
  //     hours = new Date().getHours()
  //     console.log(hours)
  //    isDayTime = hours > 6 && hours < 20
  // }
  // drag and drop /

  // var dragItem = document.querySelector("#item");
  // var container = document.querySelector("#container");

  // var active = false;
  // var currentX;
  // var currentY;
  // var initialX;
  // var initialY;
  // var xOffset = 0;
  // var yOffset = 0;

  // container.addEventListener("touchstart", dragStart, false);
  // container.addEventListener("touchend", dragEnd, false);
  // container.addEventListener("touchmove", drag, false);

  // container.addEventListener("mousedown", dragStart, false);
  // container.addEventListener("mouseup", dragEnd, false);
  // container.addEventListener("mousemove", drag, false);

  // function dragStart(e) {
  //   if (e.type === "touchstart") {
  //     initialX = e.touches[0].clientX - xOffset;
  //     initialY = e.touches[0].clientY - yOffset;
  //   } else {
  //     initialX = e.clientX - xOffset;
  //     initialY = e.clientY - yOffset;
  //   }

  //   if (e.target === dragItem) {
  //     active = true;
  //   }
  // }

  // function dragEnd(e) {
  //   initialX = currentX;
  //   initialY = currentY;

  //   active = false;
  // }

  // function drag(e) {
  //   if (active) {

  //     e.preventDefault();

  //     if (e.type === "touchmove") {
  //       currentX = e.touches[0].clientX - initialX;
  //       currentY = e.touches[0].clientY - initialY;
  //     } else {
  //       currentX = e.clientX - initialX;
  //       currentY = e.clientY - initialY;
  //     }

  //     xOffset = currentX;
  //     yOffset = currentY;

  //     setTranslate(currentX, currentY, dragItem);
  //   }
  // }

  // function setTranslate(xPos, yPos, el) {
  //   el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  // }

  componentDidMount() {
    this.getDrawingContext();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  getDrawingContext() {
    this.drawingContext = this.refs.clockCanvas.getContext("2d");
    this.drawingContext.translate(this.radius, this.radius);
    this.radius *= 0.9;
  }

  tick() {
    this.setState({ time: new Date() });
    const radius = this.radius;
    let ctx = this.drawingContext;
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTicks(ctx, radius);
    this.drawTime(ctx, radius);
  }

  drawFace(ctx, radius) {
    if (this.dayTime.dayTime >= 6 && this.dayTime.dayTime < 18) {
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      const grad = ctx.createRadialGradient(
        0,
        0,
        radius * 0.95,
        0,
        0,
        radius * 1.05
      );
      grad.addColorStop(0, "#333");
      grad.addColorStop(0.5, "white");
      grad.addColorStop(1, "#333");
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius * 0.1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
      ctx.fillStyle = "#333";
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();

      const grad = ctx.createRadialGradient(
        0,
        0,
        radius * 0.95,
        0,
        0,
        radius * 1.05
      );
      grad.addColorStop(0, "#fff");
      grad.addColorStop(0.5, "black");
      grad.addColorStop(1, "#fff");
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius * 0.1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
    }
  }

  drawNumbers(ctx, radius) {
    const romans = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
    ];
    const fontBig = radius * 0.15 + "px Arial";
    const fontSmall = radius * 0.075 + "px Arial";
    let ang, num;

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.78);
      ctx.rotate(-ang);
      ctx.font = fontBig;
      if (this.dayTime.dayTime >= 6 && this.dayTime.dayTime < 18) {
        ctx.fillStyle = "black";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillText(this.drawRoman ? romans[num - 1] : num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.78);
      ctx.rotate(-ang);

      // Draw inner numerals for 24 hour time format
      if (this.draw24hour) {
        //  ctx.rotate(ang);
        //  ctx.translate(0, -radius * 0.60);
        //  ctx.rotate(-ang);
        //  ctx.font = fontSmall;
        //  ctx.fillStyle = "red";
        //  ctx.fillText((num + 12).toString(), 0, 0);
        //  ctx.rotate(ang);
        //  ctx.translate(0, radius * 0.60);
        //  ctx.rotate(-ang);
      }
    }

    // Write author text
    //    ctx.font = fontSmall;
    //    ctx.fillStyle = "#3D3B3D";
    //    ctx.translate(0, radius * 0.30);
    //    ctx.fillText("@AlanMunsonTech", 0, 0);
    //    ctx.translate(0, -radius * 0.30);
  }

  drawTicks(ctx, radius) {
    let numTicks, tickAng, tickX, tickY;

    for (numTicks = 0; numTicks < 60; numTicks++) {
      tickAng = (numTicks * Math.PI) / 30;
      tickX = radius * Math.sin(tickAng);
      tickY = -radius * Math.cos(tickAng);

      ctx.beginPath();
      ctx.lineWidth = radius * 0.01;
      ctx.moveTo(tickX, tickY);
      if (numTicks % 5 === 0) {
        ctx.lineTo(tickX * 0.88, tickY * 0.88);
      } else {
        ctx.lineTo(tickX * 0.92, tickY * 0.92);
      }
      ctx.stroke();
    }
  }

  drawTime(ctx, radius) {
    const now = this.state.time;
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // hour
    hour %= 12;
    hour =
      (hour * Math.PI) / 6 +
      (minute * Math.PI) / (6 * 60) +
      (second * Math.PI) / (360 * 60);
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.05);
    // minute
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.05);
    // second
    second = (second * Math.PI) / 30;
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");
  }

  drawHand(ctx, position, length, width, color) {
    if (this.dayTime.dayTime >= 6 && this.dayTime.dayTime < 18) {
      color = color || "black";
    } else {
      color = color || "#ede7e6";
    }
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(position);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-position);
  }

  render() {
    return (
      <div id="outerContainer">
        <div id="container">
          <div id="item">
            <div
              className="Clock"
              style={{ width: String(this.props.size) + "px" }}
            >
              <canvas
                width={this.props.size}
                height={this.props.size}
                ref="clockCanvas"
              />
            </div>
          </div>
        </div>
        <Helmet>
          <script src="../../../public/js/main.js" type="text/javascript" />
        </Helmet>
      </div>
    );
  }
}

export default Oclock;
