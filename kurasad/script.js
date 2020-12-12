const $cards = $(".card");
const $style = $(".hover");

$cards.on("mousemove", function(e) {
  var $card = $(this);
  var l = e.offsetX;
  var t = e.offsetY;
  var h = $card.height();
  var w = $card.width();
  var lp = Math.abs(Math.floor(100 / w * l)-100);
  var tp = Math.abs(Math.floor(100 / h * t)-100);
  var bg = `background-position: ${lp}% ${tp}%;`
  var style = `.card.active:before { ${bg} }`
  $cards.removeClass("active");
  $card.addClass("active");
  $style.html(style);
}).on("mouseout", function() {
  $cards.removeClass("active");
});

const resetTransform = (el, perspective = 800) =>
  (el.style.transform = `translate3d(0%, 0%, -${perspective /
    2}px) rotateX(0deg) rotateY(0deg)`);

const onMove = (ev, el) => {
  const { pageX, pageY } = ev;
  const { offsetWidth, offsetHeight } = el;
  const { left, top } = el.getBoundingClientRect();

  const cardX = left + offsetWidth / 2;
  const cardY = top + offsetHeight / 2;

  const angle = 25;
  const rotX = (cardY - pageY) / angle;
  const rotY = (cardX - pageX) / -angle;

  el.style.transform = `translate3d(0%, 0%, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
};

const perspective =
    getComputedStyle($cards[0].parentElement)
      .getPropertyValue("perspective")
      .replace("px", "") || 800;

const onCardMove = ev => onMove(ev, ev.target);
const onHover = ev => ev.target.addEventListener("mousemove", onCardMove);
const onOut = ev => {
  resetTransform(ev.target, perspective); // reset card
  ev.target.removeEventListener("mousemove", onCardMove);
};

[...$cards.toArray()].forEach(card => {
  card.addEventListener("mouseover", onHover);
  card.addEventListener("mouseout", onOut);
});