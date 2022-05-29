AFRAME.registerComponent("comic", {
  schema:{
    state:{type:'string',default:'comics-list'},
    selectedCard:{type:'string',default:'#card1'}
  },  
  init: function () {
    this.placesContainer = this.el;
    this.createCards()
  },
  hideEl: function (elList){
    elList.map((el)=>{
      el.setAttribute('visible',false)
    })
  },
  showView: function (){
    const selectedCard = this.data.selectedCard
    const skyEl = document.querySelector("#main-container")
    skyEl.setAttribute("material",{src:`./assets/comics/${selectedCard}/comic-0.jpg`,color:'#fff'})
  },  
  tick: function () {
    const{state}=this.el.getAttribute("comic")
    if (state == 'view'){
      this.hideEl([this.placesContainer])
      this.showView()
    }
  },
  createCards: function () {
    const thumbNailsRef = [
      {
        id: "superman",
        title: "SuperMan",
        url: "./assets/thumbnails/Superman.jpg",
      },
      {
        id: "spiderman",
        title: "Spiderman",
        url: "./assets/thumbnails/Spiderman.jpg",
      },

      {
        id: "outer-space",
        title: "Outer Space",
        url: "./assets/thumbnails/OuterSpace.jpg",
      },
      {
        id: "captain-aero",
        title: "Captain Aero",
        url: "./assets/thumbnails/CaptainAero.jpg",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position,item.id)

      // Thumbnail Element
     const thumbnail = this.createThumbnail(item)
     borderEl.appendChild(thumbnail)

      // Title Text Element
      const titleEl = this.createTitle(position,item)
      borderEl.appendChild(titleEl)

      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function(position,id){
    const entityEl = document.createElement('a-entity')
    entityEl.setAttribute('id',id)
    entityEl.setAttribute('visible',true)
    entityEl.setAttribute('geometry',
    {primitive:'plane',
    width:22,
    height:30
  });
    entityEl.setAttribute('position',position)
    entityEl.setAttribute('material',
    {color:'#fff'
  });

    //Add cursor-listener component to the ring border entity to change it's color 
    //On Cursor 'mouseenter' and 'mouseleave' entity
    entityEl.setAttribute("cursor-listener", {});

    return entityEl
  },
  createThumbnail: function(item){
    const entityEl = document.createElement('a-entity')
    entityEl.setAttribute('visible',true)
    entityEl.setAttribute('geometry',
    {primitive:'plane',
    width:20,
    height:28
  });
    entityEl.setAttribute('position',{x:0,y:0,z:0.1})
    entityEl.setAttribute('material',{src:item.url})
    return entityEl
  },
  createTitle: function(position,item){
    const entityEl = document.createElement('a-entity')
    entityEl.setAttribute('visible',true)
    entityEl.setAttribute('text',{font: 'exo2bold', align: 'center', width: 70, color: '#e65100', value: item.title})
    const elPosition = position
    elPosition.y = -25
    entityEl.setAttribute('position',position)
    return entityEl
  }
});
