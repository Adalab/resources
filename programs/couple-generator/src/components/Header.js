import HeaderProgress from './HeaderProgress';
import '../stylesheets/Header.scss';

export default props => {
  return (
    <header className="header d-flex justify-content-between align-items-center">
      <h1 className="title">Generador de equipos y parejas</h1>
      <HeaderProgress
        showExportView={props.showExportView}
        toggleShowExportView={props.toggleShowExportView}
      />
    </header>
  );
};
