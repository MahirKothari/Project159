AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
  },
  init: function () {
    this.handleClickEvents();
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
  },

  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placesId = ["superman", "spiderman", "outer-space", "captain-aero"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
      });
      this.el.setAttribute("material", {
        color: "#D76B30",
        opacity: 1,
      });
    }
  },
  handleClickEvents: function () {
    this.el.addEventListener("click",(evt) => {
      const placesContainer  = document.querySelector("#places-container")
      const{state} = placesContainer.getAttribute("comic")
      if (state == 'comics-list'){
        const id = this.el.getAttribute("id")
        const placesId = ["superman", "spiderman", "outer-space", "captain-aero"]
        if (placesId.includes(id)){
          placesContainer.setAttribute("comic",{state:'view',selectedCard:id})
        }
      }
    })
  },
  handleMouseEnterEvents: function () {
    // Mouse Enter Events
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
    });
  },
  handleMouseLeaveEvents: function () {
    // Mouse Leave Events
    this.el.addEventListener("mouseleave", () => {
      const {selectedItemId} = this.data 
      if (selectedItemId){
        const el = document.querySelector(`#${selectedItemId}`)
        const id = el.getAttribute("id")
        if (id == selectedItemId){
          el.setAttribute("material",{color:"#fff",opacity:1})
        }
      }
    });
  },
});
