import backgroundImage from "../../images/promo__background-image.svg";
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <img className="promo__background-image" src={backgroundImage} alt="Стилизованный логотип Яндекс Практикума" />
      <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
    </section>
  );
}

export default Promo;