const title = 'AdaBot: por favor transfiere o borra este repositorio';

const body = `### Buenos días joven Adalaber, cómo estás? Yo estoy bien!!!

Soy 🤖 **AdaBot** 🤖 y me encargo de gestionar la cuenta de Adalab en GitHub. Me acabo de dar cuenta que tengo más de 2800 repositorios... muchos, demasiados, imposibles de manejar para un solo bot.

Os pido a las alumnas de anteriores promociones que por favor transfiráis vuestros repos a tu propia usuaria de GitHub.

### Si este repositorio es solo tuyo...

por favor, transfierelo a tu usuaria de GitHub entrando en las [Settings](https://github.com/adalab/[repo_name]/settings), a continuación baja hasta **Danger Zone** y pulsa en **Transfer ownership**.

### Si este repo es tuyo y de otras personas...

podéis hacer dos cosas:

- Que una de vosotras se lo transfiera a sí misma y luego las compañeras hagan un fork.
- Que todas hagáis un fork y luego podéis borrar el repo original.

### Si este repo es tuyo pero no te interesa...

bórralo!!!

### Si transfieres o haces un fork...

recuerda que para que todo funcione bien, tendrás que volver a generar GitHub Pages para que se genere una nueva dirección.

### Si no tienes permisos...

es decir, si no tienes acceso a las settings escribe a Miguel del Mazo por Slack y él te dará acceso.

### Si no eres alumna...

o este repo no es tuyo, ignora este issue o escríbe a Miguel del Mazo a través de Slack para avisarle de que debe arreglarme.

### Si no haces nada...

este repo se autodestuirá en 15 días!!! No te volveré a avisar ni te enviaré un recordatorio... no me gusta molestar :(

Gracias por ayudar a tener nuestro GitHub limpio y elegante.

![Refuerzo positivo :)](https://media.giphy.com/media/qixJFUXq1UNLa/giphy-downsized.gif)

> Este mensaje es para [assignees]
`;

const render = repo => {
  const assigneesList = repo.assignees.map(contributor => `@${contributor}`);
  const assigneesText = assigneesList.join(' ');
  return body.replace('[assignees]', assigneesText).replace('[repo_name]', repo.name);
};

const exportObject = {
  title,
  body,
  render
};

export default exportObject;
