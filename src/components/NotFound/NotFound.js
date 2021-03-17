import './NotFound.css';

function NotFound(props) {

  function goBack() {
    props.history.goBack();
  }

  return (
    <section className="not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button onClick={goBack} className="not-found__link">Назад</button>
    </section>
  );
}

export default NotFound;