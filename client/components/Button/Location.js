export default function LocationButton(props) {
  this.state = {
    location: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const templateLiteral = `
    ${
      props.location == null
        ? `<button class='location-add-button'><img src='../images/dev/add_green.svg'></button>`
        : `<div class='location-button'><div class='location-name'>${props.location}</div><button class='location-cancel'><img src='../images/dev/cancel_green.svg'></button></div>`
    }
        `;

    props.parent.insertAdjacentHTML('beforeend', templateLiteral);
  };

  this.render();
}
