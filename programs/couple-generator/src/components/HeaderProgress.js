import ButtonIcon from './ButtonIcon';
import '../stylesheets/HeaderProgress.scss';

export default props => {
  const progressBarDuration = 10000;

  const handleClick = () => {
    // props.toggleShowExportView(true);
    // setTimeout(() => {
    //   props.toggleShowExportView(false);
    // }, progressBarDuration);

    navigator.clipboard.writeText('profesor\tAlumna\t').then(
      function () {
        console.log('Copied to clipboard successfully!');
      },
      function () {
        console.error('Unable to write to clipboard. :-(');
      }
    );
  };

  return props.showExportView ? (
    <div className="progress" style={{ animationDuration: progressBarDuration + 'ms' }}>
      <div className="progress-bar" />
    </div>
  ) : (
    <ButtonIcon title="Mostrar vista de exportación" icon="share" onClick={handleClick} />
  );
};
