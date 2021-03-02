import ButtonIcon from './ButtonIcon';
import '../stylesheets/Info.scss';

export default props => {
  const code = `// esta información no se puede subir a ningún repo público ya que es información privada de las alumnas
{
  "numberOfPeopleInAPair": 2, // número mínimo de alumnas en una pareja
  "numberOfPeopleInATeam": 4, // número mínimo de alumnas en un equipo
  "pairModules": 7, // número de sprints que hay en el curso
  "teamModules": 3, // número de módulos que hay en el curso
  "students": [
    {
      "name": "María García",
      "email": "maria.garcia@gmail.com",
      "teacher": "Dayana",
    },
    {
      "name": "Sofía Pérez",
      "email": "sofia.perez@gmail.com",
      "teacher": "Iván",
    },
    {
      "name": "Celia López",
      "email": "celia.lopez@gmail.com",
      "teacher": "Miguel",
    },
    {...}
  ]
}`;

  return (
    <section className={props.showInfo ? 'info show' : 'info'}>
      <h2 className="question">Pasos a seguir al inicio de una promoción:</h2>
      <p className="anwser">
        Editar el fichero <strong>./src/data/data.json</strong> añadiendo la siguiente información:
      </p>
      <pre>
        <code className="code">{code}</code>
      </pre>
      <h2 className="question">
        Pasos a seguir cada vez que se desee crear los equipos o parejas:
      </h2>
      <p className="anwser">
        Cada vez que haya que generar las parejas o equipos hay que:
        <ol className="list">
          <li>
            Asignar un nivel a cada alumna. Varias alumnas pueden tener el mismo nivel.
            <br />
            Las alumnas con nivel 1 son las que mejor van.
          </li>
          <li>
            Pulsar en el icono <ButtonIcon icon="sync" /> de cada columna para que el programa
            calcule las parejas o equipos con niveles similares.
            <br />
            Esta funcionalidad añade una aleatoriedad de + / - 0.5 al nivel de cada alumna para que
            cada vez que se genere una columna haya resultados diferentes.
          </li>
          <li>
            Si se desea ajustar a mano una pareja o equipo pulsar en icono{' '}
            <ButtonIcon icon="lock" /> de cada columna y cambiar el número la alumna.
          </li>
          <li>
            Pulsar en el icono <ButtonIcon icon="note" /> de la cabecera y pegar el resultado en el
            Excel de equipos y parejas compartido con las alumnas.
            <br />
            Se recomienda pegar en el Excel usando <strong>Ctrl + Shift + V</strong> para pegar solo
            el contenido, sin pegar el formato.
          </li>
          <li>
            Pulsar en el icono <ButtonIcon icon="code" /> de la cabecera y pegar el resultado en el
            fichero <strong>./src/data/data.json</strong> para que la próxima vez que se ejecute
            este programa tenga almacenadas las parejas y equipos anteriores.
          </li>
          <li>
            Pulsar en el icono <ButtonIcon icon="download" /> de cada columna para descargar los
            ficheros que se deben importar en Zoom para configurar las{' '}
            <strong>Breakout rooms</strong>.
          </li>
        </ol>
        Si una pareja está repetida aparecerá en{' '}
        <span className="pair-repeated bg-warning"> amarillo</span> y habrá que eliminar esta
        repetición manualmente.
      </p>
    </section>
  );
};
