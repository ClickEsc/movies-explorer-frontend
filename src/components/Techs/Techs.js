import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="techs__stack">
        <div className="techs__stack-item techs__stack-item_html">HTML</div>
        <div className="techs__stack-item techs__stack-item_css">CSS</div>
        <div className="techs__stack-item techs__stack-item_js">JS</div>
        <div className="techs__stack-item techs__stack-item_react">React</div>
        <div className="techs__stack-item techs__stack-item_git">Git</div>
        <div className="techs__stack-item techs__stack-item_express">Express.js</div>
        <div className="techs__stack-item techs__stack-item_mongo">mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;