import octicons from '@primer/octicons';
import '../stylesheets/ButtonIcon.scss';

export default props => {
  return (
    <i
      className={props.active ? 'btn-icon active' : 'btn-icon'}
      title={props.title}
      dangerouslySetInnerHTML={{ __html: octicons[props.icon].toSVG({ class: 'svg' }) }}
      onClick={props.onClick}
    />
  );
};
