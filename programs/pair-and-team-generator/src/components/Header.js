import React, { useState } from 'react';
import ButtonIcon from './ButtonIcon';
import '../stylesheets/Header.scss';

export default props => {
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedExcel, setCopiedExcel] = useState(false);

  const handleExportToJson = () => {
    props.copyToClipboard('json');
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleExportToExcel = () => {
    props.copyToClipboard('excel');
    setCopiedExcel(true);
    setTimeout(() => setCopiedExcel(false), 2000);
  };

  return (
    <header className="header d-flex justify-content-between align-items-center">
      <h1 className="title">Generador de equipos y parejas</h1>
      <div>
        <span className={`copied-to-clipboard ${copiedJson ? 'show' : ''}`}>
          ¡Datos copiados en formato JSON!
        </span>
        <span className={`copied-to-clipboard ${copiedExcel ? 'show' : ''}`}>
          ¡Datos copiados en formato Excel!
        </span>
        <ButtonIcon title="Exportar a JSON" icon="file-code-o" onClick={handleExportToJson} />
        <ButtonIcon title="Exportar a Excel" icon="file-excel-o" onClick={handleExportToExcel} />
      </div>
    </header>
  );
};
