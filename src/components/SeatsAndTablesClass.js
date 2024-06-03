import * as d3 from 'd3';

const MIN_RECT_WIDTH = 15;
const MIN_RECT_HEIGHT = 8;

const SeatsAndTablesClass = class {
  constructor(svg, data, role, setSelSeat, bookings = [], tableWidth = null, tableHeight = null) {
    this.svg = svg;
    this.role = role;
    this.seatData = data.seats;
    this.tableData = data.tables;
    this.bookings = bookings;
    this.selChair = null;
    this.setSelSeat = setSelSeat;
    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;

    console.log("Bookings in constructor:", this.bookings);

    this.initSeatsSvg();
    this.initTableSvg();
  }

  initSeatsSvg() {
    const self = this;
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

    console.log("Today's date:", today);

    // Update selection
    let updateSelection = this.svg.selectAll("circle.chair")
      .data(this.seatData, d => d.id);

    // Enter selection
    let enterSelection = updateSelection.enter()
      .append("circle")
      .classed("chair", true)
      .attr("name", d => d.name)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y || 0) // Ensure y has a default value of 0
      .attr("r", 10);

    // Exit selection
    updateSelection.exit().remove();

    // Merge enter and update selections
    updateSelection = enterSelection.merge(updateSelection);

    updateSelection.attr("fill", function (d) {
  const isBooked = self.bookings.some(booking => 
    booking.seatId === d.id && 
    moment(booking.startDate).isSameOrBefore(today, 'day') && 
    moment(booking.endDate).isSameOrAfter(today, 'day')
  );
  console.log(`Seat ID: ${d.id}, Fill Color: ${isBooked ? 'black' : 'none'}`); // Debug log
  return isBooked ? 'black' : 'none';
})
.classed("booked", function (d) {
  const isBooked = self.bookings.some(booking => 
    booking.seatId === d.id && 
    moment(booking.startDate).isSameOrBefore(today, 'day') && 
    moment(booking.endDate).isSameOrAfter(today, 'day')
  );
  console.log(`Seat ID: ${d.id}, Is Booked: ${isBooked}`); // Debug log
  return isBooked;
});


    if (this.role === 'admin') {
      updateSelection.call(d3.drag()
        .on("start", this.dragStarted)
        .on("drag", this.draggingSeat));
    }

    updateSelection.on("mouseenter mouseleave", this.rectHover)
      .on("click", function (event, d) { self.clickSeat(event, d, d3.select(this)) });
  }

  draggingSeat(event, d) {
    d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
  }

  clickSeat(event, d, item) {
    d3.selectAll("circle.chair").classed('selected', false);
    this.selChair = d.id;
    item.classed('selected', true);
    this.setSelSeat(d.id);
  }

  rectHover(event, d) {
    var el = d3.select(this), isEntering = event.type === "mouseenter";
    el.classed("hovering", isEntering);
  }

  initTableSvg() {
    const self = this;
    let gTable = this.svg
      .selectAll("g.rectangle")
      .data(this.tableData)
      .enter()
      .append("g")
      .classed("rectangle", true)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    gTable.append("rect")
      .attr("width", function (d) { return d.width; })
      .attr("height", function (d) { return d.height; });

    if (this.role === 'admin') {
      gTable.call(d3.drag()
        .on("drag", function (event, d) {
          if (self.tableWidth && self.tableHeight) {
            self.tableWidth.value = "";
            self.tableHeight.value = "";
          }
          self.draggedTable.call(this, event, d);
        }));
    }

    if (this.role === 'admin') {
      let smallcircle = gTable
        .append("circle")
        .classed("bottomright", true)
        .attr("r", 4)
        .attr("cx", function (d) {
          return d.width;
        })
        .attr("cy", function (d) {
          return d.height;
        });

      smallcircle.on("mouseenter mouseleave", this.resizerHover)
        .call(d3.drag()
          .on("start", this.rectResizeStart)
          .on("drag", function (event, d) {
            self.rectResizing.apply(this, [event, d,
              (val) => { if (self.tableWidth) self.tableWidth.value = val; },
              (val) => { if (self.tableHeight) self.tableHeight.value = val; }])
          }));
    }
  }

  draggedTable(event, d) {
    d3.select(this).attr("transform", function (d) {
      d.x = event.x;
      d.y = event.y;
      return "translate(" + d.x + "," + d.y + ")";
    });
  }

  resizerHover(event, d) {
    var el = d3.select(this), isEntering = event.type === "mouseenter";
    el.classed("hovering", isEntering);
  }

  rectResizing(event, d, setWidthVal, setHeightVal) {
    d.width = Math.max(event.x - d.x + d.initWidth, MIN_RECT_WIDTH);
    d.height = Math.max(event.y - d.y + d.initHeight, MIN_RECT_HEIGHT);

    setWidthVal(d.width);
    setHeightVal(d.height);

    d3.select(this.parentNode).select("rect").attr("width", d.width);
    d3.select(this.parentNode).select("rect").attr("height", d.height);

    d3.select(this.parentNode).select("circle").attr("cx", d.width);
    d3.select(this.parentNode).select("circle").attr("cy", d.height);
  }

  rectResizeStart(event, d) {
    d.initWidth = d.width;
    d.initHeight = d.height;
  }
}

export default SeatsAndTablesClass;
