import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links">
        <a href="#about-project" className="nav-tab__link">О проекте</a>
        <a href="#techs" className="nav-tab__link">Технологии</a>
        <a href="#about-me" className="nav-tab__link">Студент</a>
      </ul>
    </nav>
  );
}

export default NavTab;