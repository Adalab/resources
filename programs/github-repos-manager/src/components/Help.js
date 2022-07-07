import React from 'react';

function Help() {
  return (
    <div className="text-secondary sm bg-light p-4 border">
      <h2 className="h6 text-primary">Cómo usar el proyecto</h2>
      <h3 className="fs-m text-primary font-weight-normal">Cada repo tiene dos botones:</h3>
      <ul className="fs-m">
        <li>
          <p>
            Un botón para crear un issue en el repo con el título{' '}
            <strong>AdaBot: por favor transfiere o borra este repositorio</strong>. Además se dan
            permisos de administración a todos los colaboradores del repo para que cualquiera de
            ellos lo pueda borrar o transferir.
          </p>
        </li>
        <li>
          <p>
            Un botón para borrar el repo, que solo aparece si alguien ha creado un issue con el
            título <strong>AdaBot: por favor transfiere o borra este repositorio</strong> y han
            pasado más de 15 días de la creación del issue.
          </p>
          <p>
            Esta es una medida de seguridad para poder dar a las alumnas 15 días para que
            transfieran el repo, antes de borrárselo.
          </p>
        </li>
      </ul>
      <h3 className="fs-m text-primary font-weight-normal">Función deshacer (Ctrl+Z):</h3>
      <p className="fs-m">
        Todas las llamadas al API de GitHub se hacen con 10 segundos de retraso. De esta forma si te
        equivocas al enviar un issue o al borrar un repo tienes 10 segundos para cerrar la página.
        De esta forma la petición al API no se enviará.
      </p>
      <h3 className="fs-m text-primary font-weight-normal">Colores de los repos:</h3>
      <p className="fs-m">
        Con los repos de color amarillo hay que tener cuidado, son repos cuyos colaboradores son
        empleados de Adalab o son repos privados.
      </p>
    </div>
  );
}

export default Help;
