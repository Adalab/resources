import React, { useState } from 'react';
import ButtonIcon from './ButtonIcon';
import Info from './Info';
import '../stylesheets/Header.scss';

export default props => {
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedExcel, setCopiedExcel] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleExportToJson = () => {
    props.copyToClipboard('json');
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const handleExportToExcel = () => {
    props.copyToClipboard('excel');
    setCopiedExcel(true);
    setTimeout(() => setCopiedExcel(false), 2500);
  };

  return (
    <>
      <header className="header">
        <h1 className="title">Generador de equipos y parejas de Adalab</h1>
        <div className="btn-icons-group">
          <ButtonIcon
            title="Exportar a JSON"
            icon="code"
            active={copiedJson}
            onClick={handleExportToJson}
          />
          <ButtonIcon
            title="Exportar a Excel"
            icon="note"
            active={copiedExcel}
            onClick={handleExportToExcel}
          />
          <ButtonIcon
            title="Mostrar información"
            icon="info"
            onClick={() => setShowInfo(!showInfo)}
          />
        </div>
      </header>

      <Info showInfo={showInfo} />
    </>
  );
};
