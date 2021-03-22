import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container about-project__container_description">
        <h3 className="about-project__subtitle about-project__subtitle_stages">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__text about-project__text_stages">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h3 className="about-project__subtitle about-project__subtitle_time">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__text about-project__text_time">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__container about-project__container_graph">
        <div className="about-project__container-item about-project__container-item_backend">
          <figure className="about-project__graph about-project__graph_backend">1 неделя</figure>
          <figcaption className="about-project__caption about-project__caption_backend">Back-end</figcaption>
        </div>
        <div className="about-project__container-item about-project__container-item_frontend">
          <figure className="about-project__graph about-project__graph_frontend">4 недели</figure>
          <figcaption className="about-project__caption about-project__caption_frontend">Front-end</figcaption>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;