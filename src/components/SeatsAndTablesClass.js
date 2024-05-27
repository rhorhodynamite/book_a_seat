import * as d3 from 'd3';

const MIN_RECT_WIDTH = 15;
const MIN_RECT_HEIGHT = 8;

const SeatsAndTablesClass = class {
  constructor(svg, data, role, setSelSeat, tableWidth = null, tableHeight = null, bookedSeatsForToday = []) {
    this.svg = svg;
    this.role = role;
    this.seatData = data.seats;
    this.tableData = data.tables;
    this.bookedSeatsForToday = bookedSeatsForToday; // Store booked seats data

    this.selChair = null;
    this.setSelSeat = setSelSeat;
    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;

    this.maxSeatId = this.seatData.length === 0 ? 0 : Math.max(...this.seatData.map(o => o.id));
    this.maxTableId = this.tableData.length === 0 ? 0 : Math.max(...this.tableData.map(o => o.id));

    this.initSeatsSvg();
    this.initTableSvg();
  }

  initSeatsSvg(){
    const self = this;
    let c = this.svg
      .selectAll("circle.chair")
      .data(this.seatData, function(d) { return d.id; })
      .enter()
      .append("circle")
      .classed("chair", true)
      .attr("name", function(d){return d.name})
      .attr("cx", function(d){ return d.x; })
      .attr("cy", function(d){ return d.y || 0; }) // Ensure y has a default value of 0
      .attr("r", 10)
      .attr("fill", function(d) {
        return self.bookedSeatsForToday.includes(d.id) ? 'red' : 'black';
      }); // Fill with red if booked for today

    if(this.role === 'admin'){
      c.call(d3.drag()
        .on("start", this.dragStarted)
        .on("drag", this.draggingSeat));
    }

    c.on("mouseenter mouseleave", this.rectHover)
     .on("click", function(event, d){self.clickSeat(event, d, d3.select(this))});
  }

  addSeat() {
    this.maxSeatId += 1;
    this.seatData.push({ id: this.maxSeatId, "name": `chair ${this.maxSeatId}`, x: 5, y: 5 });
    this.initSeatsSvg();
  }

  draggingSeat(event, d) {
    d3.select(this).attr("cx", d.x = event.x ).attr("cy", d.y = event.y);
  }

  clickSeat(event, d, item){
    d3.selectAll("circle.chair").classed('selected', false);
    this.selChair = d.id;
    item.classed('selected', true);
    this.setSelSeat(d.id);
  }

  rectHover(event, d) {
    var el = d3.select(this), isEntering = event.type === "mouseenter";
    el.classed("hovering", isEntering);
  }

  initTableSvg(){
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
          .attr("width", function (d) { return d.width })
          .attr("height", function (d) { return d.height });

    if(this.role === 'admin'){
      gTable.call(d3.drag() 
        .on("drag", function(event, d){ 
          if (self.tableWidth && self.tableHeight) {
            self.tableWidth.value = ""; 
            self.tableHeight.value = "";
          }
          self.draggedTable.call(this, event, d)
        }));
    }

    if(this.role === 'admin'){
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
          .on("drag", function(event, d){self.rectResizing.apply(this, [event, d, 
            (val)=>{if(self.tableWidth) self.tableWidth.value = val;}, 
            (val)=>{if(self.tableHeight) self.tableHeight.value = val;}])}));
    }
  }

  addTable() {
    this.maxTableId += 1;
    this.tableData.push({ id: this.maxTableId, "name": `table ${this.maxTableId}`, x: 2, y: 2, width: 100, height: 60 });
    this.initTableSvg();
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




